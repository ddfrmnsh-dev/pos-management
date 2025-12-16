import { ArrowDown, ArrowUp, ReceiptText, TrendingDown, TrendingUp, Utensils } from "lucide-react";

import { CategoryTable } from "../_components/category/category-table";
import StatCard from "../_components/category/stat-card";
import Trend from "../_components/category/trend";

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-muted-foreground text-sm">Create and manage menu categories</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Categories"
          value="6"
          description="Total number of menu categories"
          icon={<ReceiptText className="text-muted-foreground h-4 w-4" />}
        />

        <StatCard
          title="Top Selling Category"
          value="Main Course"
          description="1250 sales"
          icon={<TrendingUp className="h-4 w-4 text-green-600" />}
          trend={<Trend value="+12%" icon={<ArrowUp className="h-4 w-4" />} color="text-green-600" />}
        />

        <StatCard
          title="Least Selling Category"
          value="Beverages"
          description="450 sales"
          icon={<TrendingDown className="h-4 w-4 text-red-600" />}
          trend={<Trend value="-5%" icon={<ArrowDown className="h-4 w-4" />} color="text-red-600" />}
        />

        <StatCard
          title="Category with Most Items"
          value="Main Course"
          description="5 items"
          icon={<Utensils className="h-4 w-4 text-blue-600" />}
        />
      </div>

      {/* Additional content can go here */}
      <CategoryTable />
    </div>
  );
}
