import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeviceMgmtSharedModule } from '../../shared';
import {
    HubService,
    HubPopupService,
    HubComponent,
    HubDetailComponent,
    HubDialogComponent,
    HubPopupComponent,
    HubDeletePopupComponent,
    HubDeleteDialogComponent,
    hubRoute,
    hubPopupRoute,
} from './';

const ENTITY_STATES = [
    ...hubRoute,
    ...hubPopupRoute,
];

@NgModule({
    imports: [
        DeviceMgmtSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HubComponent,
        HubDetailComponent,
        HubDialogComponent,
        HubDeleteDialogComponent,
        HubPopupComponent,
        HubDeletePopupComponent,
    ],
    entryComponents: [
        HubComponent,
        HubDialogComponent,
        HubPopupComponent,
        HubDeleteDialogComponent,
        HubDeletePopupComponent,
    ],
    providers: [
        HubService,
        HubPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceMgmtHubModule {}
