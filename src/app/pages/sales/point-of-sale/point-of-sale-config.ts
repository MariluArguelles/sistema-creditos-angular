import { TableColumns } from "@shared/models/list-table-interface";
import { Product } from "src/app/responses/product/product.response";
import icProduct from "@iconify/icons-ic/twotone-category";
import { SearchOptions } from "@shared/models/search-options.interface";
import { GenericValidators } from "@shared/validators/generic-validators";

const tableColumns: TableColumns<Product>[] = [
    {
        label: "DESCRIPCIÓN",
        cssLabel: ["font-bold", "text-sm"],
        property: "description",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "description",
        visible: true,
        download: true
    },
    {
        label: "MARCA",
        cssLabel: ["font-bold", "text-sm"],
        property: "brand",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "brand",
        visible: true,
        download: true
    },

    {
        label: "COSTO V",
        cssLabel: ["font-bold", "text-sm"],
        property: "salesCost",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text", ///?
        sticky: true,
        sort: true,
        sortProperty: "salesCost",
        visible: true,
        download: true
    },

    {
        label: "ESTADO",
        cssLabel: ["font-bold", "text-sm"],
        property: "stateProduct",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "badge",
        sticky: false,
        sort: false,
        visible: true,
        download: true
    },
    {
        label: "",
        cssLabel: [],
        property: "icSelect",
        cssProperty: [],
        type: "icon",
        action: "edit",
        sticky: false,
        sort: false,
        visible: true,
        download: false
    }
]

const tableColumns2: TableColumns<Product>[] = [
    {
        label: "No.",
        cssLabel: ["font-bold", "text-sm"],
        property: "quantity",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "quantity",
        visible: true,
        download: true
    },
    {
        label: "PRECIO",
        cssLabel: ["font-bold", "text-sm"],
        property: "price",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "price",
        visible: true,
        download: true
    },
    {
        label: "SUBTOTAL",
        cssLabel: ["font-bold", "text-sm"],
        property: "subtotal",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text", ///?
        sticky: true,
        sort: true,
        sortProperty: "subtotal",
        visible: true,
        download: true
    }
]


const searchOptions: SearchOptions[] = [
    {
        label: "Descripción",
        value: 1,
        placeholder: "Buscar por descripción",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "sólo se permiten letras y números en esta búsqueda.",
        icon: "icName"
    }
];

const filters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: "",
    endDate: "",
    refresh: false,
}

const getInputs: string = "";

export const componentSettings = {
    //ICONS
    icCategory: icProduct,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns,
    initialSort: "Id", //campo para ordenar
    initialSortDir: "desc",
    getInputs,
    searchOptions: searchOptions,
    filters: filters,
    buttonlabel: "EDITAR",
    buttonlabel2: "ELIMINAR",
    filename: "recibo-de-compra"
}

export const componentSettings2 = {
    //ICONS
    icCategory: icProduct,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns2,
    initialSort: "Id", //campo para ordenar
    initialSortDir: "desc",
    getInputs,
    searchOptions: searchOptions,
    filters: filters,
    filename: "recibo-de-compra"
}