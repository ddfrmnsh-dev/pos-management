"use client";
import { useState } from "react";

import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DeleteConfirmDialog } from "../sidebar/dialog-confirm-delete";

import { CategoryModal } from "./category-dialog";

type Category = {
  id: number;
  name: string;
  totalMenu: number;
};

const category: Category[] = [
  { id: 1, name: "Main Course", totalMenu: 5 },
  { id: 2, name: "Starters", totalMenu: 2 },
  { id: 3, name: "Desserts", totalMenu: 4 },
  { id: 4, name: "Appetizers", totalMenu: 1 },
  { id: 5, name: "Beverages", totalMenu: 2 },
  { id: 6, name: "Sides", totalMenu: 1 },
];

export function CategoryTable() {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>(category);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const handleDelete = async (id: number) => {
    const previousCategories = categories;

    // OPTIMISTIC UPDATE
    setCategories((prev) => prev.filter((m) => m.id !== id));
    setIsDeleting(id);

    try {
      // SIMULASI API
      await new Promise((res) => setTimeout(res, 800));
      // await api.delete(`/menus/${id}`)

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
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Manage Categories</h2>

        <CategoryModal open={open} onOpenChange={setOpen} category={selectedCategory} />
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
