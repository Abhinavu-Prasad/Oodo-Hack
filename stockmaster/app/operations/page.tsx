"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const operationTypes = [
  {
    id: 1,
    title: "Receipts",
    description: "Track incoming goods from suppliers",
    count: 12,
    pending: 3,
    icon: "📥",
  },
  {
    id: 2,
    title: "Deliveries",
    description: "Manage outgoing customer orders",
    count: 8,
    pending: 2,
    icon: "📦",
  },
  {
    id: 3,
    title: "Internal Transfers",
    description: "Move stock between warehouses",
    count: 24,
    pending: 5,
    icon: "🔄",
  },
  {
    id: 4,
    title: "Stock Adjustments",
    description: "Fix discrepancies in inventory",
    count: 6,
    pending: 1,
    icon: "⚙️",
  },
]

export default function Operations() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operations Center</h1>
        <p className="text-muted-foreground mt-1">Manage all inventory operations</p>
      </div>

      {/* Operation Types Grid */}
      <div className="grid grid-cols-2 gap-6">
        {operationTypes.map((op) => (
          <Card key={op.id} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{op.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{op.title}</h3>
                    <p className="text-sm text-muted-foreground">{op.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{op.count}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="h-12 w-px bg-border"></div>
                  <div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      {op.pending} pending
                    </Badge>
                  </div>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Operations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Operations</CardTitle>
          <CardDescription>Latest 5 operations across all types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "RC-001", type: "Receipt", status: "completed", time: "2 hours ago", items: 150 },
              { id: "DL-001", type: "Delivery", status: "pending", time: "4 hours ago", items: 45 },
              { id: "TRF-001", type: "Transfer", status: "completed", time: "6 hours ago", items: 200 },
              { id: "ADJ-001", type: "Adjustment", status: "completed", time: "1 day ago", items: 15 },
              { id: "RC-002", type: "Receipt", status: "pending", time: "1 day ago", items: 300 },
            ].map((op) => (
              <div
                key={op.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center font-medium text-foreground">
                    {op.type[0]}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{op.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {op.type} · {op.items} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      op.status === "completed"
                        ? "bg-success/20 text-success border border-success/30"
                        : "bg-warning/20 text-warning border border-warning/30"
                    }
                  >
                    {op.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground text-right">{op.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
