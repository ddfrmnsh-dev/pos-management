import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VariantPriceMode = "price" | "adjustment";

type VariantOption = {
  id: string;
  name: string;
  price: number;
};

type VariantGroup = {
  id: string;
  name: string;
  isRequired: boolean;
  priceMode: VariantPriceMode;
  options: VariantOption[];
};

type VariantsDraft = {
  enabled: boolean;
  groups: VariantGroup[];
};

function ProductVariantSection(props: { value: VariantsDraft; onChange: (next: VariantsDraft) => void }) {
  const { value, onChange } = props;

  const enabled = value.enabled;
  const groups = value.groups;

  const setEnabled = (v: boolean) => onChange({ ...value, enabled: v });

  const setGroups = (nextGroups: VariantGroup[]) => onChange({ ...value, groups: nextGroups });

  const uid = (prefix: string) => `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

  const addGroup = () => {
    setGroups([
      ...groups,
      {
        id: uid("group"),
        name: "",
        isRequired: true,
        priceMode: "adjustment",
        options: [{ id: uid("opt"), name: "", price: 0 }],
      },
    ]);
  };

  const removeGroup = (groupId: string) => setGroups(groups.filter((g) => g.id !== groupId));

  const updateGroup = (groupId: string, patch: Partial<VariantGroup>) => {
    setGroups(groups.map((g) => (g.id === groupId ? { ...g, ...patch } : g)));
  };

  const addOption = (groupId: string) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId ? { ...g, options: [...g.options, { id: uid("opt"), name: "", price: 0 }] } : g,
      ),
    );
  };

  const removeOption = (groupId: string, optionId: string) => {
    setGroups(
      groups.map((g) => (g.id === groupId ? { ...g, options: g.options.filter((o) => o.id !== optionId) } : g)),
    );
  };

  const updateOption = (groupId: string, optionId: string, patch: Partial<VariantOption>) => {
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          options: g.options.map((o) => (o.id === optionId ? { ...o, ...patch } : o)),
        };
      }),
    );
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Variants</h3>
            <p className="text-muted-foreground text-sm">
              Add options like Size, Temperature, etc. These will be sent in the same submit payload.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox checked={enabled} onCheckedChange={(v) => setEnabled(Boolean(v))} />
            <Label className="cursor-pointer">This item has variants</Label>
          </div>
        </div>

        {!enabled ? (
          <div className="bg-muted/30 rounded-lg border p-4 text-sm">
            <p className="text-muted-foreground">
              Variants are disabled. This menu will use <span className="font-medium">Base Price</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Group name</Label>
                    <Input
                      placeholder="e.g. Size, Temperature"
                      value={g.name}
                      onChange={(e) => updateGroup(g.id, { name: e.target.value })}
                    />

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={g.isRequired}
                          onCheckedChange={(v) => updateGroup(g.id, { isRequired: Boolean(v) })}
                        />
                        <span>Required</span>
                      </label>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-muted-foreground text-sm">Price mode:</span>

                        <Button
                          type="button"
                          variant={g.priceMode === "price" ? "default" : "secondary"}
                          size="sm"
                          onClick={() => updateGroup(g.id, { priceMode: "price" })}
                        >
                          Final price
                        </Button>

                        <Button
                          type="button"
                          variant={g.priceMode === "adjustment" ? "default" : "secondary"}
                          size="sm"
                          onClick={() => updateGroup(g.id, { priceMode: "adjustment" })}
                        >
                          Adjustment
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" size="sm" onClick={() => addOption(g.id)}>
                      + Add option
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeGroup(g.id)}>
                      Remove group
                    </Button>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {g.options.map((o, idx) => (
                    <div key={o.id} className="grid grid-cols-12 items-end gap-2">
                      <div className="col-span-12 sm:col-span-7">
                        {idx === 0 && <Label className="text-muted-foreground text-xs">Option name</Label>}
                        <Input
                          placeholder="e.g. Small, Large"
                          value={o.name}
                          onChange={(e) => updateOption(g.id, o.id, { name: e.target.value })}
                        />
                      </div>

                      <div className="col-span-10 sm:col-span-4">
                        {idx === 0 && (
                          <Label className="text-muted-foreground text-xs">
                            {g.priceMode === "price" ? "Price" : "Adjustment"}
                          </Label>
                        )}
                        <div className="relative">
                          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                            Rp
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={100}
                            className="pl-10"
                            value={Number.isFinite(o.price) ? o.price : 0}
                            onChange={(e) => updateOption(g.id, o.id, { price: Number(e.target.value) })}
                          />
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-end sm:col-span-1">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => removeOption(g.id, o.id)}
                          disabled={g.options.length <= 1}
                          title={g.options.length <= 1 ? "At least 1 option required" : "Remove option"}
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="secondary" onClick={addGroup}>
                + Add Variant Group
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProductVariantSection;
