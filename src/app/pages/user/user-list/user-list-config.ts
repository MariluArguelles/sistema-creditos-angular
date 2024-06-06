
import icProduct from "@iconify/icons-ic/twotone-category";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumns } from "@shared/models/list-table-interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { IconsService } from "@shared/services/icons.service";
import { User } from "src/app/responses/user/user.response";

const searchOptions: SearchOptions[] = [
    {
        label: "Username",
        value: 1,
        placeholder: "Buscar por descripción",
        validation: [GenericValidators.alphanumeric],
        validation_desc: "no se permiten caracteres raros",
        icon: "icName"
    },
    {
        label: "Email",
        value: 2,
        placeholder: "Buscar por correo electrónico",
        validation: [GenericValidators.emailValidation],
        validation_desc: "sólo se permiten correos electrónicos",
        icon: "icDescription"
    },
    {
        label: "AuthType",
        value: 2,
        placeholder: "Buscar por tipo de autentificación (Interna/externa)",
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

const tableColumns: TableColumns<User>[] = [
    {
        label: "USERNAME",
        cssLabel: ["font-bold", "text-sm"],
        property: "userName",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "userName",
        visible: true,
        download: true
    },
    {
        label: "CORREO E.",
        cssLabel: ["font-bold", "text-sm"],
        property: "email",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "email",
        visible: true,
        download: true
    },
    {
        label: "TIPO",
        cssLabel: ["font-bold", "text-sm"],
        property: "authType",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text", 
        sticky: true,
        sort: true,
        sortProperty: "authType",
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
        property: "stateUser",
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
    
    //SEARCH FILTROS
    menuItems: menuItems,
    searchOptions: searchOptions,
    filters_dates_active: false,
    filters: filters,
    datesFilterArray: ['Fecha de creación'],
    filename: "lista-de-usuarios"

}