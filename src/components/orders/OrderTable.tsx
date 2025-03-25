
import React from 'react';
import { format } from 'date-fns';
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Order } from '@/types/order';

interface OrderTableProps {
  orders: Order[];
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  requestSort: (key: string) => void;
  handleEdit: (orderId: string) => void;
  handleDelete: (orderId: string) => void;
}

const columns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerFullName', label: 'Customer' },
  { key: 'storeName', label: 'Store' },
  { key: 'orderTms', label: 'Date' },
  { key: 'orderStatus', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

const OrderTable: React.FC<OrderTableProps> = ({ 
  orders, 
  sortConfig, 
  requestSort, 
  handleEdit, 
  handleDelete 
}) => {
  return (
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
            {orders.map((order) => (
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
  );
};

export default OrderTable;
