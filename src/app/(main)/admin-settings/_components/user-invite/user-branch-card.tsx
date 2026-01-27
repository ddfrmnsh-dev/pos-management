import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const branches = [
  { name: "Downtown Main", label: "Downtown" },
  { name: "Westside Plaza", label: "West" },
  { name: "Eastside Corner", label: "East" },
  { name: "Northside Mall", label: "North" },
  { name: "Airport Terminal", label: "Airport" },
];

export default function BranchAssignmentCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs tracking-widest uppercase">Branch Assignment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm font-medium">Assign to Branch(es)</p>

        <div className="max-h-[300px] space-y-3 overflow-y-auto">
          {branches.map((branch) => (
            <label key={branch.name} className="flex cursor-pointer items-center gap-3">
              <Switch />
              <span className="text-sm">{branch.name}</span>
              <span className="text-muted-foreground text-xs">({branch.label})</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
