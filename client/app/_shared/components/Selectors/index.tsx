import { SelectorCity, SelectorProvince } from "./selector.builder";
import { SelectorInterfaces, SelectorPropsType } from "./selector.interfaces";

export default function Selector({ variant, ...props }: SelectorInterfaces & SelectorPropsType) {
    if (variant == "province") {
        return <SelectorProvince {...props} />
    }

    if (variant === "city") {
        return <SelectorCity {...props} />
    }
}