from django.db import models

# Create your models here.
# stockmaster_backend/inventory/models.py
from django.contrib.auth.models import User 
from django.conf import settings


# --- 1. Product Categories ---
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"


# --- 2. Product Management ---
class Product(models.Model):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=50, unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    unit_of_measure = models.CharField(max_length=50, default='Units')
    stock_quantity = models.IntegerField(default=0)
    reorder_point = models.IntegerField(default=10)
    
    def __str__(self):
        return f"{self.name} ({self.sku})"


# --- 3. Stock Ledger (Core Transaction History) ---
class StockMove(models.Model):
    MOVE_TYPES = (
        ('REC', 'Receipt'),
        ('DEL', 'Delivery'),
        ('INT', 'Internal Transfer'),
        ('ADJ', 'Adjustment'),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    move_type = models.CharField(max_length=3, choices=MOVE_TYPES)
    quantity = models.IntegerField()
    location_from = models.CharField(max_length=100, default='Unknown')
    location_to = models.CharField(max_length=100, default='Unknown')
    
    # Optional: Link to the specific document ID
    reference_document = models.CharField(max_length=100, blank=True, null=True)
    
    date_recorded = models.DateTimeField(auto_now_add=True)
    # Link to the user who recorded the move
    recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.get_move_type_display()} of {self.quantity} x {self.product.sku}"

# --- 4. Document Header Placeholder ---
class Receipt(models.Model):
    status = models.CharField(max_length=50, default='Draft')
    supplier_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Receipt #{self.id} - {self.supplier_name}"# stockmaster_backend/inventory/models.py
from django.db import models
from django.contrib.auth.models import User 
from django.conf import settings

# --- 1. Product Categories ---
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"


# --- 2. Product Management ---
class Product(models.Model):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=50, unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    unit_of_measure = models.CharField(max_length=50, default='Units')
    stock_quantity = models.IntegerField(default=0)
    reorder_point = models.IntegerField(default=10)
    
    def __str__(self):
        return f"{self.name} ({self.sku})"


# --- 3. Stock Ledger (Core Transaction History) ---
class StockMove(models.Model):
    MOVE_TYPES = (
        ('REC', 'Receipt'),
        ('DEL', 'Delivery'),
        ('INT', 'Internal Transfer'),
        ('ADJ', 'Adjustment'),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    move_type = models.CharField(max_length=3, choices=MOVE_TYPES)
    quantity = models.IntegerField()
    location_from = models.CharField(max_length=100, default='Unknown')
    location_to = models.CharField(max_length=100, default='Unknown')
    
    # Optional: Link to the specific document ID
    reference_document = models.CharField(max_length=100, blank=True, null=True)
    
    date_recorded = models.DateTimeField(auto_now_add=True)
    # Link to the user who recorded the move
    recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.get_move_type_display()} of {self.quantity} x {self.product.sku}"

# --- 4. Document Header Placeholder ---
class Receipt(models.Model):
    status = models.CharField(max_length=50, default='Draft')
    supplier_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Receipt #{self.id} - {self.supplier_name}"

# stockmaster_backend/inventory/models.py
from django.db import models
from django.contrib.auth.models import User 
from django.conf import settings

# ... (Existing Category and Product models) ...

# --- Stock Move (Ledger) Model (Already defined, but kept for context) ---
class StockMove(models.Model):
    # ... (Model definition as per previous steps) ...
    MOVE_TYPES = (
        ('REC', 'Receipt'),
        ('DEL', 'Delivery'),
        ('INT', 'Internal Transfer'),
        ('ADJ', 'Adjustment'),
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    move_type = models.CharField(max_length=3, choices=MOVE_TYPES)
    quantity = models.IntegerField() # Positive for IN, Negative for OUT
    location_from = models.CharField(max_length=100, default='Unknown')
    location_to = models.CharField(max_length=100, default='Unknown')
    reference_document = models.CharField(max_length=100, blank=True, null=True)
    date_recorded = models.DateTimeField(auto_now_add=True)
    recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)


# --- Document Header: Receipt (Incoming) ---
class Receipt(models.Model):
    STATUS_CHOICES = (
        ('Draft', 'Draft'),
        ('Waiting', 'Waiting for Stock'),
        ('Ready', 'Ready to Validate'),
        ('Done', 'Done'),
        ('Canceled', 'Canceled'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Draft')
    supplier_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Receipt #{self.id} - {self.supplier_name}"


# --- Document Header: Delivery Order (Outgoing) ---
class Delivery(models.Model):
    STATUS_CHOICES = Receipt.STATUS_CHOICES # Use the same statuses
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Draft')
    customer_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Delivery #{self.id} - {self.customer_name}"


# --- Document Header: Inventory Adjustment ---
class InventoryAdjustment(models.Model):
    # Adjustments are simpler, they often just track the reason and the moves
    reason = models.CharField(max_length=255)
    adjustment_date = models.DateTimeField(auto_now_add=True)
    recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Adjustment #{self.id} - {self.reason[:30]}"