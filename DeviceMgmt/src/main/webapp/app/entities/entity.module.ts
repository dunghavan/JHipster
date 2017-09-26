import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeviceMgmtModelMySuffixModule } from './model/model-my-suffix.module';
import { DeviceMgmtDeviceMySuffixModule } from './device/device-my-suffix.module';
import { DeviceMgmtFirstEntityMySuffixModule } from './first-entity/first-entity-my-suffix.module';
import { DeviceMgmtSecondEntityMySuffixModule } from './second-entity/second-entity-my-suffix.module';
import { DeviceMgmtHubModule } from './hub/hub.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DeviceMgmtModelMySuffixModule,
        DeviceMgmtDeviceMySuffixModule,
        DeviceMgmtFirstEntityMySuffixModule,
        DeviceMgmtSecondEntityMySuffixModule,
        DeviceMgmtHubModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceMgmtEntityModule {}
