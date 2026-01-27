import { Search, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type UserFiltersState = {
  search: string;
  role: string;
  branch: string;
  status: string;
};

type Props = {
  filters: UserFiltersState;
  onChange: React.Dispatch<React.SetStateAction<UserFiltersState>>;
  onPageChange: (page: number) => void;
};
export function UserFilters({ filters, onChange, onPageChange }: Props) {
  const update = (key: keyof UserFiltersState, value: string) => {
    onChange((prev) => ({
      ...prev,
      [key]: value,
    }));
    onPageChange(1);
  };
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="relative min-w-[250px] grow">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by name or email..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </div>

      {/* Status */}
      <Select value={filters.status} onValueChange={(value) => update("status", value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="completed">Paid</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Type */}
      <Select value={filters.role} onValueChange={(value) => update("role", value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="dine-in">Dine In</SelectItem>
          <SelectItem value="takeaway">Takeaway</SelectItem>
          <SelectItem value="delivery">Delivery</SelectItem>
        </SelectContent>
      </Select>

      {/* Branch */}
      <Select value={filters.branch} onValueChange={(value) => update("branch", value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Branches" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>
          <SelectItem value="jakarta">Jakarta</SelectItem>
          <SelectItem value="bandung">Bandung</SelectItem>
          <SelectItem value="surabaya">Surabaya</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset */}
      <Button
        variant="secondary"
        className="flex items-center gap-2"
        onClick={() =>
          onChange({
            search: "",
            status: "all",
            role: "all",
            branch: "all",
          })
        }
      >
        <RefreshCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
