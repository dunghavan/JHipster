import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FirstEntityMySuffixComponent } from './first-entity-my-suffix.component';
import { FirstEntityMySuffixDetailComponent } from './first-entity-my-suffix-detail.component';
import { FirstEntityMySuffixPopupComponent } from './first-entity-my-suffix-dialog.component';
import { FirstEntityMySuffixDeletePopupComponent } from './first-entity-my-suffix-delete-dialog.component';

export const firstEntityRoute: Routes = [
    {
        path: 'first-entity-my-suffix',
        component: FirstEntityMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.firstEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'first-entity-my-suffix/:id',
        component: FirstEntityMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.firstEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const firstEntityPopupRoute: Routes = [
    {
        path: 'first-entity-my-suffix-new',
        component: FirstEntityMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.firstEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'first-entity-my-suffix/:id/edit',
        component: FirstEntityMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.firstEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'first-entity-my-suffix/:id/delete',
        component: FirstEntityMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.firstEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
