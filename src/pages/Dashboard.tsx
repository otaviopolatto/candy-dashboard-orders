
import React from 'react';
import { BarChart, LineChart, PieChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, ShoppingBag, Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for charts
const orderData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

const storeData = [
  { name: 'Online', value: 68 },
  { name: 'Seattle', value: 32 },
];

const COLORS = ['#FFA1C9', '#A1C5FF', '#C9A1FF', '#A1FFD1'];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium tracking-tight">Dashboard</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Last updated:</span>
          <span className="ml-2 font-medium text-foreground">Today, 2:30 PM</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,658</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-candy-pink h-1 w-3/4 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">824</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>8% from last month</span>
            </div>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-candy-blue h-1 w-1/2 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Store Revenue</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$32.4k</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>18% from last month</span>
            </div>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-candy-purple h-1 w-4/5 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5.2%</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowUpRight className="h-3 w-3 mr-1 transform rotate-45" />
              <span>2% from last month</span>
            </div>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-candy-mint h-1 w-1/4 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="hover-card">
          <CardHeader>
            <CardTitle>Orders Over Time</CardTitle>
            <CardDescription>Monthly order volume for the current year</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Orders" 
                  stroke="#FFA1C9" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: '#FFA1C9', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-card">
          <CardHeader>
            <CardTitle>Orders by Store</CardTitle>
            <CardDescription>Distribution of orders by store location</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center justify-center h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={storeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {storeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart Section */}
      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
          <CardDescription>Order performance metrics for the past week</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }} 
              />
              <Bar 
                dataKey="value" 
                name="Orders" 
                fill="#A1C5FF" 
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
