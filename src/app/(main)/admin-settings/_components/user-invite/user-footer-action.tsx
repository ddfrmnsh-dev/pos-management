"use client";
import { useRouter } from "next/navigation";

import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function InviteUserActions() {
  const router = useRouter();
  return (
    <div className="flex gap-3 pt-2">
      <Button className="gap-2">
        <Save className="h-4 w-4" />
        Send Invitation
      </Button>

      <Button variant="secondary" className="gap-2" onClick={() => router.back()}>
        <X className="h-4 w-4" />
        Cancel
      </Button>
    </div>
  );
}
