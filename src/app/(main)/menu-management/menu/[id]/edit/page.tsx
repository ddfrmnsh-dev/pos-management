"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { normalizeProduct } from "@/lib/normalize-product";

import ProductVariantSection from "../../../_components/product-varian";

type Category = { id: number; name: string };

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

export default function EditMenuPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [variants, setVariants] = useState<VariantsDraft>({
    enabled: false,
    groups: [],
  });

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      status: "active",
      seasonal: false,
    },
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const j = await res.json();
      const normalized = normalizeProduct(j.data);

      setProduct(normalized);
      // setGroups(normalized.groups);

      form.reset({
        name: normalized.name,
        price: normalized.price,
        description: normalized.description,
        category: normalized.category.id ? String(normalized.category.id) : "",
        status: normalized.status,
        seasonal: normalized.seasonal ?? false,
      });

      if (normalized.image_url) {
        setImagePreview(
          normalized.image_url.startsWith("http")
            ? normalized.image_url
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${normalized.image_url}`,
        );
      }

      setVariants({
        enabled: Array.isArray(normalized.groups) && normalized.groups.length > 0,
        groups: normalized.groups ?? [],
      });
    }

    fetchProduct();
  }, [id]);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/category");
      const j = await res.json();
      setCategories(j.data.data);
    }
    fetchCategories();
  }, []);

  // const hasVariant = Array.isArray(groups) && groups.length > 0;
  const hasVariant = variants.enabled;

  // ================= SUBMIT =================
  const onSubmit = async (data: any) => {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("price", String(data.price));
    fd.append("description", data.description);
    if (data.category) fd.append("category_id", data.category);
    fd.append("status", data.status);
    fd.append("groups", JSON.stringify(variants.enabled ? variants.groups : []));

    // ✅ only upload new image
    if (imageFile) {
      fd.append("image", imageFile);
    }

    console.log("UPDATE PAYLOAD", data);

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: fd,
    });

    router.push("/menu-management/menu");
  };

  // if (!product) return <p>Loading...</p>;
  // useEffect(() => {
  //   if (!product) return;

  //   if (product.image_url) {
  //     setImagePreview(product.image_url);
  //   }

  //   setVariants({
  //     enabled: Array.isArray(product.groups) && product.groups.length > 0,
  //     groups: product.groups ?? [],
  //   });
  // }, [product]);

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-xl font-semibold">Edit Menu Item</h1>
          <p className="text-muted-foreground text-sm">Update existing menu</p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* LEFT */}
          <div className="space-y-4 md:col-span-3">
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />

            {/* PRICE */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormItem>
              )}
            />

            {/* DESC */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} />
                </FormItem>
              )}
            />

            {/* VARIANT SECTION (ONLY IF GROUPS EXIST) */}
            {/* {hasVariant && (
              // <ProductVariantSection value={groups} onChange={setGroups} />
            )} */}
            <ProductVariantSection value={variants} onChange={setVariants} />

            <div className="space-y-2">
              <FormLabel>Image</FormLabel>

              {imagePreview && <img src={imagePreview} className="w-40 rounded border" />}

              <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)} />

              {imagePreview && (
                <Button type="button" variant="secondary" onClick={handleRemoveImage}>
                  Remove Image
                </Button>
              )}
            </div>

            {/* SEASONAL */}
            <FormField
              control={form.control}
              name="seasonal"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <span>Seasonal Item</span>
                </div>
              )}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            {/* CATEGORY */}
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

            {/* STATUS */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup value={field.value} onValueChange={field.onChange}>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="active" />
                      Active
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="inactive" />
                      Inactive
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <Button type="submit">Update Menu</Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
