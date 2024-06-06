


export interface TableColumns<T> {
    label: string
    cssLabel: string[]
    property: keyof T | string
    cssProperty: string[]
    subProperty?: keyof T | string
    cssSubProperty?: string[]
    type: "text" | "datetime" | "time" | "icon" | "button" | "badge"
    visible: boolean
    sort: boolean
    sortProperty?: string
    action?: string
    sticky: boolean //cabecera fija
    tooltip?: string
    download?: boolean //si es descargable la columna
    property_download?: string //conque propiedad de exporta en excel
}

export interface TableFooter<T> {
    label: string
    property: keyof T | string //genérico o string
    tooltip: string
}