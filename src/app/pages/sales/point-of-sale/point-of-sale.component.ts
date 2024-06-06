import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { CustomerResponse } from 'src/app/responses/customer/customer.response';
import { SaleItems, SaleResponse, Sales } from 'src/app/responses/sales/sales.interface';
import { ProductPosService } from 'src/app/services/products.pos.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FiltersBox } from '@shared/models/search-options.interface';
import { PointOfSaleService } from 'src/app/services/PointOfSaleService.service';
import { componentSettings, componentSettings2 } from './point-of-sale-config';
import { SaleItemRequest } from 'src/app/requests/sale/sale.request';
import { CustomerService } from 'src/app/services/customer.service';
import { SalesService } from 'src/app/services/sales.service';
import { SaleRequest } from '../../../responses/sales/sales.interface';
import { PaymentService } from 'src/app/services/payment.service';
import { CoreService } from 'src/app/services/core.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'vex-pointofsale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss'],
  animations: [
    stagger40ms, scaleIn400ms, fadeInRight400ms
  ]
})

export class PointOfSaleComponent implements OnInit {

  @ViewChild('hiddenNew', { static: true }) hiddenNew!: ElementRef;
  @ViewChild('hiddenClosed', { static: true }) hiddenClosed!: ElementRef;

  customerId = 0;
  saleId: number = 0;
  //total: number = 0;
  products!: SaleItems[];
  title = 'POS';
  cliente = '';
  new: boolean = false;
  closed: boolean = false;
  fecha: string;
  datos!: CustomerResponse;
  quantity$ = this.shoppingCartSvc.quantityAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  component
  component2

  //#region Datos de la Tabla Lista de Clientes
  //quitando la columa customerId no se 
  displayedColumns: string[] = ['productId', 'description', 'brand', 'salesCost'];
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
  //#endregion

  constructor(
    customTitle: CustomTitleService,
    public _customerService: CustomerService,
    public _productService: ProductPosService,
    public _saleService: SalesService,
    private _paymentService: PaymentService,
    public _saleItemService: PointOfSaleService,
    private shoppingCartSvc: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router,
    private _coreService: CoreService
  ) {
    customTitle.set('POS');

    this.route.queryParams
      .subscribe(params => {
        this.saleId = params['saleId'];
        this.new = params['new'].toString() === 'true';
      });
  }
//#region Datos de la Tabla Lista de Clientes
  ngOnInit(): void {
    /*código lista clientes*/
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /*código lista clientes*/

    this.component = componentSettings
    this.component2 = componentSettings2
    this.getSaleItemsList();
    this.getSaleData();
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
          return this._productService.GetAll(
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
  //#endregion

  getSaleData(): void {
    this._saleService.SaleById(this.saleId).subscribe(
      (resp: SaleResponse) => {
        console.log('valores de venta ' + JSON.stringify(resp));
        this.fecha = resp.auditCreateDate;
        this.new = !resp.closed;
        this.closed = resp.closed;
        this.customerId = resp.customerId;
        this.hiddenClosed.nativeElement.value = resp.closed;
        this.getCustomerData();
      })
  }

  getCustomerData(): void {
    this._customerService.CustomerById(this.customerId).subscribe(
      (resp: CustomerResponse) => {
        this.cliente = resp.name + ' ' + resp.lastName1;
      });
  }

  search(data: FiltersBox) {
    this.paginator.pageIndex=0;
    
    this.component.filters.refresh;
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()
  

  /*  this.component.filters.numFilter = 1
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()*/
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

  /*formatGetInputs() {
    let str = "";
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }
    if (this.component.filters.startDate != "" &&
      this.component.endDate != "") { //filtrar por fechas
      str += `&starDate=${this.component.filters.starDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }
    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
    this.component.getInputs = str;
    
  }*/


  displayedColumns2: string[] = ['id', 'Quantity', 'ProductDescription', 'Price', 'Subtotal'];
  dataSource2!: SaleItems[];

  getSaleItemsList() {
    this._saleItemService.getSaleItems(this.saleId).subscribe({
      next: (res: SaleItems[]) => {
        this.dataSource2 = res;
        const total = this.dataSource2.reduce((acc, prod) => acc += (prod.price * prod.quantity), 0);
        this.shoppingCartSvc.totalSubject.next(total);
        const quantity = this.dataSource2.reduce((acc, prod) => acc += prod.quantity, 0);
        this.shoppingCartSvc.quantitySubject.next(quantity);
      },
      error: console.log
    })
  }

  confirmarGuardarSalir(): void {
    if (window.confirm('¿Estás seguro de que quieres guardar y salir?')) {
      this.onGuardarSalir();
    } else {
      this._coreService.openSnackBar('La venta No se ha guardado', 'done');
    }
  }


  onGuardarSalir() {
    

    let total: number = 0;
    
    const subscription = this.total$.subscribe((n) => { return total = n; });
    console.log(total);

    if (total === 0) {
      alert('Seleccione artículos antes de guardar');
      return;
    }
    else {
      let total: number = 0;
      this.hiddenClosed.nativeElement.value = 'true'
      const subscription = this.total$.subscribe((n) => { return total = n; });
      subscription.unsubscribe();

      let sale: Sales =
      {
        customerId: this.customerId,
        saleId: this.saleId,
        subTotal: total,
        total: total,
        balance: total,
        closed: true,
        paid: false,
        state: 1
      }

      const observable = this._saleService.updatePreSale(sale).subscribe(() => { observable.unsubscribe(); });
      this._coreService.openSnackBar('La venta se ha guardado correctamente', 'done');

      setTimeout(() => {
        this.router.navigate(['/payments'],
          { queryParams: { customerId: this.customerId } },);
      }, 3000);
    }
  }




  rowClick(e: any) {
    
    let product=e;
    console.log(e);
    
    let total: number = 0;
    const subscription = this.total$.subscribe((n) => { return total = n; });
    subscription.unsubscribe();

    let newTotal:number = 0
    newTotal= total + Number(product.salesCost);
    //console.log('**total** '+total);
    //console.log('**costo de venta** '+Number(product.salesCost));
    console.log('**newTotal** '+newTotal);

    this.closed = this.hiddenClosed.nativeElement.value === 'true';

    if (this.closed === true) {
      alert('No se pueden agregar más productos por que la venta ya fué cerrada');
    }
    else if(newTotal>500000) //<- límite de crédito
      {
        alert('Se ha rebasado el límite de crédito');
      }
      else {
      let saleItem: SaleItemRequest = {
        SaleId: this.saleId,
        Quantity: 1,
        ProductId: product.productId,
        Price: product.salesCost,
        state: 1
      }

      this._saleItemService.SaleItemRegister(saleItem).subscribe((resp) => {

        if (resp.isSuccess) {
          total = total + parseFloat(product.salesCost);
          let pre: Sales =
          {
            customerId: this.customerId,
            saleId: this.saleId,
            //registerDate: p.registerDate,
            subTotal: total,
            total: total,
            balance: total,
            closed: this.closed,
            paid: false,
            state: 1
          }

          const observable = this._saleService.updatePreSale(pre).subscribe(() => { observable.unsubscribe(); });

          this.getSaleItemsList();
          

          //this._alert.succes('Excelente', resp.message)//; 
        } else {
          //this._alert.warn('Atención', resp.message);
          alert(resp.message);
        }
      })
    }
  }

}






