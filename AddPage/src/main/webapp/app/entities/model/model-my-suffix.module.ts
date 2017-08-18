import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeviceMgmtSharedModule } from '../../shared';
import {
    ModelMySuffixService,
    ModelMySuffixPopupService,
    ModelMySuffixComponent,
    ModelMySuffixDetailComponent,
    ModelMySuffixDialogComponent,
    ModelMySuffixPopupComponent,
    ModelMySuffixDeletePopupComponent,
    ModelMySuffixDeleteDialogComponent,
    modelRoute,
    modelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...modelRoute,
    ...modelPopupRoute,
];

@NgModule({
    imports: [
        DeviceMgmtSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModelMySuffixComponent,
        ModelMySuffixDetailComponent,
        ModelMySuffixDialogComponent,
        ModelMySuffixDeleteDialogComponent,
        ModelMySuffixPopupComponent,
        ModelMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ModelMySuffixComponent,
        ModelMySuffixDialogComponent,
        ModelMySuffixPopupComponent,
        ModelMySuffixDeleteDialogComponent,
        ModelMySuffixDeletePopupComponent,
    ],
    providers: [
        ModelMySuffixService,
        ModelMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeviceMgmtModelMySuffixModule {}
