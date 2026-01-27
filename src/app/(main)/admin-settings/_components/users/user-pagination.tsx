import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  page: number;
  pages: number[];
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function UserPagination({ page, pages, pageSize, totalPages, onPageChange, onPageSizeChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Page size */}
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            onPageSizeChange(Number(v));
            onPageChange(1); // reset ke page 1
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>

        <span>
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Pagination buttons */}
      <div className="flex flex-wrap gap-1">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>

        {pages.map((p) => (
          <Button key={p} size="sm" variant={p === page ? "default" : "outline"} onClick={() => onPageChange(p)}>
            {p}
          </Button>
        ))}

        <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
