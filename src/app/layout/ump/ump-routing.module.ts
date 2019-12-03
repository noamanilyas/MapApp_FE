import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UMPComponent } from './ump.component';

const routes: Routes = [
    {
        path: '',
        component: UMPComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UMPRoutingModule {}
