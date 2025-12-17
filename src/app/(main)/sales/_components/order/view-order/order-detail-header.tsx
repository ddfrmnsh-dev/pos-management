import { useRouter } from "next/navigation";

import { ArrowLeft, Printer, FileDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function OrderDetailHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT */}
      <div className="flex items-start gap-3">
        <ArrowLeft
          onClick={() => {
            router.back();
          }}
          className="text-muted-foreground mt-1 h-5 w-5 cursor-pointer"
        />

        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Order ORD78901</h1>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              completed
            </Badge>
            <span className="text-muted-foreground text-sm">Sep 10, 2023 · 06:30 PM</span>
            <Badge variant="outline">Los Angeles Branch</Badge>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="w-full gap-2 sm:w-auto">
          <Printer className="h-4 w-4" />
          Print Receipt
        </Button>
        <Button variant="outline" className="w-full gap-2 sm:w-auto">
          <FileDown className="h-4 w-4" />
          Download Invoice
        </Button>
      </div>
    </div>
  );
}
