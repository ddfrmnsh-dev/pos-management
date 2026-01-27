import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserInformationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs tracking-widest uppercase">User Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>Email Address</Label>
          <Input placeholder="Enter email address" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <Label>First Name</Label>
            <Input placeholder="Enter first name" />
          </div>

          <div className="space-y-1">
            <Label>Last Name</Label>
            <Input placeholder="Enter last name" />
          </div>
        </div>

        <div className="space-y-1">
          <Label>Role</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select user role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="cashier">Cashier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
