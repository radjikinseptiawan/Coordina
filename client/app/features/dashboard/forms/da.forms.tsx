import { BsPeople } from "react-icons/bs";
import { TextArea, TextField } from "@radix-ui/themes";
import { Check, ChevronDown, ChevronUp, Map } from "lucide-react";
import { Form, Select } from "radix-ui";
import { area_operasional } from "../resources/da.resources";
import Selector from "@/app/_shared/components/Selectors";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CreateOrganizationForm() {
    const [province, setProvince] = useState<string>("")
    const [city, setCity] = useState<string>("")

    const { register, setValue, formState: { errors } } = useFormContext()

    return (
        <>
            <Form.Field name="comity_name">
                <Form.Label htmlFor="comity_name">Nama Organisasi</Form.Label>
                <Form.Control {...register("comity_name", { required: true, minLength: 8, maxLength: 255 })} className="w-full flex items-center justify-between border rounded-md p-2"></Form.Control>
                {errors.comity_name && <p className="text-xs text-red-400">{errors.comity_name.message as string}</p>}
            </Form.Field>
            <Form.Field name="comity_short_name">
                <Form.Label htmlFor="comity_short_name">Singkatan Organisasi</Form.Label>
                <Form.Control {...register("comity_short_name", { required: true, minLength: 1, maxLength: 15 })} className="w-full flex items-center justify-between border rounded-md p-2" name="comity_short_name"></Form.Control>
                {errors.comity_short_name && <p className="text-xs text-red-400">{errors.comity_short_name.message as string}</p>}
            </Form.Field>

            <Form.Field className="flex flex-col" name="area_operasional">
                <Form.Label htmlFor="area_operasional">Area Operasional</Form.Label>
                <Selector
                    variant="province"
                    change={(e: any) => {
                        setProvince(e)
                        setValue("comity_area_of_operational", e, { shouldValidate: true })
                    }}
                    value={province}
                    text="Pilih Area Operasional" array={area_operasional} />
                {errors.comity_area_of_operational && <p className="text-xs text-red-400">{errors.comity_area_of_operational.message as string}</p>}
            </Form.Field>


            <Form.Field className="flex flex-col" name="area_operasional">
                <Form.Label htmlFor="area_operasional">Kota/Kabupaten Operasional</Form.Label>
                <Selector
                    variant="city"
                    change={(e: any) => {
                        setCity(e)
                        setValue("comity_city_of_operational", e, { shouldValidate: true })
                    }}
                    disabled={province.length > 1 ? false : true }
                    value={city}
                    text="Pilih Area Operasional" references={province} array={area_operasional} />
                {errors.comity_city_of_operational && <p className="text-xs text-red-400">{errors.comity_city_of_operational.message as string}</p>}
            </Form.Field>

            <Form.Field name="comity_background">
                <Form.Label htmlFor="comity_background">Latar Belakang Organisasi</Form.Label>
                <Form.Control {...register("comity_background")} className="w-full flex items-center justify-between border rounded-md p-2" name="comity_background"></Form.Control>
                {errors.comity_background && <p className="text-xs text-red-400">{errors.comity_background.message as string}</p>}
            </Form.Field>


            <Form.Field name="comity_created_date">
                <Form.Label htmlFor="comity_created_date">Tanggal Organisasi di Buat</Form.Label>
                <Form.Control type="date" {...register("comity_created_date")} className="w-full flex items-center justify-between border rounded-md p-2" name="comity_created_date"></Form.Control>
                {errors.comity_created_date && <p className="text-xs text-red-400">{errors.comity_created_date.message as string}</p>}
            </Form.Field>
        </>
    )
}
