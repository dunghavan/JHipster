import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DeviceMySuffixComponent } from './device-my-suffix.component';
import { DeviceMySuffixDetailComponent } from './device-my-suffix-detail.component';
import { DeviceMySuffixPopupComponent } from './device-my-suffix-dialog.component';
import { DeviceMySuffixDeletePopupComponent } from './device-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const deviceRoute: Routes = [
    {
        path: 'device-my-suffix',
        component: DeviceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'device-my-suffix/:id',
        component: DeviceMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const devicePopupRoute: Routes = [
    {
        path: 'device-my-suffix-new',
        component: DeviceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'device-my-suffix/:id/edit',
        component: DeviceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'device-my-suffix/:id/delete',
        component: DeviceMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
