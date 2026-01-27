import BranchAssignmentCard from "../../_components/user-invite/user-branch-card";
import InviteUserActions from "../../_components/user-invite/user-footer-action";
import UserInformationCard from "../../_components/user-invite/user-info-card";
import InviteUserHeader from "../../_components/user-invite/user-invite-header";
import PasswordSettingsCard from "../../_components/user-invite/user-pwd-card";

export default function Page() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6">
      <InviteUserHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-3">
          <UserInformationCard />
          <BranchAssignmentCard />
        </div>

        {/* RIGHT */}
        <PasswordSettingsCard />
      </div>

      <InviteUserActions />
    </div>
  );
}
