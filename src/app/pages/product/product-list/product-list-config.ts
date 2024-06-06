
import icProduct from "@iconify/icons-ic/twotone-category";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumns } from "@shared/models/list-table-interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { IconsService } from "@shared/services/icons.service";
import { Product } from "src/app/responses/product/product.response";

const searchOptions: SearchOptions[] = [
    {
        label: "Descripción",
        value: 1,
        placeholder: "Buscar por descripción",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "sólo se permiten letras y números en esta búsqueda.",
        icon: "icName"
    },
    {
        label: "Marca",
        value: 2,
        placeholder: "Buscar por marca",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "sólo se permiten letras y números en esta búsqueda.",
        icon: "icDescription"
    }
];

const menuItems: MenuItems[] = [
    {
        type: "link",
        id: "all",
        icon: IconsService.prototype.getIcon("icViewHeadline"),
        label: "Todos"
    },
    {
        type: "link",
        id: "Activo",
        value: 1,
        icon: IconsService.prototype.getIcon("icLabel"),
        label: "Activo",
        class: {
            icon: "text-green",
        },
    },
    {
        type: "link",
        id: "Inactivo",
        value: 0,
        icon: IconsService.prototype.getIcon("icLabel"),
        label: "Inactivo",
        class: {
            icon: "text-gray",
        },
    }
];

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
        label: "COSTO C",
        cssLabel: ["font-bold", "text-sm"],
        property: "purchaseCost",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text", ///?
        sticky: true,
        sort: true,
        sortProperty: "purchaseCost",
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
        label: "F. DE CREACIÓN",
        cssLabel: ["font-bold", "text-sm"],
        property: "auditCreateDate",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
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
        property: "icEdit",
        cssProperty: [],
        type: "icon",
        action: "edit",
        sticky: false,
        sort: false,
        visible: true,
        download: false
    },
    {
        label: "",
        cssLabel: [],
        property: "icDelete",
        cssProperty: [],
        type: "icon",
        action: "remove",
        sticky: false,
        sort: false,
        visible: true,
        download: false
    }
]

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
    icProduct: icProduct,
    icCalendarMonth: icCalendarMonth,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns,
    initialSort: "Id", //campo para ordenar
    initialSortDir: "desc",
    getInputs,
    buttonlabel: "EDITAR",
    buttonlabel2: "ELIMINAR",
    //SEARCH FILTROS
    menuItems: menuItems,
    searchOptions: searchOptions,
    filters_dates_active: false,
    filters: filters,
    datesFilterArray: ['Fecha de creación'],
    filename: "listado-de-productos"

}