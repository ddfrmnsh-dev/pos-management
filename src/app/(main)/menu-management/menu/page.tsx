"use client";
import { useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { Badge, Pencil, Plus, RotateCcw, Search, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menus = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Main Course",
    price: 12.99,
    status: "active",
    availability: "All Branches",
    seasonal: false,
    image: "/images/burger.jpg",
  },
  {
    id: 2,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 6.5,
    status: "inactive",
    availability: "Branch A",
    seasonal: true,
    image: "/images/cake.jpg",
  },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredMenus = menus.filter((menu) => {
    const keyword = search.toLowerCase();

    const matchSearch = menu.name.toLowerCase().includes(keyword) || menu.category.toLowerCase().includes(keyword);

    const matchCategory = category === "all" || menu.category.toLowerCase() === category;

    return matchSearch && matchCategory;
  });

  const handleReset = () => {
    setSearch("");
    setCategory("all");
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") ?? "dashboard";

  const handleTabChange = (value: string) => {
    router.replace(`?tab=${value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Menu Management</h1>
          <p className="text-muted-foreground text-sm">Manage your restaurant menu items</p>
        </div>

        <Button>
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
                  <TableHead>Menu Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Seasonal</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredMenus.map((menu) => (
                  <TableRow key={menu.id} className="hover:bg-muted/50">
                    <TableCell className="flex items-center gap-2">
                      <img src={menu.image} alt={menu.name} className="h-6 w-6 rounded object-cover" />
                      {menu.name}
                    </TableCell>
                    <TableCell>{menu.category}</TableCell>
                    <TableCell className="text-right">${menu.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                      // variant={menu.status === "active" ? "default" : "secondary"}
                      >
                        {menu.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{menu.availability}</Badge>
                      {/* <Badge variant="outline">{menu.availability}</Badge> */}
                    </TableCell>
                    <TableCell>{menu.seasonal ? "Yes" : "No"}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
