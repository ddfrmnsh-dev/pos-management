"use client";
import { useEffect, useMemo, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { ArrowUpDown, Pencil, Plus, RotateCcw, Search, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuImage } from "@/components/ui/menu-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { DeleteConfirmDialog } from "../_components/sidebar/dialog-confirm-delete";

type Menu = {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "active" | "inactive";
  availability: string;
  seasonal: boolean;
  image: string;
};

const initMenu: Menu[] = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Main Course",
    price: 12.99,
    status: "active",
    availability: "All Branches",
    seasonal: false,
    image: "/images/menu/burger.jpeg",
  },
  {
    id: 2,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 6.5,
    status: "inactive",
    availability: "Branch A",
    seasonal: true,
    image: "/images/menu/choco-lava.jpeg",
  },
  {
    id: 3,
    name: "Classic Burger",
    category: "Main Course",
    price: 12.99,
    status: "active",
    availability: "All Branches",
    seasonal: false,
    image: "/images/menu/burger.jpeg",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 6.5,
    status: "inactive",
    availability: "Branch A",
    seasonal: true,
    image: "/images/menu/choco-lava.jpeg",
  },
  {
    id: 5,
    name: "Classic Burger",
    category: "Main Course",
    price: 12.99,
    status: "active",
    availability: "All Branches",
    seasonal: false,
    image: "/images/menu/burger.jpeg",
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 6.5,
    status: "inactive",
    availability: "Branch A",
    seasonal: true,
    image: "/images/menu/choco-lava.jpeg",
  },
];

type SortIconProps<T> = {
  column: keyof T;
  sortKey: keyof T | null;
  direction: "asc" | "desc";
};

function SortIcon<T>({ column, sortKey, direction }: SortIconProps<T>) {
  const isActive = sortKey === column;

  return (
    <ArrowUpDown
      className={cn(
        "h-3 w-3 transition-transform",
        isActive ? "text-foreground" : "text-muted-foreground",
        isActive && direction === "desc" && "rotate-180",
      )}
    />
  );
}

export default function Page() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sortBy, setSortBy] = useState<{
    key: keyof Menu | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [menus, setMenus] = useState<Menu[]>(initMenu);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const filteredMenus = menus.filter((menu) => {
    const keyword = search.toLowerCase();

    const matchSearch = menu.name.toLowerCase().includes(keyword) || menu.category.toLowerCase().includes(keyword);

    const matchCategory = category === "all" || menu.category.toLowerCase() === category;

    return matchSearch && matchCategory;
  });

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setPage(1);
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") ?? "dashboard";

  const handleTabChange = (value: string) => {
    router.replace(`?tab=${value}`);
  };

  const handleSort = (key: keyof Menu) => {
    setSortBy((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedMenus = useMemo(() => {
    if (!sortBy.key) return filteredMenus;

    return [...filteredMenus].sort((a, b) => {
      const aVal = a[sortBy.key!];
      const bVal = b[sortBy.key!];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortBy.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortBy.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredMenus, sortBy]);

  const totalPages = Math.ceil(sortedMenus.length / pageSize);

  const paginatedMenus = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedMenus.slice(start, start + pageSize);
  }, [sortedMenus, page]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDelete = async (id: number) => {
    const previousMenus = menus;

    // OPTIMISTIC UPDATE
    setMenus((prev) => prev.filter((m) => m.id !== id));
    setIsDeleting(id);

    try {
      // SIMULASI API
      await new Promise((res) => setTimeout(res, 800));
      // await api.delete(`/menus/${id}`)

      toast.success("Menu deleted");
    } catch (error) {
      // ROLLBACK
      console.error("Delete failed:", error);
      setMenus(previousMenus);

      toast.error("Delete failed");
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, category, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Menu Management</h1>
          <p className="text-muted-foreground text-sm">Manage your restaurant menu items</p>
        </div>

        <Button onClick={() => router.push("/menu-management/menu/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      {/* ================= TABS ================= */}
      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="list">Menu List</TabsTrigger>
        </TabsList>

        {/* ================= DASHBOARD ================= */}
        <TabsContent value="dashboard">
          <div className="text-muted-foreground rounded-lg border p-6 text-sm">
            Dashboard content (stats, charts, etc.)
          </div>
        </TabsContent>

        {/* ================= MENU LIST ================= */}
        <TabsContent value="list" className="space-y-4">
          {/* -------- FILTER BAR -------- */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input
                placeholder="Search by name or category..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="main course">Main Course</SelectItem>
                <SelectItem value="dessert">Dessert</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset */}
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* -------- TABLE -------- */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1">
                      Menu Name
                      <SortIcon<Menu> column="name" sortKey={sortBy.key} direction={sortBy.direction} />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("category")}>
                    <div className="flex items-center gap-1">
                      Category
                      <SortIcon<Menu> column="category" sortKey={sortBy.key} direction={sortBy.direction} />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("price")}>
                    <div className="flex items-center gap-1">
                      Price
                      <SortIcon<Menu> column="price" sortKey={sortBy.key} direction={sortBy.direction} />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      <SortIcon<Menu> column="status" sortKey={sortBy.key} direction={sortBy.direction} />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("availability")}>
                    <div className="flex items-center gap-1">
                      Availability
                      <SortIcon<Menu> column="availability" sortKey={sortBy.key} direction={sortBy.direction} />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("seasonal")}>
                    <div className="flex items-center gap-1">
                      Seasonal
                      <SortIcon<Menu> column="seasonal" sortKey={sortBy.key} direction={sortBy.direction} />
                    </div>
                  </TableHead>
                  <TableHead className="flex items-center gap-1">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedMenus.map((menu) => (
                  <TableRow key={menu.id} className="hover:bg-muted/50">
                    <TableCell className="flex items-center gap-2">
                      <MenuImage src={menu.image} alt={menu.name} size="sm" rounded="md" />
                      {menu.name}
                    </TableCell>
                    <TableCell>{menu.category}</TableCell>
                    <TableCell className="text-right">Rp {menu.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                          menu.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700",
                        )}
                      >
                        {menu.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="bg-muted text-muted-foreground inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium">
                        {menu.availability}
                      </span>
                    </TableCell>
                    <TableCell>{menu.seasonal ? "Yes" : "No"}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {/* <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button> */}
                      <DeleteConfirmDialog
                        title="Delete menu item?"
                        description={`This will permanently delete ${menu.name}.`}
                        loading={isDeleting === menu.id}
                        onConfirm={() => handleDelete(menu.id)}
                      >
                        <Button size="icon" variant="ghost">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </DeleteConfirmDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
