"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function Deliveries() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Delivery Orders</h1>
          <p className="text-muted-foreground mt-1">Track outgoing goods to customers</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          New Delivery
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Delivery Documents</CardTitle>
          <CardDescription>All outgoing stock orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No deliveries yet. Create your first delivery order to get started.</p>
            <Button className="mt-4 bg-primary text-primary-foreground">Create Delivery</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
