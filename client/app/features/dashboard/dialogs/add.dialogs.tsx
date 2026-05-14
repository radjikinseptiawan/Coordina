import Dialogs from "@/app/_shared/components/dialogs/dialogs.builder";
import { useDashboardContext } from "../da.context";
import CreateOrganizationForm from "../forms/da.forms";

export default function AddDashboardDialogs() {
    const { open, setIsOpen } = useDashboardContext();
    return (
        <Dialogs
            close={() => setIsOpen(false)}
            open={open}
            title="Buat Organisasi"
            description="Lengkapi informasi di bawah ini untuk mendaftarkan organisasi Anda ke dalam sistem kami secara resmi."
            checkedText="Saya menyatakan bahwa seluruh data yang diberikan adalah benar dan saya bersedia bertanggung jawab penuh atas keabsahan informasi tersebut. "
            isChecked
        >
            <CreateOrganizationForm />

        </Dialogs>
    )
}