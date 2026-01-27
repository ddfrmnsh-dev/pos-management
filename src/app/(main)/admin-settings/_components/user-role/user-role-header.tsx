import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UserRoleHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold">Roles & Permissions</h1>
        <p className="text-muted-foreground text-sm">
          Manage user roles and their access permissions across the system
        </p>
      </div>
      <Button onClick={() => router.push("/admin-settings/users/invite")}>
        <Plus className="mr-2 h-4 w-4" />
        Add Role
      </Button>
    </div>
  );
}
