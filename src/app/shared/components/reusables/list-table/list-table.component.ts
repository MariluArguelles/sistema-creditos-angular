import { AfterViewInit, Component, Input, OnChanges, OnInit, EventEmitter, Output, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getEsPaginatorIntl } from '@shared/paginator-intl/es-paginator-intl';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { DefaultService } from '@shared/services/default.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '@shared/services/alert.service';
import { startWith, switchMap } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { TableColumns, TableFooter } from '@shared/models/list-table-interface';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule, MatTableModule, MatSortModule, MatTooltipModule, MatIconModule, IconModule, MatPaginatorModule],
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  providers: [{
    provide: MatPaginatorIntl, //para la traducción de la tabla
    useValue: getEsPaginatorIntl()
  }, {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appareance: "standard" } as MatFormFieldDefaultOptions
  }
  ]
})

export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {

  @Input() service?: DefaultService
  @Input() columns?: TableColumns<T>[];
  @Input() getInputs: any
  @Input() sortBy?: string //ordenamiento por un campo por defecto
  @Input() sortDir: string = "asc" //ordenamiento ascendente o descendente
  @Input() footer: TableFooter<T>[] = [] //Footer que esta en la interfaz

  //@Input() para recibir datos de un componente
  //@Output() para enviar datos fuera de un componente
  //@ViewChild Es un decorador que configura una consulta de vista, cuando se detecta un cambio la propiedad se actualiza ...
  @Output() rowClick = new EventEmitter<T>()
  @ViewChild(MatPaginator) paginator?: MatPaginator //
  @ViewChild(MatSort) sort?: MatSort

  changesGetInputs = new EventEmitter<T>()
  //para hacer el filtrado ordenamiento y paginación de datos :
  dataSource = new MatTableDataSource<T>()
  visibleColumns?: Array<keyof T | string> //columnas visibles de la Tabla
  visibleFooter?: Array<keyof T | string | object>
  paginatorOptions = {
    pageSizeOptions: [10, 20, 50],
    pageSize: 10, //registros por página
    pageLength: 0,
  }

  constructor(
    private _spinner: NgxSpinnerService,
    private _alert: AlertService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.setVisibleColumns()
    }
    if (changes.getInputs && this.paginator) {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    }
  }

  setVisibleColumns() {
    this.visibleColumns = this.columns
      .filter((columns: any) => columns.visible)
      .map((columns): any => columns.property);
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
          this._spinner.show("modal-table");
          return this.service.GetAll(
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.getInputs
          );
        })
      )
      .subscribe((data: any) => {
        this.setData(data);
        this._spinner.hide("modal-table")
      });
  }

  setData(data: any) {
    if (data.isSuccess) {
      this.setVisibleColumns()
      this.paginatorOptions.pageLength = data.data.totalRecords
      this.dataSource.data = data.data.items
      if (data.data.footer) this.setFooter(data.data.footer);
    } else {
      this._alert.warn("Atención", "Ha ocurrido un error al cargar los datos");
    }
  }

  setFooter(data: any) {
    this.visibleFooter = []
    if (this.footer.length && data) {
      this.footer.forEach((e) => {
        this.visibleFooter.push({
          label: e.label,
          value: [e.property],
          tooltip: e.tooltip
        })
      })
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

}
