import {Component, EventEmitter, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericValidators } from '@shared/validators/generic-validators';
import { FiltersBox, SearchOptions } from '@shared/models/search-options.interface';
import icCategory from "@iconify/icons-ic/twotone-category";

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BaseApiResponse } from '@shared/models/base-api-response.interface';
import { startWith, switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

export interface CustomerResponse {
  customerId: number
  name: string,
  lastName1: string,
  lastName2: string,
  genderText: string
}
/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'vex-customer-list-to-sales2',
  templateUrl: './customer-list-to-sales2.component.html',
  styleUrls: ['./customer-list-to-sales2.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms]
})

export class CustomerListToSales2Component implements OnInit {
//quitando la columa customerId no se 
  displayedColumns: string[] = [ 'name', 'lastName1', 'lastName2', 'birthDate'];
//  dataSource: CustomerResponse[] = [];
  clickedRows = new Set<CustomerResponse>();
  page = '';
  dataSource: MatTableDataSource<CustomerResponse> = new MatTableDataSource<CustomerResponse>();
  
  paginatorOptions = {
    pageSizeOptions: [10, 20, 50],
    pageSize: 10, //registros por página
    pageLength: 0,
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator 
  @ViewChild(MatSort) sort?: MatSort
  
  changesGetInputs = new EventEmitter<CustomerResponse>()
  
  constructor(public _customerService: CustomerService, private router: Router,private route: ActivatedRoute) {
    this.route.queryParams
    .subscribe(params => {
      this.page = params['Page'];
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngAfterViewInit(): void {
    this.getDataByService();//metodo que obtiene los datos paginados y filtrados 
    this.sortChanges();  //detecta cambios de ordenamiento
    this.paginatorChanges() //paginación
  }

  async getDataByService() {
    this.changesGetInputs
      .pipe(
        startWith(""),
        switchMap(() => {
        //  this._spinner.show("modal-table");
          return this._customerService.GetCustomers(
            this.paginator.pageSize,
            "id",
            "asc",
            this.paginator.pageIndex,
            this.component.getInputs
          );
        })
      )
      .subscribe((data: any) => {
        this.setData(data);
      //  this._spinner.hide("modal-table")
      });
  }

  setData(data: any) {
    if (data.isSuccess) {
      this.paginatorOptions.pageLength = data.data.totalRecords
      this.dataSource.data = data.data.items
    } else {
      console.log("Atención", "Ha ocurrido un error al cargar los datos");
    }
  }
  sortChanges() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0
      this.changesGetInputs.emit()
    })
  }

  paginatorChanges() {
    this.paginator.page.subscribe(() => {
      this.changesGetInputs.emit();
    });
  }

     rowClick(e:any) {  
    let customer = e;
    let redirect = '';
    if (this.page == 'Sales') redirect = '/customerSalesManager2';
    else if (this.page == 'Payments') redirect = '/payments';
 
    this.router.navigate(
      [redirect],
      { queryParams: { customerId: customer.customerId } }
    );
  }


  search(data: FiltersBox) {
    this.paginator.pageIndex=0;
    
    this.component.filters.refresh;
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()
  }

  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }


  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }
  

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
    this.getDataByService(); 
  }

  component = {
    //ICONS
    icCustomer: icCategory,
    //LAYOUT SETTINGS
    menuOpen: false,
    initialSort: "Id",
    initialSortDir: "desc",
    getInputs,
    //SEARCH FILTROS
    searchOptions: searchOptions,
    filters: filters,
    resetFilters:resetFilters
  }
}



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


const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};


const getInputs: string = "";

/*
const componentSettings = {
  //ICONS
  icCustomer: icCategory,
  //LAYOUT SETTINGS
  menuOpen: false,
  //TABLE SETTINGS
  
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  buttonLabel: "EDITAR",
  buttonLabel2: "ELIMINAR",
  //SEARCH FILTROS
  filters: filters,
  
  filters_dates_active: false,
  
}
*/