import { ArrowUpDown, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Order = {
  id: string;
  customer: string;
  type: string;
  total: string;
  status: string;
  date: string; // ISO
  time: string;
  branch: string;
};

export function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="relative w-full overflow-x-auto rounded-lg border">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden lg:table-cell">Branch</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.customer}</TableCell>
              <TableCell className="hidden md:table-cell">{o.type}</TableCell>
              <TableCell>{o.total}</TableCell>

              <TableCell>
                <Badge className="bg-green-100 text-green-700">{o.status}</Badge>
              </TableCell>

              <TableCell className="hidden md:table-cell">{o.date}</TableCell>

              <TableCell className="hidden lg:table-cell">
                <Badge variant="outline">{o.branch}</Badge>
              </TableCell>

              <TableCell>
                <Button size="sm">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
