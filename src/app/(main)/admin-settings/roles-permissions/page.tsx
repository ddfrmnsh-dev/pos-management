"use client";

import { useMemo, useState } from "react";

import { UserRoleFilters } from "../_components/user-role/user-role-filter";
import UserRoleHeader from "../_components/user-role/user-role-header";
import UserRoleTable from "../_components/user-role/user-role-table";
import { UserFilters } from "../_components/users/user-filter";
import UserHeader from "../_components/users/user-header";
import UserPagination from "../_components/users/user-pagination";
import UserTables from "../_components/users/user-table";

export type UserRoleFiltersState = {
  search: string;
  scope: string;
};

type Role = {
  id: string;
  roleName: string;
  description: string;
  assignUser: string;
  accessLevel: string;
};

const roles: Role[] = [
  {
    id: "1",
    roleName: "Admin",
    description: "Full access to all features",
    assignUser: "2",
    accessLevel: "HQ",
  },
  {
    id: "2",
    roleName: "Cashier",
    description: "Limited access to cashier functions",
    assignUser: "3",
    accessLevel: "Branch",
  },
  {
    id: "3",
    roleName: "Manager",
    description: "Access to manager features and reports",
    assignUser: "2",
    accessLevel: "Branch",
  },
];

export default function Page() {
  const [filters, setFilters] = useState<UserRoleFiltersState>({
    search: "",
    scope: "all",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = useMemo(() => {
    return roles.filter((role) => {
      const matchSearch =
        role.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        role.roleName.toLowerCase().includes(filters.search.toLowerCase());
      const matchScopes = filters.scope === "all" || role.accessLevel.toLocaleLowerCase() === filters.scope;

      return matchSearch && matchScopes;
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
      <UserRoleHeader />

      {/* FILTERS */}
      <UserRoleFilters filters={filters} onChange={setFilters} onPageChange={setPage} />

      {/* TABLE */}
      <UserRoleTable roles={paginatedUsers} />

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
