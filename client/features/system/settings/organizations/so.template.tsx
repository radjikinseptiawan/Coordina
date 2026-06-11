import Containers from "@/_shared/layouts/components/containers";
import SettingOrganizations from "./so.controllers/so.forms";

export default function SettingsOrganizationsTemplate() {
  return (
    <Containers
      description="this field used for set up your organizations"
      title="Setting Organizations"
    >
      <SettingOrganizations />
    </Containers>
  );
}
