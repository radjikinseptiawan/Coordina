"use client"
import { IOrganizationAddSchema, OrganizationAddSchema } from "@/app/features/dashboard/forms/da.schema";
import { IOUserProfileSchema, UserProfileSchema } from "@/app/features/profile/forms/p.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useOrganizationForm = (defaultData?: IOrganizationAddSchema) => {
    return useForm<IOrganizationAddSchema>({
        resolver: zodResolver(OrganizationAddSchema),
        defaultValues: defaultData
    })
}

export const useProfileForm = (defaultData?: IOUserProfileSchema)=>{
    return useForm<IOUserProfileSchema>({
        resolver:zodResolver(UserProfileSchema),
        defaultValues: defaultData,
        mode:"onChange"
    })
}