import { Banknote, Calendar, Clock, CreditCard, DollarSign, ReceiptText, Store } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function OrderItemsCard() {
  return (
    <>
      {/* Order Details */}
      <Card className="md:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm tracking-widest uppercase">Order Details</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">Dine-in</Badge>
            <Badge>Table 12</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <p className="font-medium">Grilled Salmon</p>
                  <p className="text-muted-foreground text-xs">Size: Medium rare</p>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>$24.99</TableCell>
                <TableCell>$24.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Caesar Salad</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$9.99</TableCell>
                <TableCell>$9.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Iced Tea</TableCell>
                <TableCell>2</TableCell>
                <TableCell>$3.99</TableCell>
                <TableCell>$7.98</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>$42.96</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (8.5%)</span>
              <span>$3.65</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$42.96</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Info */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm tracking-widest uppercase">Order Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
          {/* LEFT — Order Details */}
          <div className="space-y-4">
            <h4 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">Order Details</h4>

            <Info icon={ReceiptText} label="Order ID" value="#ORD78901" />
            <Info icon={Calendar} label="Date" value="Sep 10, 2023" />
            <Info icon={Clock} label="Time" value="06:30 PM" />
            <Info icon={Store} label="Branch" value="Los Angeles Branch" />
          </div>

          {/* RIGHT — Payment Information */}
          <div className="space-y-4">
            <h4 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">Payment Information</h4>

            <Info icon={CreditCard} label="Payment Method" value="Credit Card" />
            <Info icon={DollarSign} label="Amount" value="$42.96" />

            <div className="flex items-center gap-2">
              <Banknote className="text-muted-foreground h-4 w-4" />
              <span>Status:</span>
              <Badge variant="secondary" className="capitalize">
                completed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Info({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-muted-foreground h-4 w-4" />
      <span>
        {label}: {value}
      </span>
    </div>
  );
}
