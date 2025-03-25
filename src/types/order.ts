
export interface Order {
  storeName: string;
  customerId: string;
  orderId: string;
  orderTms: string;
  orderStatus: "COMPLETE" | "PROCESSING" | "CANCELLED";
  storeId: string;
  customerFullName: string;
}
