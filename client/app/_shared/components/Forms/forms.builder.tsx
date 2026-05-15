import { Button, Flex, Grid, TextArea } from "@radix-ui/themes";
import { Dialog, Form } from "radix-ui";
import { useDashboardContext } from "@/app/features/dashboard/da.context";
import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useOrganizationForm } from "../../common/hooks/hooks";

export default function BaseForm({ submit, children }: { children: ReactNode, submit: () => void }) {
    const { setIsOpen } = useDashboardContext()
    return (
        <Form.Root>
            <Grid
                className="my-4 px-4 py-2" columns={"2"}
                gap={"2"}
                width={"500px"} >

                {
                    children
                }
            </Grid>
            <Flex justify={"end"} direction={"row-reverse"} justifySelf={"end"} gap={"3"}>
                <Button color="ruby" variant="solid" onClick={submit}> Submit </Button>
                <Dialog.Close asChild>
                    <Button type="button" onClick={() => setIsOpen(false)
                    } color="gray" > Close </Button>
                </Dialog.Close>
            </Flex>
        </Form.Root>
    )
}