import requests
import secrets
from types import SimpleNamespace

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core.mail import send_mail
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from github import Github, Requester
from github.ApplicationOAuth import ApplicationOAuth

from .models import User
from .permissions import IsNotAuthenticated, IsOwner, NoBody
from .serializers import LoginSerializer, UserSerializer, UserValidationSerializer, RecoverPasswordSerializer

@method_decorator(cache_page(60*15), name='dispatch')
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        if self.action in ['create']:
            self.permission_classes = [IsNotAuthenticated]
        elif self.action in ['retrieve']:
            self.permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsOwner]
        elif self.action in ['list']:
            self.permission_classes = [NoBody]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        verification_code = request.data.get('code')
        email = request.data.get('email')
        cached_code = cache.get(email)
        if not cached_code:
            return Response({'detail': 'Verification code not found or expired'}, status=status.HTTP_400_BAD_REQUEST)
        if verification_code != cached_code:
            return Response({'detail': 'Incorrect verification code'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        cache.delete(email)

        login_serializer = LoginSerializer(data={
            'username': user.username,
            'password': request.data['password']
        })

        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            response_data = login_serializer.data
            response_data['id'] = user.id
            response_data['email'] = user.email
            response_data['username'] = user.username

            response = Response(response_data, status=status.HTTP_201_CREATED)
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.ACCESS_TOKEN_MAX_AGE,
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.REFRESH_TOKEN_MAX_AGE,
            )
            return response

        return Response(login_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ValidateEmailView(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
        serializer = UserValidationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            verification_code = ''.join([secrets.choice('0123456789') for _ in range(6)])
            cache.set(email, verification_code, timeout=600)
            subject = "Verification code"
            message = f"Your verification code is: {verification_code}. This code expires in 10 minutes"
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(subject, message, from_email, [email])
            return Response({'detail': 'Verification code sent to yout email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecoverPasswordView(APIView):
    permission_classes = [IsNotAuthenticated]
    
    def post(self, request):
        serializer = RecoverPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            verification_code = ''.join([secrets.choice('0123456789') for _ in range(6)])
            cache.set(email, verification_code, timeout=600)
            subject = "Verification code"
            message = f"Your verification code is: {verification_code}. This code expires in 10 minutes"
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(subject, message, from_email, [email])
            return Response({'detail': 'Verification code sent to yout email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ChangePasswordView(APIView):
    permission_classes = [IsNotAuthenticated]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        verification_code = request.data.get('code')
        
        cached_code = cache.get(email)
        if not cached_code:
            return Response({'detail': 'Verification code not found or expired'}, status=status.HTTP_400_BAD_REQUEST)
        if verification_code != cached_code:
            return Response({'detail': 'Incorrect verification code'}, status=status.HTTP_400_BAD_REQUEST)
        
        cache.delete(email)
        
        serializer = RecoverPasswordSerializer(data={
                'email': email,
                'new_password': new_password,
        })
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(email=email).first()
        user.set_password(new_password)
        user.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        response_data = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "access_token": access_token
        }
        
        response = Response(response_data, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=not settings.DEBUG,
            samesite='Strict',
            max_age=settings.ACCESS_TOKEN_MAX_AGE,
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=not settings.DEBUG,
            samesite='Strict',
            max_age=settings.REFRESH_TOKEN_MAX_AGE,
        )
        return response

class LoginView(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            response_data = serializer.data
            response_data['id'] = user.id
            response_data['email'] = user.email
            response_data['username'] = user.username
            response = Response(response_data, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.ACCESS_TOKEN_MAX_AGE,
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.REFRESH_TOKEN_MAX_AGE,
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoogleLoginView(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
        try:
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                raise Exception("Missing or invalid Authorization header")
            token = auth_header.split(' ')[1]
            
            response = requests.get(f"https://oauth2.googleapis.com/tokeninfo?access_token={token}")
            response.raise_for_status()
            user_data = response.json()
            if user_data['aud'] != settings.VITE_GOOGLE_CLIENT_ID:
                raise Exception("Invalid client ID")
            if not user_data.get('email_verified', False):
                raise Exception("Email not verified")
            google_email = user_data.get("email")
            google_username = google_email.split('@')[0]
            google_id = user_data.get("sub")
            
            user = get_user_model().objects.filter(google_id=google_id).first()
            if not user:
                if get_user_model().objects.filter(username=google_username).exists():
                    google_username = google_email
                user = get_user_model().objects.create(
                    email=google_email,
                    username=google_username,
                    google_id=google_id
                )
            
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            response_data = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
            }
            response = Response(response_data, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.ACCESS_TOKEN_MAX_AGE,
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.REFRESH_TOKEN_MAX_AGE,
            )
            return response
        except Exception as e:
            return Response({"message": f"Google Login failed. {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

class GithubLoginView(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
        try:
            code = request.data.get('code')
            requester = Requester.Requester(
                base_url="https://api.github.com",
                auth=None,
                timeout=10,
                user_agent="api",
                per_page=30,
                verify=True,
                retry=3,
                pool_size=10
            )
            oauth = ApplicationOAuth(requester=requester, headers={}, attributes={}, completed=False)
            oauth._client_id = SimpleNamespace(value=settings.VITE_GITHUB_CLIENT_ID)
            oauth._client_secret = SimpleNamespace(value=settings.GITHUB_CLIENT_SECRET)
            token = oauth.get_access_token(code=code)
            user_data = Github(token.token).get_user()
            github_id = user_data.id
            github_username = user_data.login
            github_email = user_data.email or f"{github_username}@github.local"
            user = get_user_model().objects.filter(github_id=github_id).first()
            if not user:
                if get_user_model().objects.filter(username=github_username).exists():
                    github_username = github_email

                user = get_user_model().objects.create(
                    email=github_email,
                    username=github_username,
                    github_id=github_id
                )
            
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            response_data = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
            }
            response = Response(response_data, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.ACCESS_TOKEN_MAX_AGE,
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Strict',
                max_age=settings.REFRESH_TOKEN_MAX_AGE,
            )
            return response

        except Exception as e:
            return Response({"message": f"Github Login failed. {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

class CheckAuthView(APIView):
    permission_classes = []

    def get(self, request):
        if request.user.is_authenticated:
            return Response({'authenticated': True}, status=status.HTTP_200_OK)
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                new_access_token = str(refresh.access_token)
                response = Response({'authenticated': True}, status=status.HTTP_200_OK)
                response.set_cookie(
                    key='access_token',
                    value=new_access_token,
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite='Strict',
                    max_age=settings.ACCESS_TOKEN_MAX_AGE,
                )
                return response
            except Exception: pass
        return Response({'authenticated': False}, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('access_token', path='/', samesite='Strict')
        response.delete_cookie('refresh_token', path='/', samesite='Strict')
        return response
