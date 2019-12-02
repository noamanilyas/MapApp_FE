import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousesRoutingModule } from './houses-routing.module';
import { HousesComponent } from './houses.component';

@NgModule({
    imports: [CommonModule, HousesRoutingModule],
    declarations: [HousesComponent]
})
export class HousesModule {}
