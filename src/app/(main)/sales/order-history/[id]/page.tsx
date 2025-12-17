"use client";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Printer,
  FileDown,
  ReceiptText,
  Calendar,
  Clock,
  Store,
  CreditCard,
  DollarSign,
  Banknote,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { CustomerDetails } from "../../_components/order/view-order/customer-details";
import { OrderDetailHeader } from "../../_components/order/view-order/order-detail-header";
import { OrderItemsCard } from "../../_components/order/view-order/order-items-card";
import { RefundCard } from "../../_components/order/view-order/refund-card";

export default function OrderDetailPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <OrderDetailHeader />

      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-3">
          <OrderItemsCard />
          {/* <OrderSummary /> */}
        </div>

        {/* RIGHT */}
        <div className="space-y-6 lg:col-span-2">
          <CustomerDetails />
          <RefundCard />
        </div>
      </div>
    </div>
  );
}
