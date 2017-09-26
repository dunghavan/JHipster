import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeviceMgmtSharedModule } from '../../shared';
import {
    FirstEntityMySuffixService,
    FirstEntityMySuffixPopupService,
    FirstEntityMySuffixComponent,
    FirstEntityMySuffixDetailComponent,
    FirstEntityMySuffixDialogComponent,
    FirstEntityMySuffixPopupComponent,
    FirstEntityMySuffixDeletePopupComponent,
    FirstEntityMySuffixDeleteDialogComponent,
    firstEntityRoute,
    firstEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...firstEntityRoute,
    ...firstEntityPopupRoute,
];

@NgModule({
    imports: [
        DeviceMgmtSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FirstEntityMySuffixComponent,
        FirstEntityMySuffixDetailComponent,
        FirstEntityMySuffixDialogComponent,
        FirstEntityMySuffixDeleteDialogComponent,
        FirstEntityMySuffixPopupComponent,
        FirstEntityMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FirstEntityMySuffixComponent,
        FirstEntityMySuffixDialogComponent,
        FirstEntityMySuffixPopupComponent,
        FirstEntityMySuffixDeleteDialogComponent,
        FirstEntityMySuffixDeletePopupComponent,
    ],
    providers: [
        FirstEntityMySuffixService,
        FirstEntityMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceMgmtFirstEntityMySuffixModule {}
