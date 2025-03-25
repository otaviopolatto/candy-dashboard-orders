
import React from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderSearchFilterProps {
  startDate: string;
  endDate: string;
  status: string | null;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onStatusChange: (status: string | null) => void;
  onSearch: () => void;
}

const OrderSearchFilter: React.FC<OrderSearchFilterProps> = ({ 
  startDate, 
  endDate, 
  status,
  onStartDateChange, 
  onEndDateChange,
  onStatusChange, 
  onSearch 
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Search Orders</CardTitle>
        <CardDescription>Filter orders by date range and status</CardDescription>
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
                onChange={(e) => onStartDateChange(e.target.value)}
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
                onChange={(e) => onEndDateChange(e.target.value)}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Order Status</Label>
            <Select
              value={status || ""}
              onValueChange={(value) => onStatusChange(value === "ALL" ? null : value)}
            >
              <SelectTrigger id="status" className="pl-10">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="COMPLETE">Complete</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Filter className="absolute translate-y-[-30px] translate-x-3 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="self-end">
            <Button 
              onClick={onSearch}
              className="w-full"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Orders
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSearchFilter;
