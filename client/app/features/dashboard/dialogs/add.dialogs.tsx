import Dialogs from "@/app/_shared/components/Dialogs/dialogs.builder";
import { useDashboardContext } from "../da.context";
import CreateOrganizationForm from "../forms/da.forms";
import BaseForm from "@/app/_shared/components/Forms/forms.builder";
import { useOrganizationForm } from "@/app/_shared/common/hooks/hooks";
import { FormProvider } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { serverUrl } from "@/utils/connection";

export default function AddDashboardDialogs() {
    const { open, setIsOpen } = useDashboardContext();
    const method = useOrganizationForm()

    const submitData = async (data: any) => {
        try {
            const response = await axios.post(`/api/dashboard`, data)
            const result = response.data

            console.log("Result", result)

            if (result) {
                method.reset()
                setIsOpen(false)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log("Error Axios", e)
            }
            console.error(e)
        }
    }

    const onError = (errors: any) => {
        console.log("Gagal Submit! List Error:", errors)
    }
    return (
        <Dialogs
            open={open}
            title="Buat Organisasi"
            description="Silahkan masukan data dibawah ini untuk mendaftarkan organisasi kamu dalam sistem kami"
        >
            <FormProvider {...method}>
                <BaseForm submit={method.handleSubmit(submitData, onError)}>
                    <CreateOrganizationForm />
                </BaseForm>
            </FormProvider>
        </Dialogs>
    )
}
