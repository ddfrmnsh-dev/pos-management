import { User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CustomerDetails() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm tracking-widest uppercase">Customer Details</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2 text-sm">
        <User className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">Emma Thompson</span>
      </CardContent>
    </Card>
  );
}
