"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Steel Rods (10mm)",
    sku: "SR-10MM-001",
    category: "Materials",
    stock: 450,
    reserved: 120,
    available: 330,
    status: "active",
  },
  {
    id: 2,
    name: "Aluminum Sheets",
    sku: "AL-SHEET-002",
    category: "Materials",
    stock: 280,
    reserved: 80,
    available: 200,
    status: "active",
  },
  {
    id: 3,
    name: "Power Drill",
    sku: "PD-MAKITA-001",
    category: "Tools",
    stock: 23,
    reserved: 5,
    available: 18,
    status: "low",
  },
  {
    id: 4,
    name: "Safety Helmets",
    sku: "SH-YELLOW-001",
    category: "Hardware",
    stock: 5,
    reserved: 2,
    available: 3,
    status: "critical",
  },
  {
    id: 5,
    name: "LED Bulbs (60W)",
    sku: "LED-60W-001",
    category: "Electronics",
    stock: 890,
    reserved: 150,
    available: 740,
    status: "active",
  },
]

export default function Products() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
          <p className="text-muted-foreground mt-1">Manage inventory products and stock levels</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          New Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Products Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>{products.length} products in inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-muted-foreground font-medium">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-right py-3 px-4">Total Stock</th>
                  <th className="text-right py-3 px-4">Reserved</th>
                  <th className="text-right py-3 px-4">Available</th>
                  <th className="text-center py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-medium text-foreground">{product.name}</p>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{product.sku}</td>
                    <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">{product.stock}</td>
                    <td className="py-4 px-4 text-right text-muted-foreground">{product.reserved}</td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">{product.available}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge
                        className={
                          product.status === "active"
                            ? "bg-success/20 text-success border border-success/30"
                            : product.status === "low"
                              ? "bg-warning/20 text-warning border border-warning/30"
                              : "bg-destructive/20 text-destructive border border-destructive/30"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
