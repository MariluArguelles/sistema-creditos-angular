import { Component, OnInit } from '@angular/core';
import { TableColumns } from '@shared/models/list-table-interface';
import { CustomerResponse } from 'src/app/responses/customer/customer.response';
import icCategory from "@iconify/icons-ic/twotone-category";
import { GenericValidators } from '@shared/validators/generic-validators';
import { FiltersBox, SearchOptions } from '@shared/models/search-options.interface';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectCustomerService } from 'src/app/services/selectCustomer.service.';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
//https://icon-sets.iconify.design/ic/twotone-arrow-forward/

@Component({
  selector: 'vex-customer-list-to-sales',
  templateUrl: './customer-list-to-sales.component.html',
  styleUrls: ['./customer-list-to-sales.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms]
})
export class CustomerListToSalesComponent implements OnInit {
  page = '';
  constructor(
    customTitle: CustomTitleService,
    public _customerService: SelectCustomerService,
    private router: Router,
    private route: ActivatedRoute) {

    customTitle.set('Lista de clientes')
    this.route.queryParams
      .subscribe(params => {
        this.page = params['Page'];
      });
    //console.log('valor de pa pagina' + this.page);
  }

  ngOnInit(): void {
  }

  rowClick(e: any) {
    let customer = e.row
    
    let redirect = '';
    if (this.page == 'Sales') redirect = '/customerSalesManager';
    else if (this.page == 'Payments') redirect = '/payments';


    this.router.navigate(
      [redirect],
      { queryParams: { customerId: customer.customerId } }
    );

  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()
  }

  formatGetInputs() {
    let str = "";
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }
    // if (this.component.filters.startDate != "" &&
    //   this.component.endDate != "") { //filtrar por fechas
    //   str += `&starDate=${this.component.filters.starDate}`;
    //   str += `&endDate=${this.component.filters.endDate}`;
    // }
    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
    this.component.getInputs = str;
  }


  component = {
    //ICONS
    icCustomer: icCategory,
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
    searchOptions: searchOptions,
    filters_dates_active: false,
    filters: filters
  }
}

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
    property: "icSelect",
    cssProperty: [],
    type: "icon",
    action: "select",
    sticky: false,
    sort: false,
    visible: true,
    download: false
}

]

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

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
}

const getInputs: string = "";

const componentSettings = {
  //ICONS
  icCustomer: icCategory,
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

  filters_dates_active: false,
  filters: filters
}

