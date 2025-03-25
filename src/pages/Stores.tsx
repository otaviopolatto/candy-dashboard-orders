
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Stores = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium tracking-tight">Stores</h1>
      </div>

      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Store Management</CardTitle>
          <CardDescription>View and manage your store locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border border-dashed rounded-lg border-muted-foreground/20">
            <p className="text-muted-foreground">Store management features coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stores;
