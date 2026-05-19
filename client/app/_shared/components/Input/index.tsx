import { InputEmail, InputImage, InputPassword, InputUsername } from "./input.builder";
import { BasicInputProps, InputImageFile, InputType } from "./input.interfaces";

export default function Input({ variant, ...props }:
    InputType & BasicInputProps & InputImageFile) {
    if (variant === "email") {
        return <InputEmail {...props} />
    }

    if (variant === "password") {
        return <InputPassword {...props} />
    }

    if (variant === "username") {
        return <InputUsername {...props} />
    }

    if (variant === "image") {
        return <InputImage {...props} />
    }
}
