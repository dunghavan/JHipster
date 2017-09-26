import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HubComponent } from './hub.component';
import { HubDetailComponent } from './hub-detail.component';
import { HubPopupComponent } from './hub-dialog.component';
import { HubDeletePopupComponent } from './hub-delete-dialog.component';

export const hubRoute: Routes = [
    {
        path: 'hub',
        component: HubComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.hub.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hub/:id',
        component: HubDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.hub.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hubPopupRoute: Routes = [
    {
        path: 'hub-new',
        component: HubPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.hub.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hub/:id/edit',
        component: HubPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.hub.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hub/:id/delete',
        component: HubDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.hub.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
