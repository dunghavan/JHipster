import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModelMySuffixComponent } from './model-my-suffix.component';
import { ModelMySuffixDetailComponent } from './model-my-suffix-detail.component';
import { ModelMySuffixPopupComponent } from './model-my-suffix-dialog.component';
import { ModelMySuffixDeletePopupComponent } from './model-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const modelRoute: Routes = [
    {
        path: 'model-my-suffix',
        component: ModelMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'model-my-suffix/:id',
        component: ModelMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelPopupRoute: Routes = [
    {
        path: 'model-my-suffix-new',
        component: ModelMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model-my-suffix/:id/edit',
        component: ModelMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model-my-suffix/:id/delete',
        component: ModelMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
