import { Button, Dialog } from "@radix-ui/themes";
import { DialogsPropsType } from "./dialogs.interfaces";
import { AnimatePresence, motion } from "motion/react";
export default function Dialogs({ children, description, title, open }: DialogsPropsType) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0,
                    scaleY: 0
                }}
                animate={{
                    opacity: 1,
                    scaleY: 1
                }}
            >
                <Dialog.Root open={open}>
                    <Dialog.Content>
                        <Dialog.Title>{title}</Dialog.Title>
                        <Dialog.Description>{description}</Dialog.Description>
                        {children}
                    </Dialog.Content>
                </Dialog.Root >
            </motion.div>
        </AnimatePresence>
    )
}