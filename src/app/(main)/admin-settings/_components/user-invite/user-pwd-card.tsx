"use client";

import { useState } from "react";

import { Eye, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function PasswordSettingsCard() {
  const [enabled, setEnabled] = useState(false);
  const [password, setPassword] = useState(":N6jh}1fIaI9");
  const [show, setShow] = useState(false);

  const generatePassword = () => {
    const random = Math.random().toString(36).slice(-10);
    setPassword(random);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-xs tracking-widest uppercase">Password Settings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Toggle */}
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <Switch checked={enabled} onCheckedChange={setEnabled} />
          Set a temporary password
        </label>

        {!enabled && (
          <p className="text-muted-foreground text-xs">
            If not set, the user will receive an email with instructions to set their own password
          </p>
        )}

        {/* Conditional Content */}
        {enabled && (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Temporary Password</Label>
              <Input
                type={show ? "text" : "password"}
                value={password}
                placeholder="Enter temporary password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                The user will be prompted to change this password on first login
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" onClick={generatePassword} className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Generate Password
              </Button>

              <Button variant="secondary" size="sm" onClick={() => setShow((s) => !s)} className="gap-2">
                <Eye className="h-4 w-4" />
                {show ? "Hide Password" : "View Password"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
