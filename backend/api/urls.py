from django.urls import include, path
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api import views
from .permissions import IsAdmin
from .authentication import JWTCookieAuthentication

router = routers.DefaultRouter()
router.register(r"user", views.UserView, "user")
schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="Documentation for the REST API",
    ),
    public=False,
    permission_classes=[IsAdmin],
    authentication_classes=[JWTCookieAuthentication],
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc-schema'),
    path("v1/", include(router.urls)),
    path('v1/check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('v1/login/', views.LoginView.as_view(), name='login'),
    path('v1/logout/', views.LogoutView.as_view(), name='logout'),
    path('v1/google-login/', views.GoogleLoginView.as_view(), name='google-login'),
    path('v1/github-login/', views.GithubLoginView.as_view(), name='github-login'),
    path('v1/validate-email/', views.ValidateEmailView.as_view(), name='validate-email'),
    path('v1/recover-password/', views.RecoverPasswordView.as_view(), name='recover-password'),
    path('v1/change-password/', views.ChangePasswordView.as_view(), name='change-password'),
]
