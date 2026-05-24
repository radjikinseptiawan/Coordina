"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RegisterSchemaType } from "../ar.forms/ar.schema"

export const useAuthRegisterForms = ()=>{
    return useForm({
        resolver: zodResolver(RegisterSchemaType),
        defaultValues: {
            email:"",
            username: "",
            password: "",
            confirmPassword: ""
        }
    })
}