import {Component, EventEmitter, OnInit } from '@angular/core';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { ActivatedRoute, Router } from '@angular/router';
import icCategory from "@iconify/icons-ic/twotone-category";
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { startWith, switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { SalesService } from 'src/app/services/sales.service';
import { CoreService } from '../../category/crud-app-angular-material/src/app/core/core.service';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { Sales } from 'src/app/responses/sales/sales.interface';

export interface SalesResponse {
  saleId: number
  total:number
  balance:number,
  paid:string,
  closed:string,
  auditCreateDate:string
}
/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'vex-customer-sales-manager2',
  templateUrl: './customer-sales-manager2.component.html',
  styleUrls: ['./customer-sales-manager2.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms]
})

export class CustomerSalesManager2Component implements OnInit {

  customerId = '';
  
  constructor(
    customTitle: CustomTitleService,
    private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    private _coreService: CoreService) {
      
      this.route.queryParams
      .subscribe(params => {
        this.customerId = params['customerId'];
        this.component.getInputs="CustomerId="+this.customerId;
      });
      
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //quitando la columa customerId no se ve ?
  displayedColumns: string[] = [ 'total', 'balance', 'paid', 'closed','auditCreateDate'];
  clickedRows = new Set<SalesResponse>();
  dataSource: MatTableDataSource<SalesResponse> = new MatTableDataSource<SalesResponse>();
  
  paginatorOptions = {
    pageSizeOptions: [10, 20, 50],
    pageSize: 10, //registros por página
    pageLength: 0,
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator 
  @ViewChild(MatSort) sort?: MatSort
  
  changesGetInputs = new EventEmitter<SalesResponse>()
  
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
          return this._salesService.GetAll(
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

  async nuevaVenta() {
    let SaleId: number = 0;
    let Sale: Sales =
    {
      saleId: 0,
      customerId: parseInt(this.customerId),
      registerDate: new Date(),
      subTotal: 0,
      total: 0,
      balance: 0,
      closed:false,
      paid: false,
      state:1
    }
    await this._salesService.saveSale(Sale).then
      (
        (data: any) => {
          SaleId = data;
        }
      );
    this.router.navigate(['/pointOfSale'], { queryParams: { customerId: this.customerId, saleId: SaleId, new: true }, });
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

  rowClick(e: any) {
    let fila = e;
    if(fila.closed == 'No')
    {
      this.router.navigate(['/pointOfSale'], { queryParams: { customerId: this.customerId, saleId: fila.saleId, new: false }, });
    }
    else{ 
      this._coreService.openSnackBar('No se puede navegar a esta venta por que ya se cerró', 'done');
    }
  }

  component = {
    //ICONS
    icCustomer: icCategory,
    //LAYOUT SETTINGS
    menuOpen: false,
    initialSort: "Id",
    initialSortDir: "desc",
    getInputs,
  }
 
}

const getInputs: string = "";


