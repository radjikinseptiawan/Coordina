import { Button, Dialog } from "@radix-ui/themes";
import { DialogsPropsType } from "./dialogs.interface";

export default function Dialogs({ children, description, title, open }: DialogsPropsType) {
    return (
        <Dialog.Root open={open}>
            <Dialog.Content>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                {children}
            </Dialog.Content>
        </Dialog.Root >
    )
}