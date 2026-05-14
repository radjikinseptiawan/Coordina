import { BsPeople } from "react-icons/bs";
import { TextArea, TextField } from "@radix-ui/themes";

export default function CreateOrganizationForm() {
    return (
        <>
            <div>
                <label htmlFor="name" className="text-[12px]">Nama Organisasi</label>
                <TextField.Root
                    name="name"
                    id="name"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Nama Organisasi">
                    <TextField.Slot>
                        <BsPeople />
                    </TextField.Slot>
                </TextField.Root>
            </div>

            <div>
                <label htmlFor="stand" className="text-[12px]">Singkatan Organisasi</label>
                <TextField.Root
                    name="stand"
                    autoComplete="off"
                    autoCorrect="off"
                    id="stand"
                    placeholder="Singkatan Organisasi">
                </TextField.Root>
            </div>

            <div>
                <label htmlFor="operasional" className="text-[12px]">Wilayah Operasi</label>
                <TextField.Root
                    autoComplete="off"
                    autoCorrect="off"
                    name="operasional"
                    id="operasional"
                    placeholder="Wilayah Operasional">
                </TextField.Root>
            </div>

            <div>
                <label htmlFor="city" className="text-[12px]">Kota Operasional</label>
                <TextField.Root
                    autoComplete="off"
                    autoCorrect="off"
                    name="city"
                    id="city"
                    placeholder="Kota Operasional">
                </TextField.Root>
            </div>

            <div>
                <label htmlFor="dated" className="text-[12px]">Tanggal dibentuk</label>
                <TextField.Root
                    autoComplete="off"
                    autoCorrect="off"
                    type="date"
                    name="dated"
                    id="dated">
                </TextField.Root>
            </div>

            <div>
                <label htmlFor="dated" className="text-[12px]">Latar Belakang</label>
                <TextArea
                    autoComplete="off"
                    autoCorrect="off"
                    name="dated"
                    id="dated">
                </TextArea>
            </div>
        </>
    )
}