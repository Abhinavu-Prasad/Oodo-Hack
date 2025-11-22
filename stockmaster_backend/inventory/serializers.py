# stockmaster_backend/inventory/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# --- 1. User Registration Serializer ---
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        # We override the create method to hash the password before saving
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

# --- 2. Custom Token Serializer (Optional, to include user details in JWT response) ---
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (user details) to the payload
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['is_staff'] = user.is_staff
        
        return token
    
# stockmaster_backend/inventory/serializers.py (Continued from Step 1.2)

# ... (Existing imports and User serializers) ...
from .models import Category, Product 

# --- 3. Category Serializer ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# --- 4. Product Serializer ---
class ProductSerializer(serializers.ModelSerializer):
    # Field to display the category name instead of just the ID
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        # Include 'stock_quantity' and 'reorder_point' for the dashboard/alerts
        fields = ['id', 'name', 'sku', 'category', 'category_name', 'unit_of_measure', 'stock_quantity', 'reorder_point']
        # Ensure SKU is validated as unique
        extra_kwargs = {'sku': {'validators': []}}