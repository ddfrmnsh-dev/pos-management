"use client";

import { useMemo, useState } from "react";

import { UserFilters } from "../_components/users/user-filter";
import UserHeader from "../_components/users/user-header";
import UserPagination from "../_components/users/user-pagination";
import UserTables from "../_components/users/user-table";

export type UserFiltersState = {
  search: string;
  role: string;
  branch: string;
  status: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  branches: string;
  status: string;
  lastActive: string; // ISO
  time: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@mail.com",
    role: "Admin",
    branches: "Jakarta",
    status: "completed",
    lastActive: "Sep 9, 2023",
    time: "07:00 PM",
  },
  {
    id: "2",
    name: "Sarah Jackson",
    email: "sarah.jackson@mail.com",
    role: "Cashier",
    branches: "Bandung",
    status: "completed",
    lastActive: "Sep 9, 2023",
    time: "07:00 PM",
  },
  {
    id: "3",
    name: "Sarah Nelson",
    email: "sarah.nelson@mail.com",
    role: "Manager",
    branches: "Tangerang",
    status: "completed",
    lastActive: "Sep 9, 2023",
    time: "07:00 PM",
  },
];

export default function Page() {
  const [filters, setFilters] = useState<UserFiltersState>({
    search: "",
    role: "all",
    branch: "all",
    status: "all",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === "all" || user.status === filters.status;

      const matchType = filters.role === "all" || user.role.toLocaleLowerCase() === filters.role;

      const matchBranch = filters.branch === "all" || user.branches.toLocaleLowerCase() === filters.branch;

      return matchSearch && matchStatus && matchType && matchBranch;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, page, pageSize]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <UserHeader />

      {/* FILTERS */}
      <UserFilters filters={filters} onChange={setFilters} onPageChange={setPage} />

      {/* TABLE */}
      <UserTables users={paginatedUsers} />

      {/* PAGINATION */}
      <UserPagination
        pages={pages}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
