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

# stockmaster_backend/inventory/views.py (Continued from Step 1.2)

# ... (Existing imports: generics, status, Response, TokenObtainPairView, etc.) ...
from rest_framework import viewsets, permissions
from .models import Category, Product 
from .serializers import CategorySerializer, ProductSerializer
# ... (Existing RegisterView and CustomTokenObtainPairView) ...

# --- 3. Category CRUD ViewSet ---
class CategoryViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for Product Categories.
    Requires authentication.
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated] # RESTRICTED ACCESS

# --- 4. Product CRUD ViewSet ---
class ProductViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for Products.
    Requires authentication.
    """
    queryset = Product.objects.select_related('category').all().order_by('name')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated] # RESTRICTED ACCESS
    
    # Optional: Customize the queryset if needed (e.g., filtering inactive products)
    def get_queryset(self):
        return self.queryset.filter(is_active=True)
    
# stockmaster_backend/inventory/views.py (Continued)
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum, Q, Count
from rest_framework.permissions import IsAuthenticated
from .models import Product, Receipt, Delivery, StockMove
# ... (Existing imports, RegisterView, CustomTokenObtainPairView, ViewSets) ...


# --- 5. Dashboard KPIs View ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_kpis(request):
    """
    Calculates and returns core Inventory KPIs for the dashboard.
    """
    # 1. Total Products in Stock
    total_products = Product.objects.count()
    
    # 2. Low Stock / Out of Stock Items
    low_stock_count = Product.objects.filter(stock_quantity__lte=models.F('reorder_point')).count()
    
    # 3. Pending Receipts (Waiting/Ready status)
    pending_receipts = Receipt.objects.filter(
        Q(status='Waiting') | Q(status='Ready')
    ).count()

    # 4. Pending Deliveries (Waiting/Ready status)
    pending_deliveries = Delivery.objects.filter(
        Q(status='Waiting') | Q(status='Ready')
    ).count()

    # 5. Internal Transfers Scheduled (Assuming a 'Draft' or 'Pending' status for a general transfer concept)
    # We will use StockMove to count pending Internal Transfers created but not validated yet (simplification)
    # Since StockMove usually logs DONE items, let's simplify this KPI to show Pending Docs overall for now.
    
    # Alternatively: Count all non-Done Stock Moves (if we tracked INT as a header document)
    # For now, let's stick to the core documents (Receipts/Deliveries)
    
    data = {
        'total_products': total_products,
        'low_stock_items': low_stock_count,
        'pending_receipts': pending_receipts,
        'pending_deliveries': pending_deliveries,
        'internal_transfers_scheduled': 0, # Placeholder until we implement the INT document header
    }
    
    return Response(data, status=status.HTTP_200_OK)