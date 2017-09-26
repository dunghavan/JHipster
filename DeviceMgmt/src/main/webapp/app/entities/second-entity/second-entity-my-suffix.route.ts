import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SecondEntityMySuffixComponent } from './second-entity-my-suffix.component';
import { SecondEntityMySuffixDetailComponent } from './second-entity-my-suffix-detail.component';
import { SecondEntityMySuffixPopupComponent } from './second-entity-my-suffix-dialog.component';
import { SecondEntityMySuffixDeletePopupComponent } from './second-entity-my-suffix-delete-dialog.component';

export const secondEntityRoute: Routes = [
    {
        path: 'second-entity-my-suffix',
        component: SecondEntityMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.secondEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'second-entity-my-suffix/:id',
        component: SecondEntityMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.secondEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const secondEntityPopupRoute: Routes = [
    {
        path: 'second-entity-my-suffix-new',
        component: SecondEntityMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.secondEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'second-entity-my-suffix/:id/edit',
        component: SecondEntityMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.secondEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'second-entity-my-suffix/:id/delete',
        component: SecondEntityMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.secondEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
