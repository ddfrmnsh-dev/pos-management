"use client";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export default function InviteUserHeader() {
  const router = useRouter();

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <ArrowLeft
          className="text-muted-foreground hover:text-foreground mt-1 h-4 w-4 cursor-pointer"
          onClick={() => router.back()}
        />

        <div>
          <h1 className="text-xl font-semibold">Invite User</h1>
          <p className="text-muted-foreground text-sm">Send an invitation to a new user to join your organization</p>
        </div>
      </div>
    </div>
  );
}
