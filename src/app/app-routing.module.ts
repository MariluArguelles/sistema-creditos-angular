import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CustomerListToSalesComponent } from './pages/sales/customer-list-to-sales/customer-list-to-sales.component';
import { CustomerListToSales2Component } from './pages/sales/customer-list-to-sales2/customer-list-to-sales2.component';
import { CustomerSalesManagerComponent } from './pages/sales/customer-sales-manager/customer-sales-manager.component';
import { PointOfSaleComponent } from './pages/sales/point-of-sale/point-of-sale.component';
import { PaymentsComponent } from './pages/payment/payments/payments.component';
import { AuthGuard } from '@shared/guards/auth.guard';

//toda página debe registrarse aquí
const childrenRoutes: VexRoutes = [
  {
    path: 'estadisticas',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'customerListToSales',
    component: CustomerListToSalesComponent
  },
  {
    path: 'customerListToSales2',
    component: CustomerListToSales2Component
  },
  {
    path: 'customerSalesManager',
    component: CustomerSalesManagerComponent
  },
  {
    path: 'pointOfSale',
    component: PointOfSaleComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

const routes: VexRoutes = [
  {
    path: '',
    //redirectTo: 'estadisticas', con esto no entra a login
    loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule),
    pathMatch: 'full'
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}