import { FileDown, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrderHistoryHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT */}
      <div>
        <h1 className="text-xl font-semibold">Order History</h1>
        <p className="text-muted-foreground text-sm">View all past orders and transactions</p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>

        <Button variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  );
}
