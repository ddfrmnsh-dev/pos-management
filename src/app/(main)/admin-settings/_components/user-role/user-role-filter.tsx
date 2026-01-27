import { Search, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type UserRoleFiltersState = {
  search: string;
  scope: string;
};

type Props = {
  filters: UserRoleFiltersState;
  onChange: React.Dispatch<React.SetStateAction<UserRoleFiltersState>>;
  onPageChange: (page: number) => void;
};
export function UserRoleFilters({ filters, onChange, onPageChange }: Props) {
  const update = (key: keyof UserRoleFiltersState, value: string) => {
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

      {/* Scopes */}
      <Select value={filters.scope} onValueChange={(value) => update("scope", value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Scopes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Scopes</SelectItem>
          <SelectItem value="hq">HQ</SelectItem>
          <SelectItem value="region">Region</SelectItem>
          <SelectItem value="branch">Branch</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset */}
      <Button
        variant="secondary"
        className="flex items-center gap-2"
        onClick={() =>
          onChange({
            search: "",
            scope: "all",
          })
        }
      >
        <RefreshCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
