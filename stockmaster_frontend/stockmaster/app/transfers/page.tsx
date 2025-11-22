"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function Transfers() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internal Transfers</h1>
          <p className="text-muted-foreground mt-1">Move stock between warehouses and locations</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          New Transfer
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Transfer Documents</CardTitle>
          <CardDescription>All internal stock movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transfers yet. Create your first transfer to get started.</p>
            <Button className="mt-4 bg-primary text-primary-foreground">Create Transfer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
