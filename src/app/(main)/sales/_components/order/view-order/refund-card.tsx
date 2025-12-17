import { DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RefundCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Refund Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">
          Issue a refund for this order if needed. This will generate a refund receipt.
        </p>
        <Button variant="destructive" className="gap-2">
          <DollarSign className="h-4 w-4" /> Process Refund
        </Button>
      </CardContent>
    </Card>
  );
}
