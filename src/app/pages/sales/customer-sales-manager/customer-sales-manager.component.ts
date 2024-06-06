import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumns } from '@shared/models/list-table-interface';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { Sales } from 'src/app/responses/sales/sales.interface';
import { SalesService } from 'src/app/services/sales.service';
import icCategory from "@iconify/icons-ic/twotone-category";
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'vex-customer-sales-manager',
  templateUrl: './customer-sales-manager.component.html',
  styleUrls: ['./customer-sales-manager.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms]
})
export class CustomerSalesManagerComponent implements OnInit {
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
    
  }

  rowClick(e: any) {
    let fila = e.row;
    
    if(fila.closed == 'No')
    {
      this.router.navigate(['/pointOfSale'], { queryParams: { customerId: this.customerId, saleId: fila.saleId, new: false }, });
    }
    else{ 
      this._coreService.openSnackBar('No se puede navegar a esta venta por que ya se cerró', 'done');
    }
    
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
  }

}

const tableColumns: TableColumns<Sales>[] = [
  // {
  //   label: "ID",
  //   cssLabel: ["font-bold", "text-sm"],
  //   property: "saleId",
  //   cssProperty: ["font-semibold", "text-sm", "text-left"],
  //   type: "text",
  //   sticky: true,
  //   sort: true,
  //   sortProperty: "saleId",
  //   visible: true,
  //   download: true
  // },
  {
    label: "TOTAL",
    cssLabel: ["font-bold", "text-sm"],
    property: "total",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "total",
    visible: true,
    download: true
  },
  {
    label: "SALDO",
    cssLabel: ["font-bold", "text-sm"],
    property: "balance",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "balance",
    visible: true,
    download: true
  },
  {
    label: "PAGADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "paid",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "paid",
    visible: true,
    download: true
  },
  {
    label: "VENTA GUARDADA",
    cssLabel: ["font-bold", "text-sm"],
    property: "closed",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "closed",
    visible: true,
    download: true
  },
  {
    label: "F. REGISTRO",
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

const getInputs: string = "";


