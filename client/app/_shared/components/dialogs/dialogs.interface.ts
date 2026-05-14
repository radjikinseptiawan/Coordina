import { FormEvent, ReactNode } from "react";

export interface DialogsPropsType {
    submitText?: string,
    submit?: (e: FormEvent<HTMLFormElement>) => void, children: ReactNode,
    title: string, description: string
    open: boolean,
    close: () => void
    checkedText: string;
    isChecked?: boolean;
}