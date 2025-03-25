
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { mockOrdersData } from "@/data/mockOrders";
import { Order } from "@/types/order";
import PageHeader from "@/components/orders/PageHeader";
import OrderSearchFilter from "@/components/orders/OrderSearchFilter";
import OrderTable from "@/components/orders/OrderTable";
import OrderTableFooter from "@/components/orders/OrderTableFooter";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrdersData);
  const [startDate, setStartDate] = useState('2021-08-20');
  const [endDate, setEndDate] = useState('2021-08-22');
  const [status, setStatus] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrdersData);

  useEffect(() => {
    // Filter orders by date range and status
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.orderTms).toISOString().split('T')[0];
      
      // Date filter
      const dateMatch = orderDate >= startDate && orderDate <= endDate;
      
      // Status filter (if status is null, include all)
      const statusMatch = status === null || order.orderStatus === status;
      
      return dateMatch && statusMatch;
    });
    
    setFilteredOrders(filtered);
  }, [orders, startDate, endDate, status]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (key === 'orderTms') {
        return direction === 'asc' 
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime();
      } else {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });
    
    setFilteredOrders(sortedOrders);
  };

  const handleSearch = () => {
    toast({
      title: "Success",
      description: "Search filters applied successfully"
    });
  };

  const handleEdit = (orderId: string) => {
    toast({
      title: "Info",
      description: `Editing order ${orderId}`
    });
  };

  const handleDelete = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    toast({
      title: "Success",
      description: `Order ${orderId} deleted successfully`
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Orders" 
        buttonText="Create New Order" 
      />

      <OrderSearchFilter 
        startDate={startDate}
        endDate={endDate}
        status={status}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onStatusChange={setStatus}
        onSearch={handleSearch}
      />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Order Results</CardTitle>
          <CardDescription>Found {filteredOrders.length} orders matching your criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderTable 
            orders={filteredOrders}
            sortConfig={sortConfig}
            requestSort={requestSort}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <OrderTableFooter totalResults={filteredOrders.length} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
