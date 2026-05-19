import Dialogs from "@/app/_shared/components/Dialogs/dialogs.builder";
import { useDashboardContext } from "../da.context";
import CreateOrganizationForm from "../forms/da.forms";
import { useOrganizationForm } from "@/app/_shared/common/hooks/forms";
import { FormProvider } from "react-hook-form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { BaseDialogForm } from "@/app/_shared/components/Forms/forms.builder";
import { useRouter } from "next/navigation";

export default function AddDashboardDialogs() {
    const { open, setIsOpen } = useDashboardContext();
    const method = useOrganizationForm()
    const router = useRouter()

    const submitData = async (data: any) => {
        try {
            const response = await axios.post(`/api/dashboard`, data)
            const result = response.data

            if (result) {
                method.reset()
                setIsOpen(false)
            }

            const urlRaw = result.data.response.data

            const urlHead = urlRaw.comity_short_name.toLowerCase().trim()
                .replace(/[^a-z0-9]/g, '')
            const urlTail = urlRaw.id.split("-")[0]

            const resultUrl = {
                id: urlRaw.id,
                urlLink: `${urlHead}-${urlTail}`
            }

            const generateUrl = await axios.put(`/api/dashboard`, resultUrl)

            console.log(generateUrl)

            const user = await axios.get(`/api/profile`)
            const userRes = user.data

            if (userRes.response.fullname === null) {
                toast.error(`Profile kamu belum lengkap, lengkapi profile kamu terlebih dahulu!`)
                setTimeout(() => {
                    router.push("/profile")
                }, 2000)
                return
            }

            router.push(`${resultUrl.urlLink}/keorganisasian`)
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
                <BaseDialogForm submit={method.handleSubmit(submitData, onError)}>
                    <CreateOrganizationForm />
                </BaseDialogForm>
            </FormProvider>
        </Dialogs>
    )
}
