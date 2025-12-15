"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft, ImagesIcon, Save, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddMenuForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      seasonal: false,
      category: "",
      status: "active",
      availability: "all",
    },
  });

  const seasonal = useWatch({
    control: form.control,
    name: "seasonal",
  });

  const router = useRouter();

  return (
    <form className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
              <div className="space-y-1">
                <Label>Category</Label>
                <Select onValueChange={(v) => form.setValue("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="starters">Starters</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="appetizers">Appetizers</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="sides">Sides</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <RadioGroup defaultValue="active" onValueChange={(v) => form.setValue("status", v)}>
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
        <div className="flex gap-4">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Menu
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/menu-management/menu")}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
