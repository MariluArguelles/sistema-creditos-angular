import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';

import icDashboard from '@iconify/icons-ic/twotone-dashboard';
import { ActivatedRoute, Routes } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import icCategory from '@iconify/icons-ic/twotone-category';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private route: ActivatedRoute,
    private navigationService: NavigationService) {
    Settings.defaultLocale = this.localeId;
    
    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.configService.updateConfig({
      sidenav: {
        title: "POS",
        imageUrl: "/assets/img/demo/logo.svg",
        showCollapsePin: true,
      },
    });

    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));

    //elementos del sidenav o menu flotante 
    //todas sus route deben estar registradas en el angular router ---> app-routing.module.ts
    //TMB modificar para que mande parámetros en la query string
    // sidenav.component.html
    // [queryParams]="item.params" 
    this.navigationService.items = [
      {
        type: 'link',
        label: 'Estadísticas',
        route: 'estadisticas',
        icon: icDashboard
      },
      {
        type: 'link',
        label: 'Categorías',
        route: 'categorias',
        icon: icCategory
      },
      {
        type: 'link',
        label: 'Usuarios',
        route: 'usuarios',
        icon: icCategory
      },
      {
        type: 'link',
        label: 'Clientes',
        route: 'clientes',
        icon: icCategory
      },
      {
        type: 'link',
        label: 'Productos',
        route: 'productos',
        icon: icCategory
      },
      {
        type: 'link',
        label: 'Punto de venta',
        params: { Page: 'Sales' },
        route: 'customerListToSales2',
        icon: icCategory
      },
    /*  {
        type: 'link',
        label: 'Lista de clientes',
        params: { Page: 'Sales' },
        route: 'customerListToSales2',
        icon: icCategory
      },*/
      {
        type: 'link',
        label: 'Pagos',
        params: { Page: 'Payments' },
        route: 'customerListToSales2',
        icon: icCategory
      }

    ];


  }
}