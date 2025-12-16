"use client";

import { useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import { ArrowLeft, ImagesIcon, Save, Trash, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuImage } from "@/components/ui/menu-image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { DeleteConfirmDialog } from "../../../_components/sidebar/dialog-confirm-delete";

type MenuForm = {
  name: string;
  price: number;
  description: string;
  seasonal: boolean;
  category: string;
  status: "active" | "inactive";
  availability: "all" | "selected" | "none";
};

export default function EditMenuPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      seasonal: false,
      category: "main-course",
      status: "active",
      availability: "none",
    },
  });

  // 🔹 Fetch existing menu
  useEffect(() => {
    async function fetchMenu() {
      try {
        // SIMULASI API
        await new Promise((r) => setTimeout(r, 500));

        form.reset({
          name: "Classic Burger",
          price: 12999,
          description: "Juicy beef patty with fresh lettuce",
          seasonal: true,
          category: "main-course",
          status: "inactive",
          availability: "none",
        });
      } catch {
        toast.error("Failed to load menu");
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [form]);

  const onSubmit = async (data: any) => {
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Menu updated");
      router.back();
    } catch {
      toast.error("Update failed");
    }
  };

  const seasonal = useWatch({
    control: form.control,
    name: "seasonal",
  });

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeft className="text-muted-foreground h-4 w-4 cursor-pointer" onClick={() => router.back()} />
            <div>
              <h1 className="text-xl font-semibold">{form.watch("name")}</h1>
              <p className="text-muted-foreground text-sm">Update/view menu item details</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Left */}
          <div className="space-y-4 md:col-span-3">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {/* Name & Price */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Name</Label>
                    <Input {...form.register("name")} />
                  </div>

                  <div className="space-y-1">
                    <Label>Base Price</Label>
                    <div className="relative">
                      <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">Rp</span>

                      <Input
                        type="number"
                        min={0}
                        step={100}
                        className="pl-10"
                        {...form.register("price", {
                          valueAsNumber: true,
                          min: 0,
                        })}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea {...form.register("description")} />
                </div>
                {/* <CardContent className="pt-6"> */}
                <Label>Image</Label>
                <label className="hover:bg-muted mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center">
                  <ImagesIcon className="text-muted-foreground h-5 w-5" />
                  <span className="text-muted-foreground text-sm">Click to upload image</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                {/* </CardContent> */}
                <div className="flex items-center gap-2">
                  <Checkbox checked={seasonal} onCheckedChange={(v) => form.setValue("seasonal", Boolean(v))} />
                  <Label>Seasonal Item</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>

                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="main-course">Main Course</SelectItem>
                          <SelectItem value="dessert">Dessert</SelectItem>
                          <SelectItem value="drink">Drink</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Status</Label>

                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="active" />
                          <Label>Active</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="inactive" />
                          <Label>Inactive</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                />

                {/* Availability */}
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <RadioGroup defaultValue="all" onValueChange={(v) => form.setValue("availability", v)}>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="all" />
                      <Label>All Branches</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="selected" />
                      <Label>Selected Branches</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="none" />
                      <Label>None</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <div className="flex gap-3">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
          <DeleteConfirmDialog title="Delete this menu?" onConfirm={() => toast.success("Deleted")}>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Item
            </Button>
          </DeleteConfirmDialog>
        </div>
      </form>
    </Form>
  );
}
