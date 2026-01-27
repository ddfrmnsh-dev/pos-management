import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  branches: string;
  status: string;
  lastActive: string; // ISO
  time: string;
};

export default function UserTables({ users }: { users: User[] }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {["Name", "Email", "Role", "Branches", "Status", "Last Active", "Actions"].map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50 cursor-pointer">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.branches}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "secondary" : "destructive"} className="capitalize">
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
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
