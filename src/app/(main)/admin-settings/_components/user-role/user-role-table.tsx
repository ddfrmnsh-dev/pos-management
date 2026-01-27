import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Role = {
  id: string;
  roleName: string;
  description: string;
  assignUser: string;
  accessLevel: string;
};

export default function UserRoleTable({ roles }: { roles: Role[] }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {["Role Name", "Description", "Assigned Users", "Access Level", "Actions"].map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id} className="hover:bg-muted/50 cursor-pointer">
              <TableCell className="font-medium">{role.roleName}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>{role.assignUser}</TableCell>
              <TableCell>{role.accessLevel}</TableCell>
              <TableCell>
                <Button size="icon" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
