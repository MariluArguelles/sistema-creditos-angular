import { CustomerResponse } from "src/app/responses/customer/customer.response";
import icCategory from "@iconify/icons-ic/twotone-category";
import { GenericValidators } from "@shared/validators/generic-validators";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { MenuItems } from "@shared/models/menu-items.interface";
import { TableColumns } from "@shared/models/list-table-interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";


const searchOptions: SearchOptions[] = [
    {
        label: "Nombre",
        value: 1,
        placeholder: "Buscar por Nombre",
        validation: [GenericValidators.defaultName],
        validation_desc: "Sólo se permiten letras en esta búsqueda",
        icon: "icName"
    },
    {
        label: "Apellido Paterno",
        value: 2,
        placeholder: "Buscar por Apellido Paterno",
        validation: [GenericValidators.defaultName],
        validation_desc: "Sólo se permiten letras en esta búsqueda",
        icon: "icDescription"
    },
    {
        label: "Apellido Materno",
        value: 3,
        placeholder: "Buscar por Apellido Materno",
        validation: [GenericValidators.defaultName],
        validation_desc: "Sólo se permiten letras en esta búsqueda",
        icon: "icDescription"
    }
]

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

const tableColumns: TableColumns<CustomerResponse>[] = [
    {
        label: "NOMBRE",
        cssLabel: ["font-bold", "text-sm"],
        property: "name",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "name",
        visible: true,
        download: true
    },
    {
        label: "AP. PATERNO",
        cssLabel: ["font-bold", "text-sm"],
        property: "lastName1",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "lastName1",
        visible: true,
        download: true
    },
    {
        label: "AP. MATERNO",
        cssLabel: ["font-bold", "text-sm"],
        property: "lastName2",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
        sortProperty: "lastName2",
        visible: true,
        download: true
    },
    {
        label: "F. DE NACI",
        cssLabel: ["font-bold", "text-sm"],
        property: "birthDate",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: true,
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
        label: "SEXO",
        cssLabel: ["font-bold", "text-sm"],
        property: "genderText",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: false,
        sort: false,
        visible: true,
        download: true
    },
    // {
    //     label: "CORREO ELECTRÓNICO",
    //     cssLabel: ["font-bold", "text-sm"],
    //     property: "email",
    //     cssProperty: ["font-semibold", "text-sm", "text-left"],
    //     type: "text",
    //     sticky: false,
    //     sort: false,
    //     visible: true,
    //     download: true
    // },
    {
        label: "ESTADO",
        cssLabel: ["font-bold", "text-sm"],
        property: "stateCustomer",
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

const resetFilters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    startDate: "",
    endDate: "",
    refresh: false,
  };

const getInputs: string = "";

export const componentSettings = {
    //ICONS
    icCustomer: icCategory,
    icCalendarMonth: icCalendarMonth,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    getInputs,
    buttonLabel: "EDITAR",
    buttonLabel2: "ELIMINAR",
    //SEARCH FILTROS
    menuItems: menuItems,
    searchOptions: searchOptions,
    filters_dates_active: false,
    filters: filters,
    resetFilters,
    datesFilterArray: ['Fecha de creación'],
    filename: "listado-de-clientes"
}
