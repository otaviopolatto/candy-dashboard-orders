
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface OrderTableFooterProps {
  totalResults: number;
}

const OrderTableFooter: React.FC<OrderTableFooterProps> = ({ totalResults }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">1</span> to <span className="font-medium">{totalResults}</span> of{" "}
        <span className="font-medium">{totalResults}</span> results
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
  );
};

export default OrderTableFooter;
