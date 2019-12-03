import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UMPRoutingModule } from './ump-routing.module';
import { UMPComponent } from './ump.component';

@NgModule({
    imports: [CommonModule, UMPRoutingModule],
    declarations: [UMPComponent]
})
export class UMPModule {}
