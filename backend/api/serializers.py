import re

from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        if not username or not password:
            raise serializers.ValidationError("Both username and password are required")
        user = User.objects.filter(username=username, is_active=True).first() or User.objects.filter(email=username, is_active=True).first()
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        attrs['user'] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("The password must be at least 8 characters long")
        
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("The password must contain at least one uppercase letter")
        
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("The password must contain at least one lowercase letter")
        
        if not re.search(r'[^\w\s]', value):
            raise serializers.ValidationError("The password must contain at least one special character")
        
        if not re.search(r'\d', value):
            raise serializers.ValidationError("The password must contain at least one number")
        
        return value

    def create(self, validated_data):
        password = validated_data.get('password')
        if not password:
            raise serializers.ValidationError({"password": ["This field may not be blank."]})
        
        validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class UserValidationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already in use")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("The password must be at least 8 characters long")
        
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("The password must contain at least one uppercase letter")
        
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("The password must contain at least one lowercase letter")
        
        if not re.search(r'[^\w\s]', value):
            raise serializers.ValidationError("The password must contain at least one special character")
        
        if not re.search(r'\d', value):
            raise serializers.ValidationError("The password must contain at least one number")
        
        return value

class RecoverPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    new_password = serializers.CharField(write_only=True, required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is not registered")
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("The password must be at least 8 characters long")
        
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("The password must contain at least one uppercase letter")
        
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("The password must contain at least one lowercase letter")
        
        if not re.search(r'[^\w\s]', value):
            raise serializers.ValidationError("The password must contain at least one special character")
        
        if not re.search(r'\d', value):
            raise serializers.ValidationError("The password must contain at least one number")
        
        return value
