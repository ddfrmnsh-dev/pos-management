"use client"

import { ArrowLeft, Image, Save, X } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

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
    })

    const router = useRouter();

    return (
        <form className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4 cursor-pointer text-muted-foreground" onClick={() => router.push("/menu-management/menu")} />
                    <div>
                        <h1 className="text-xl font-semibold">Add New Menu Item</h1>
                        <p className="text-sm text-muted-foreground">
                            Create a new menu item
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Left */}
                <div className="md:col-span-3 space-y-4">
                    <Card>
                        <CardContent className="space-y-4 pt-6">
                            {/* Name & Price */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Name</Label>
                                    <Input {...form.register("name")} />
                                </div>

                                <div className="space-y-1">
                                    <Label>Base Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                            Rp
                                        </span>

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
                                                    e.preventDefault()
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
                            <label className="mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center hover:bg-muted">
                                <Image className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Click to upload image
                                </span>
                                <input type="file" accept="image/*" className="hidden" />
                            </label>
                            {/* </CardContent> */}
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={form.watch("seasonal")}
                                    onCheckedChange={(v) =>
                                        form.setValue("seasonal", Boolean(v))
                                    }
                                />
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
                                <Select
                                    onValueChange={(v) => form.setValue("category", v)}
                                >
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
                                <RadioGroup
                                    defaultValue="active"
                                    onValueChange={(v) =>
                                        form.setValue("status", v)
                                    }
                                >
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
                                <RadioGroup
                                    defaultValue="all"
                                    onValueChange={(v) =>
                                        form.setValue("availability", v)
                                    }
                                >
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
                    <Button type="button" variant="secondary">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    )
}
