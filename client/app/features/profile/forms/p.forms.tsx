"use client"
import { useProfileForm } from "@/app/_shared/common/hooks/forms";
import { BaseForm } from "@/app/_shared/components/Forms/forms.builder";
import Input from "@/app/_shared/components/input";
import axios from "axios";
import { Form, Label } from "radix-ui";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserProfileForms(){
    const { register, setValue, handleSubmit ,reset ,formState:{errors} } = useProfileForm()
    const [preview, setPreview] = useState<any>()
    const getValue = async () =>{
        try{
            const response = await axios.get('/api/profile');

            const data = response.data
            const body = data.response
            reset({
                "username" : body.account.username,
                "email": body.account.email,
                "fullname" : body.fullname,
                "image" : body.image
            })
            setPreview(body.image)
        }catch(e){
            console.error(e)
        }
    }

    const submitUpdate = async (data:any)=>{
        try{
            const load = toast.loading('Sedang memperbarui profile...')

            const formData = new FormData()
            formData.append('username', data.username)
            formData.append('email',data.email)
            formData.append('fullname',data.fullname)

            if (data.image) {
                formData.append("image", data.image) 
            }

            const res = await axios.put('/api/profile',formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log(res)

            if(!res){
                toast.error('Gagal Memperbarui data!')
                return
            }

            toast.success('Data berhasil diperbarui!',{id: load})
        }catch(e){
            toast.error("Gagal memperbarui profile!")
            console.error(e)
        }
    }

    const submitError = (e: any)=>{
        console.error(e)
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) return

      setValue("image", file, {
        shouldValidate: false,
      })
    
      setPreview(URL.createObjectURL(file))
    }

    

    useEffect(()=>{
        getValue()
    },[])
    return(
        <BaseForm submit={handleSubmit(submitUpdate, submitError)}>
            <Form.Field name="foto" className="flex items-center justify-center flex-col">
                <Input  preview={preview} action={handleImage} variant="image"/>            
            </Form.Field>


            <div className="flex flex-col gap-2 items-center justify-center">
            <Form.Field name="username" className="flex flex-col">
                <Form.Label >Username</Form.Label>
                <Form.Control asChild>
                    <input type="text" {...register("username")} name="username" id="Username" className=" border h-8 md:h-12 rounded-md w-72 md:w-96" />
                </Form.Control>
                {errors && <p className="text-xs text-red-400">{errors.username?.message as string}</p>}
            </Form.Field>

            <Form.Field name="fullname" className="flex flex-col">
                <Form.Label >Nama Lengkap</Form.Label>
                <Form.Control {...register("fullname")} className="h-8 md:h-12 border rounded-md w-72 md:w-96" name="fullname" id="Username"/>
                {errors && <p className="text-xs text-red-400">{errors.fullname?.message as string}</p>}
            </Form.Field>

            <Form.Field name="email" className="flex flex-col">
                <Form.Label >Email</Form.Label>
                <Form.Control {...register("email")} className="h-8 w-72 md:h-12 border rounded-md md:w-96" name="email" id="email"/>
                {errors && <p className="text-xs text-red-400">{errors.email?.message as string}</p>}
            </Form.Field>

            </div>

    
        </BaseForm>
    )
}