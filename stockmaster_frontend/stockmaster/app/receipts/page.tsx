"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function Receipts() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Incoming Receipts</h1>
          <p className="text-muted-foreground mt-1">Track goods received from suppliers</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          New Receipt
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Receipt Documents</CardTitle>
          <CardDescription>All incoming stock entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No receipts yet. Create your first receipt to get started.</p>
            <Button className="mt-4 bg-primary text-primary-foreground">Create Receipt</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
