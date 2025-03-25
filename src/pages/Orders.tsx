
import React, { useState, useEffect } from 'react';
import { 
  ArrowUpDown, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  MoreHorizontal, 
  Trash,
  Search
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

// Mock data based on the provided structure
const mockOrdersData = [
  {
    "storeName": "Online",
    "customerId": "70",
    "orderId": "656",
    "orderTms": "2021-08-20T05:10:10.220744",
    "orderStatus": "COMPLETE",
    "storeId": "1",
    "customerFullName": "Santiago Vautus"
  },
  {
    "storeName": "Online",
    "customerId": "112",
    "orderId": "658",
    "orderTms": "2021-08-20T20:01:16.210405",
    "orderStatus": "COMPLETE",
    "storeId": "1",
    "customerFullName": "Brooks Craker"
  },
  {
    "storeName": "Online",
    "customerId": "58",
    "orderId": "659",
    "orderTms": "2021-08-20T23:39:24.501589",
    "orderStatus": "COMPLETE",
    "storeId": "1",
    "customerFullName": "Shamira Jones"
  },
  {
    "storeName": "Seattle",
    "customerId": "322",
    "orderId": "657",
    "orderTms": "2021-08-20T07:35:41.550416",
    "orderStatus": "COMPLETE",
    "storeId": "3",
    "customerFullName": "Florencia Kohler"
  },
  {
    "storeName": "Online",
    "customerId": "45",
    "orderId": "660",
    "orderTms": "2021-08-21T10:15:30.220744",
    "orderStatus": "PROCESSING",
    "storeId": "1",
    "customerFullName": "Marco Winters"
  },
  {
    "storeName": "Seattle",
    "customerId": "89",
    "orderId": "661",
    "orderTms": "2021-08-21T14:22:18.501589",
    "orderStatus": "COMPLETE",
    "storeId": "3",
    "customerFullName": "Lena Smith"
  },
  {
    "storeName": "Online",
    "customerId": "132",
    "orderId": "662",
    "orderTms": "2021-08-22T09:45:12.210405",
    "orderStatus": "CANCELLED",
    "storeId": "1",
    "customerFullName": "Jordan Rivera"
  },
  {
    "storeName": "Seattle",
    "customerId": "201",
    "orderId": "663",
    "orderTms": "2021-08-22T16:30:55.550416",
    "orderStatus": "COMPLETE",
    "storeId": "3",
    "customerFullName": "Sasha Lee"
  }
];

// Column configuration for the table
const columns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerFullName', label: 'Customer' },
  { key: 'storeName', label: 'Store' },
  { key: 'orderTms', label: 'Date' },
  { key: 'orderStatus', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

const Orders = () => {
  const [orders, setOrders] = useState(mockOrdersData);
  const [startDate, setStartDate] = useState('2021-08-20');
  const [endDate, setEndDate] = useState('2021-08-22');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filteredOrders, setFilteredOrders] = useState(mockOrdersData);

  useEffect(() => {
    // Filter orders based on date range
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.orderTms).toISOString().split('T')[0];
      return orderDate >= startDate && orderDate <= endDate;
    });
    
    setFilteredOrders(filtered);
  }, [orders, startDate, endDate]);

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    // Sort the filtered orders
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (key === 'orderTms') {
        // Date comparison
        return direction === 'asc' 
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime();
      } else {
        // String comparison
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });
    
    setFilteredOrders(sortedOrders);
  };

  // Handle search
  const handleSearch = () => {
    toast.success("Search filters applied successfully");
  };

  // Handle edit
  const handleEdit = (orderId: string) => {
    toast.info(`Editing order ${orderId}`);
  };

  // Handle delete
  const handleDelete = (orderId: string) => {
    // Filter out the deleted order
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    toast.success(`Order ${orderId} deleted successfully`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium tracking-tight">Orders</h1>
        <Button className="bg-candy-pink hover:bg-candy-pink/90 transition-colors">
          Create New Order
        </Button>
      </div>

      {/* Search filters */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Search Orders</CardTitle>
          <CardDescription>Filter orders by date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="col-span-2 self-end">
              <Button 
                onClick={handleSearch} 
                className="w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Orders
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results table */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Order Results</CardTitle>
          <CardDescription>Found {filteredOrders.length} orders matching your criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {columns.map((column) => (
                      <th 
                        key={column.key}
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                      >
                        {column.key !== 'actions' ? (
                          <button
                            onClick={() => requestSort(column.key)}
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                          >
                            {column.label}
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        ) : (
                          column.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr 
                      key={order.orderId}
                      className="border-t hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">{order.orderId}</td>
                      <td className="p-4">{order.customerFullName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${order.storeName === 'Online' ? 'bg-candy-blue' : 'bg-candy-pink'}`} />
                          {order.storeName}
                        </div>
                      </td>
                      <td className="p-4">{format(new Date(order.orderTms), 'MMM dd, yyyy HH:mm')}</td>
                      <td className="p-4">
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${order.orderStatus === 'COMPLETE' ? 'bg-green-100 text-green-800' : 
                            order.orderStatus === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                            'bg-red-100 text-red-800'}`}
                        >
                          {order.orderStatus}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(order.orderId)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(order.orderId)}
                              className="text-red-600 hover:text-red-600"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{filteredOrders.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
