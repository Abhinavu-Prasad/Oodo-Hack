# stockmaster_backend/inventory/urls.py
from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # JWT Login/Token Endpoints
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Registration Endpoint
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
]