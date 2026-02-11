"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CategoryFormValues, categorySchema } from "../category-schema";

type Category = {
  id: number;
  name: string;
  code: string;
  description: string;
  sortOrder: number;
  status: string;
  totalMenu: number;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  category?: Category;
  onSuccess?: () => void;
};

export function CategoryModal({ open, onOpenChange, category, onSuccess }: Props) {
  const isEdit = !!category;
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      status: "",
    },
  });

  // 🔑 set value saat edit
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        code: category.code,
        description: category.description,
        status: category.status,
      });
    } else {
      form.reset({
        name: "",
        code: "",
        description: "",
        status: "",
      });
    }
  }, [category, form]);

  const onSubmit = async (values: CategoryFormValues) => {
    if (isEdit) {
      console.log("UPDATE", category?.id, values);

      const res = await fetch(`/api/category/${category?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.getValues("name"),
          code: form.getValues("code"),
          description: form.getValues("description"),
          status: form.getValues("status"),
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        toast.error(j?.error ?? "Failed to update category");
        return;
      }

      toast.success("Category updated successfully");

      router.refresh();
    } else {
      try {
        const res = await fetch("/api/category", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.getValues("name"),
            code: form.getValues("code"),
            description: form.getValues("description"),
            status: form.getValues("status"),
          }),
        });

        if (!res.ok) {
          const j = await res.json().catch(() => null);
          toast.error(j?.error ?? "Failed to create category");
          return;
        }

        toast.success("Category created successfully");

        router.refresh();
      } catch (e: any) {
        toast.error("err");
      }
      console.log("CREATE", values);
    }

    onSuccess?.();
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Create Category"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desctiption</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="ACTIVE" />
                        <Label>Active</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="INACTIVE" />
                        <Label>Inactive</Label>
                      </div>
                    </RadioGroup>
                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">{isEdit ? "Update Category" : "Create Category"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
