import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Select } from "radix-ui";
import { SelectorPropsType } from "./selector.interfaces";

export function SelectorProvince({
    change, value,
    array, text, disabled }: SelectorPropsType) {
    return (
        <Select.Root onValueChange={change}
            value={value}
        >
            <Select.Trigger
                disabled={disabled} className="w-full flex items-center justify-between border rounded-md p-2" >
                <Select.Value placeholder={text} />
                <Select.Icon>
                    <ChevronDown className="h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={5}
                    className={`${disabled ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-white"}  p-2 max-h-72 rounded-md shadow-xl`}
                >
                    <Select.ScrollUpButton>
                        <ChevronUp size={14} />
                    </Select.ScrollUpButton>

                    <Select.Viewport>
                        {
                            array.map((item: any, index: number) => (
                                <Select.Group key={index} >
                                    <Select.Label className="bg-gray-300 p-1 font-semibold rounded-md">{item.domain}</Select.Label>
                                    {
                                        item.provinces.map((item: any, index: number) => (
                                            <Select.Item key={index} value={item.name} className="flex items-center flex-row-reverse">
                                                <Select.ItemText>{item.name}</Select.ItemText>
                                                <Select.ItemIndicator>
                                                    <Check size={14} />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        ))
                                    }
                                </Select.Group>
                            ))
                        }
                    </Select.Viewport>
                    <Select.ScrollDownButton>
                        <ChevronDown size={14} />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}


export function SelectorCity({
    change, value,
    array, text, disabled, references }: SelectorPropsType) {
    return (
        <Select.Root onValueChange={change}
            value={value}
        >
            <Select.Trigger
                disabled={disabled} className={`${disabled ?  "cursor-not-allowed bg-gray-400 text-gray-500" : "cursor-pointer bg-white"} w-full flex items-center justify-between border rounded-md p-2`}>
                <Select.Value placeholder={text} />
                <Select.Icon>
                    <ChevronDown className="h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={5}
                    className={`p-2 max-h-72 bg-white rounded-md shadow-xl`}
                >
                    <Select.ScrollUpButton>
                        <ChevronUp size={14} />
                    </Select.ScrollUpButton>

                    <Select.Viewport>
                        {
                            array.map((item: any, index: number) => (
                                <Select.Group key={index} >
                                    {
                                        item.provinces.map((item: any, index: number) => {
                                            const sample = references
                                            if (sample !== item.name) return null

                                            const storeData = []
                                            storeData.push(item)

                                            const usedData = storeData[0].cities

                                            return (
                                                <div key={index}>
                                                    {
                                                        usedData.map((item: any, index: number) => {
                                                            return (
                                                                <Select.Item key={index} value={item} className="flex items-center flex-row-reverse">
                                                                    <Select.ItemText>{item}</Select.ItemText>
                                                                    <Select.ItemIndicator>
                                                                        <Check size={14} />
                                                                    </Select.ItemIndicator>
                                                                </Select.Item>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </Select.Group>
                            ))
                        }
                    </Select.Viewport>
                    <Select.ScrollDownButton>
                        <ChevronDown size={14} />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
