import { useRouter } from "next/navigation";

import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UserHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold">User Management</h1>
        <p className="text-muted-foreground text-sm">Manage user accounts, roles, and permissions</p>
      </div>
      <Button onClick={() => router.push("/admin-settings/users/invite")}>
        <UserPlus className="mr-2 h-4 w-4" />
        Invite User
      </Button>
    </div>
  );
}
