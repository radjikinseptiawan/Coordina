"use client"
import { Button, Flex, Grid, TextArea } from "@radix-ui/themes";
import { Dialog, Form } from "radix-ui";
import { useDashboardContext } from "@/app/features/dashboard/da.context";
import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useOrganizationForm } from "../../common/hooks/forms";
import { usePathname } from "next/navigation";

export function BaseDialogForm({ submit, children }: { children: ReactNode, submit?: () => void }) {
    const pathname = usePathname()
    const { setIsOpen } = useDashboardContext()
    return (
        <Form.Root>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-2 my-2">
                {
                    children
                }
            </div>
            <Flex justify={"end"} direction={"row-reverse"} justifySelf={"end"} gap={"3"}>
                <Button color="ruby" type="submit" variant="solid" onClick={submit}> Submit </Button>
                    {
                        pathname !== "/profile" && (
                    <Button type="button" onClick={() => setIsOpen(false)
                    } color="gray" > Close </Button>
                        )
                    }
            </Flex>
        </Form.Root>
    )
}

interface BaseFormProps {
    children: ReactNode;
    submit?: (e?: React.BaseSyntheticEvent) => Promise<void>; 
}

export function BaseForm({submit, children}: BaseFormProps){
    const pathname = usePathname()
    const { setIsOpen } = useDashboardContext()

    return(
         <Form.Root>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-2 my-2">
                {
                    children
                }
            </div>
            <Flex justify={"end"} direction={"row-reverse"} justifySelf={"end"} gap={"3"}>
                <Button color="ruby" type="submit" variant="solid" onClick={submit}> Submit </Button>
                    {
                        pathname !== "/profile" && (
                    <Button type="button" onClick={() => setIsOpen(false)
                    } color="gray" > Close </Button>
                        )
                    }
            </Flex>
        </Form.Root>
    )
}
