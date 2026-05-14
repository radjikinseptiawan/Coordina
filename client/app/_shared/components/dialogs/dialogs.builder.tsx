import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import { Grid, XIcon } from "lucide-react";
import { DialogsPropsType } from "./dialogs.interface";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Dialogs({
    title,
    description,
    submitText = "Submit",
    submit,
    children,
    isChecked = false,
    open,
    close,
    checkedText
}: DialogsPropsType) {
    const [checkedVal, setIsCheckedVal] = useState<boolean>(false)
    return (
        <AnimatePresence>
            <Dialog.Root open={open}>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 105 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 200 }}
                >
                    <Dialog.Content maxWidth="400px">
                        <Flex justify="between" align="center">
                            <Dialog.Title m="0">{title}</Dialog.Title>
                            <Dialog.Close>
                                <button onClick={close} className="cursor-pointer">
                                    <XIcon size={18} />
                                </button>
                            </Dialog.Close>
                        </Flex>

                        <Dialog.Description size="2" mb="4">
                            {description}
                        </Dialog.Description>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2 gap-3">
                                {children}
                            </div>
                            {
                                isChecked && (
                                    <div className="flex items-center gap-2 mt-5">
                                        <input type="checkbox"
                                            checked={checkedVal}
                                            onChange={() => setIsCheckedVal(!checkedVal)}
                                            id="check" />
                                        <label htmlFor="check" className="text-[12px] tex-gray-200">
                                            {checkedText} </label>
                                    </div>
                                )
                            }
                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button onClick={close} variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Button disabled={checkedVal ? false : true} color="ruby" type="submit">{submitText}</Button>
                            </Flex>
                        </form>
                    </Dialog.Content>
                </motion.div>

            </Dialog.Root>
        </AnimatePresence>
    );
}