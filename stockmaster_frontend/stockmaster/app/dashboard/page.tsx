"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AlertCircle, Package, TrendingUp, AlertTriangle, Calendar as CalendarIcon, RefreshCw, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"

const kpiData = [
  { label: "Total Products in Stock", value: "2,847", trend: "+12%", icon: Package },
  { label: "Low Stock Items", value: "34", trend: "+5%", icon: AlertTriangle },
  { label: "Pending Receipts", value: "12", trend: "0%", icon: TrendingUp },
  { label: "Pending Deliveries", value: "8", trend: "-2%", icon: TrendingUp },
]

const stockTrendData = [
  { month: "Jan", stock: 2400, transfers: 240 },
  { month: "Feb", stock: 2600, transfers: 320 },
  { month: "Mar", stock: 2800, transfers: 380 },
  { month: "Apr", stock: 2700, transfers: 290 },
  { month: "May", stock: 2900, transfers: 450 },
  { month: "Jun", stock: 3100, transfers: 520 },
]

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Hardware", value: 25 },
  { name: "Materials", value: 20 },
  { name: "Tools", value: 12 },
  { name: "Other", value: 8 },
]

const COLORS = ["#3B4DFF", "#00D4FF", "#FFB800", "#FF6B6B", "#6BCB77"]

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: new Date(2025, 1, 9),
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time overview of all stock operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[260px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, idx) => {
              const Icon = kpi.icon
              return (
                <Card key={idx} className="bg-card border-border hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{kpi.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-2">{kpi.value}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={kpi.trend.startsWith("+") ? "default" : "secondary"} className="text-xs">
                            {kpi.trend}
                          </Badge>
                          <span className="text-xs text-muted-foreground">from last month</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stock Trend */}
            <Card className="col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle>Stock Trend</CardTitle>
                <CardDescription>6-month inventory movement</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="stock" name="Total Stock" stroke="var(--color-primary)" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="transfers" name="Transfers" stroke="var(--color-chart-5)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>By product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Operations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Receipts</CardTitle>
                  <CardDescription>Latest incoming goods</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "RC-001", supplier: "ABC Supplies", qty: "500 units", date: "2 hours ago" },
                    { id: "RC-002", supplier: "XYZ Corp", qty: "300 units", date: "5 hours ago" },
                    { id: "RC-003", supplier: "Tech Parts", qty: "200 units", date: "1 day ago" },
                  ].map((receipt) => (
                    <div
                      key={receipt.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 px-2 rounded-md transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-foreground">{receipt.id}</p>
                        <p className="text-sm text-muted-foreground">{receipt.supplier}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{receipt.qty}</p>
                        <p className="text-sm text-muted-foreground">{receipt.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Alerts & Issues</CardTitle>
                  <CardDescription>Action items requiring attention</CardDescription>
                </div>
                <Button variant="ghost" size="sm">Dismiss All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "warning", title: "Steel Rods - Low Stock", desc: "Only 45 units remaining" },
                    { type: "error", title: "Discrepancy Found", desc: "Rack A inventory mismatch" },
                    { type: "warning", title: "Pending Approval", desc: "3 transfers awaiting approval" },
                  ].map((alert, idx) => (
                    <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                      <AlertCircle className={cn("w-5 h-5 flex-shrink-0 mt-0.5", 
                        alert.type === "error" ? "text-destructive" : "text-yellow-500"
                      )} />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.desc}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <span className="sr-only">Dismiss</span>
                        <AlertTriangle className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics View</CardTitle>
              <CardDescription>Detailed analysis and reports would go here.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              Analytics Content Placeholder
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports View</CardTitle>
              <CardDescription>Downloadable reports and archives.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              Reports Content Placeholder
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>System alerts and messages.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              Notifications Content Placeholder
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
