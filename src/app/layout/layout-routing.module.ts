import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { AuthGuard } from '../shared';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'structure', pathMatch: 'prefix' },
            // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            // { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            // { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            // { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            // { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            // { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'structure', loadChildren: () => import('./structure/structure.module').then(m => m.StructuresModule) },
            { path: 'houses', loadChildren: () => import('./houses/houses.module').then(m => m.HousesModule) },
            { path: 'ump', loadChildren: () => import('./ump/ump.module').then(m => m.UMPModule), canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
