import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeviceMgmtModelMySuffixModule } from './model/model-my-suffix.module';
import { DeviceMgmtDeviceMySuffixModule } from './device/device-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DeviceMgmtModelMySuffixModule,
        DeviceMgmtDeviceMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceMgmtEntityModule {}
