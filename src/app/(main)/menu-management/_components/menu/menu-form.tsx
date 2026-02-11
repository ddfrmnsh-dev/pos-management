// "use client";

// import { useEffect, useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const schema = z.object({
//   name: z.string().min(1),
//   price: z.coerce.number(),
//   description: z.string().optional(),
//   category: z.string(),
//   image_url: z.string(),
//   status: z.enum(["ACTIVE", "INACTIVE"]),
//   availability: z.enum(["ALL", "SELECTED", "NONE"]),
//   seasonal: z.boolean(),
// });

// export type MenuFormType = z.infer<typeof schema>;

// type Props = {
//   defaultValues?: Partial<MenuFormType>;
//   onSubmit: (data: MenuFormType, imageFile?: File | null) => void;
// };

// export default function MenuForm({ defaultValues, onSubmit }: Props) {
//   const form = useForm<MenuFormType>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       price: 0,
//       description: "",
//       category: "",
//       status: "ACTIVE",
//       availability: "ALL",
//       seasonal: false,
//       ...defaultValues,
//     },
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   useEffect(() => {
//     fetch("/api/categories")
//       .then((r) => r.json())
//       .then(setCategories);
//   }, []);

//   useEffect(() => {
//     if (defaultValues?.image_url) {
//       setImagePreview(defaultValues.image_url);
//     }
//   }, [defaultValues]);

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit((data) => onSubmit(data, imageFile))} className="space-y-6">
//         {/* NAME */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Menu Name</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Nasi Goreng" />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         {/* PRICE */}
//         <FormField
//           control={form.control}
//           name="price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Price</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         {/* CATEGORY */}
//         <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Category</FormLabel>
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {categories.map((c) => (
//                     <SelectItem key={c.id} value={String(c.id)}>
//                       {c.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FormItem>
//           )}
//         />

//         {/* STATUS */}
//         <FormField
//           control={form.control}
//           name="status"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Status</FormLabel>
//               <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="ACTIVE" />
//                   <Label>Active</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="INACTIVE" />
//                   <Label>Inactive</Label>
//                 </div>
//               </RadioGroup>
//             </FormItem>
//           )}
//         />

//         {/* AVAILABILITY */}
//         <FormField
//           control={form.control}
//           name="availability"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Availability</FormLabel>
//               <RadioGroup value={field.value} onValueChange={field.onChange}>
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="ALL" />
//                   <Label>All Branches</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="SELECTED" />
//                   <Label>Selected Branch</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="NONE" />
//                   <Label>None</Label>
//                 </div>
//               </RadioGroup>
//             </FormItem>
//           )}
//         />

//         {/* DESCRIPTION */}
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <Textarea {...field} />
//             </FormItem>
//           )}
//         />

//         {/* IMAGE */}
//         <div>
//           <Label>Image</Label>
//           {imagePreview && <img src={imagePreview} className="mb-2 h-40 rounded object-cover" />}
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;
//               setImageFile(file);
//               setImagePreview(URL.createObjectURL(file));
//             }}
//           />
//         </div>

//         <Button type="submit">Save Menu</Button>
//       </form>
//     </Form>
//   );
// }
