"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, X, ImagesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { menuSchema } from "../../_components/menu-form";
import ProductVariantSection from "../../_components/product-varian";

type MenuFormValues = {
  name: string;
  price: number;
  description: string;
  category: string;
  status: "active" | "inactive";
  availability: "all" | "selected" | "none";
  seasonal: boolean;
};

type Category = {
  id: number;
  name: string;
};

type VariantPriceMode = "price" | "adjustment";

type VariantOption = {
  id: string;
  name: string;
  price: number;
};

type VariantGroup = {
  id: string;
  name: string;
  isRequired: boolean;
  priceMode: VariantPriceMode;
  options: VariantOption[];
};

type VariantsDraft = {
  enabled: boolean;
  groups: VariantGroup[];
};

export default function AddMenuPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [variantsDraft, setVariantsDraft] = useState<VariantsDraft>({
    enabled: false,
    groups: [
      {
        id: "g_size",
        name: "Size",
        isRequired: true,
        priceMode: "price",
        options: [
          { id: "o_small", name: "Small", price: 18000 },
          { id: "o_large", name: "Large", price: 22000 },
        ],
      },
      {
        id: "g_temp",
        name: "Temperature",
        isRequired: true,
        priceMode: "adjustment",
        options: [
          { id: "o_hot", name: "Hot", price: 0 },
          { id: "o_ice", name: "Ice", price: 0 },
        ],
      },
    ],
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const j = await res.json();
      setCategories(j.data.data); // sesuaikan struktur API kamu
    };

    fetchCategories();
  }, []);

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: undefined,
      status: "active",
      availability: "all",
      seasonal: false,
    },
  });

  const onSubmit = async (values: MenuFormValues) => {
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("sku", "dummy-sku");
      fd.append("base_price", String(values.price));
      fd.append("cost_price", String(values.price));
      fd.append("description", values.description);
      fd.append("category_id", values.category);
      fd.append("status", values.status);
      fd.append("availability", values.availability);
      fd.append("is_seasonal", values.seasonal ? "true" : "false");
      fd.append("is_taxable", values.seasonal ? "true" : "false");

      // ✅ variants payload (kirim sekaligus dalam 1 request)
      fd.append("has_variants", variantsDraft.enabled ? "true" : "false");

      if (variantsDraft.enabled) {
        const invalidGroup = variantsDraft.groups.some((g) => !g.name.trim());
        if (invalidGroup) {
          toast.error("Variant group name is required");
          setSubmitting(false);
          return;
        }

        const payload = {
          groups: variantsDraft.groups
            .map((g) => ({
              name: g.name.trim(),
              required: g.isRequired,
              price_mode: g.priceMode, // "price" | "adjustment"
              options: g.options
                .map((o) => ({
                  name: o.name.trim(),
                  price: Number(o.price) || 0,
                }))
                .filter((o) => o.name.length > 0),
            }))
            .filter((g) => g.name.length > 0 && g.options.length > 0),
        };

        fd.append("variants", JSON.stringify(payload));
      }

      if (imageFile) fd.append("image", imageFile);

      const res = await fetch("/api/products", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        toast.error(j?.error ?? "Failed to create menu");
        return;
      }

      toast.success("Menu created successfully");

      setTimeout(() => {
        router.replace("/menu-management/menu?tab=list");
      }, 2000);

      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Network error");
      setSubmitting(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    // validasi basic (opsional tapi recommended)
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // cleanup memory
    }
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="text-muted-foreground h-4 w-4 cursor-pointer"
            onClick={() => router.push("/menu-management/menu")}
          />
          <div>
            <h1 className="text-xl font-semibold">Add New Menu Item</h1>
            <p className="text-muted-foreground text-sm">Create a new menu item</p>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* -------- LEFT -------- */}
          <div className="md:col-span-3">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {/* Name & Price */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} />
                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Base Price</FormLabel>
                        <div className="relative">
                          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                            Rp
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={100}
                            className="pl-10"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </div>
                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <Textarea {...field} />
                      {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                    </FormItem>
                  )}
                />

                <div className="space-y-1">
                  <Label>Image</Label>

                  {!imagePreview ? (
                    <label className="hover:bg-muted mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center">
                      <ImagesIcon className="text-muted-foreground h-5 w-5" />
                      <span className="text-muted-foreground text-sm">Click to upload image</span>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  ) : (
                    <div className="relative mt-2 overflow-hidden rounded-lg border">
                      <img src={imagePreview} alt="Preview" className="h-48 w-full object-cover" />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <ProductVariantSection value={variantsDraft} onChange={setVariantsDraft} />

                {/* Seasonal */}
                <FormField
                  control={form.control}
                  name="seasonal"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      <Label>Seasonal Item</Label>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* -------- RIGHT -------- */}
          <div>
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
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {categories.length === 0 && (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          )}
                          <SelectItem value="placeholder" disabled>
                            Select Category
                          </SelectItem>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
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
                      {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                    </FormItem>
                  )}
                />

                {/* Availability */}
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
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
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-between pt-6">
          <div className="flex gap-4">
            <Button type="submit" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Saving..." : "Save Menu"}
            </Button>

            <Button type="button" variant="secondary" onClick={() => router.push("/menu-management/menu")}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
