from django.shortcuts import render

# Create your views here.
# stockmaster_backend/inventory/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

# --- 1. Registration View ---
class RegisterView(generics.CreateAPIView):
    """
    API view for user registration. Handles POST requests to create a new user.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Allow anyone to register
    serializer_class = UserRegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Optional: Log the user in immediately after registration
        return Response(
            {"message": "User registered successfully."},
            status=status.HTTP_201_CREATED
        )

# --- 2. Custom Login View (uses Simple JWT's core logic with our custom serializer) ---
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    API view for user login. Returns access and refresh tokens upon successful login.
    """
    serializer_class = CustomTokenObtainPairSerializer