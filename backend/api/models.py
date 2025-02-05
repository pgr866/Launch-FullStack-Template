from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    google_id = models.CharField(max_length=255, null=True, blank=True)
    github_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.username}"
