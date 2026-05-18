import { FormEvent, ReactNode } from "react";

export interface DialogsPropsType {
    children: ReactNode, title: string, description: string, open: boolean
}