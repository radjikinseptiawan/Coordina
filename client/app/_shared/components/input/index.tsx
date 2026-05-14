import { InputEmail, InputPassword, InputUsername } from "./input.builder";
import { InputProps, InputType } from "./input.interfaces";

export default function Input({ variant, ...props }:
    InputType & InputProps) {
    if (variant === "email") {
        return <InputEmail {...props} />
    }

    if (variant === "password") {
        return <InputPassword {...props} />
    }

    if (variant === "username") {
        return <InputUsername {...props} />
    }

}
