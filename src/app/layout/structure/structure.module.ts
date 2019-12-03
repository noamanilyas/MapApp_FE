import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructuresRoutingModule } from './structure-routing.module';
import { StructuresComponent } from './structure.component';

@NgModule({
    imports: [CommonModule, StructuresRoutingModule],
    declarations: [StructuresComponent]
})
export class StructuresModule {}
