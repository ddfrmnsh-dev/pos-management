"use client";
import { useEffect, useState } from "react";

import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DeleteConfirmDialog } from "../sidebar/dialog-confirm-delete";

import { CategoryModal } from "./category-dialog";

type Category = {
  id: number;
  name: string;
  code: string;
  description: string;
  sortOrder: number;
  status: string;
  totalMenu: number;
};

export function CategoryTable() {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    const previousCategories = categories;

    // OPTIMISTIC UPDATE
    setCategories((prev) => prev.filter((m) => m.id !== id));
    setIsDeleting(id);

    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Categories deleted");
    } catch (error) {
      // ROLLBACK
      console.error("Delete failed:", error);
      setCategories(previousCategories);

      toast.error("Delete failed");
    } finally {
      setIsDeleting(null);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/category", { method: "GET" });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setError(j?.error ?? "Gagal ambil data category");
        return;
      }

      const j = await res.json();

      const rawItems = j.data.data;

      const items: Category[] = rawItems.map((x: any) => ({
        id: Number(x.id),
        name: x.name,
        code: x.code,
        description: x.description,
        status: x.status,
        totalMenu: x.product_count,
      }));

      setCategories(items);
    } catch (e: any) {
      setError(e?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Manage Categories</h2>
        <Button
          onClick={() => {
            setSelectedCategory(undefined); // mode CREATE
            setOpen(true);
          }}
        >
          + Add Category
        </Button>
        <CategoryModal open={open} onOpenChange={setOpen} category={selectedCategory} onSuccess={fetchCategories} />
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Menu Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>

                <TableCell>{category.totalMenu}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedCategory(category);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmDialog
                      title="Delete category item?"
                      description={`This will permanently delete ${category.name}.`}
                      loading={isDeleting === category.id}
                      onConfirm={() => handleDelete(category.id)}
                    >
                      <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </DeleteConfirmDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
