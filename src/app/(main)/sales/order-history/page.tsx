"use client";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { OrderFilters } from "../_components/order/filter-order";
import { OrderHistoryHeader } from "../_components/order/history-header";
import { OrderTable } from "../_components/order/order-table";

type Order = {
  id: string;
  trxNumber: string;
  customer: string;
  type: string;
  total: string;
  status: string;
  date: string; // ISO
  time: string;
  branch: string;
};
const orders: Order[] = [
  {
    id: "ORD78903",
    trxNumber: "#ORD78903",
    customer: "Sarah Johnson",
    type: "Delivery",
    total: "$35.96",
    status: "completed",
    date: "Sep 9, 2023",
    time: "07:00 PM",
    branch: "Jakarta",
  },
  {
    id: "ORD78908",
    trxNumber: "#ORD78908",
    customer: "Thomas Brown",
    type: "Takeout",
    total: "$36.97",
    status: "completed",
    date: "Sep 4, 2023",
    time: "12:00 PM",
    branch: "San Francisco Branch",
  },
  {
    id: "ORD78901",
    trxNumber: "#ORD78901",
    customer: "Emma Thompson",
    type: "Table 12",
    total: "$42.96",
    status: "completed",
    date: "Sep 10, 2023",
    time: "06:30 PM",
    branch: "Los Angeles Branch",
  },
];

const PAGE_SIZE = 10;

export default function Page() {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    branch: "all",
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customer.toLowerCase().includes(filters.search.toLowerCase());

      const matchStatus = filters.status === "all" || order.status === filters.status;

      const matchType = filters.type === "all" || order.type.toLocaleLowerCase() === filters.type;

      const matchBranch = filters.branch === "all" || order.branch.toLocaleLowerCase() === filters.branch;

      return matchSearch && matchStatus && matchType && matchBranch;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredOrders.slice(start, end);
  }, [filteredOrders, page]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="space-y-6">
      {/* Header */}
      <OrderHistoryHeader />
      {/* Order History Filter */}
      <OrderFilters filters={filters} onChange={setFilters} onPageChange={setPage} />
      {/* Order History Table */}
      <OrderTable orders={paginatedOrders} />
      <div className="flex items-center justify-between pt-4">
        <p className="text-muted-foreground text-sm">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-1">
          {/* Previous */}
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>

          {/* Page Numbers */}
          {pages.map((p) => (
            <Button key={p} size="sm" variant={p === page ? "default" : "outline"} onClick={() => setPage(p)}>
              {p}
            </Button>
          ))}

          {/* Next */}
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
