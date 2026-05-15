export interface SelectorPropsType {
    change: (e: string) => void,
    value: string,
    name?: string,
    text: string,
    array:
    ArrayType[],
    references?: string,
    disabled?: boolean
}

export interface ArrayType {
    domain: string,
    provinces: Array<{
        name: string,
        cities: string[]
    }>
}

export interface SelectorInterfaces {
    variant: string
}