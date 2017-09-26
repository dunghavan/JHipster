import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeviceMgmtSharedModule } from '../../shared';
import {
    SecondEntityMySuffixService,
    SecondEntityMySuffixPopupService,
    SecondEntityMySuffixComponent,
    SecondEntityMySuffixDetailComponent,
    SecondEntityMySuffixDialogComponent,
    SecondEntityMySuffixPopupComponent,
    SecondEntityMySuffixDeletePopupComponent,
    SecondEntityMySuffixDeleteDialogComponent,
    secondEntityRoute,
    secondEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...secondEntityRoute,
    ...secondEntityPopupRoute,
];

@NgModule({
    imports: [
        DeviceMgmtSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SecondEntityMySuffixComponent,
        SecondEntityMySuffixDetailComponent,
        SecondEntityMySuffixDialogComponent,
        SecondEntityMySuffixDeleteDialogComponent,
        SecondEntityMySuffixPopupComponent,
        SecondEntityMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SecondEntityMySuffixComponent,
        SecondEntityMySuffixDialogComponent,
        SecondEntityMySuffixPopupComponent,
        SecondEntityMySuffixDeleteDialogComponent,
        SecondEntityMySuffixDeletePopupComponent,
    ],
    providers: [
        SecondEntityMySuffixService,
        SecondEntityMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceMgmtSecondEntityMySuffixModule {}
