import { IOrganizationAddSchema, OrganizationAddSchema } from "@/app/features/dashboard/forms/da.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useOrganizationForm = (defaultData?: IOrganizationAddSchema) => {
    return useForm<IOrganizationAddSchema>({
        resolver: zodResolver(OrganizationAddSchema),
        defaultValues: defaultData
    })
}