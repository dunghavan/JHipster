"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var device_my_suffix_component_1 = require("./device-my-suffix.component");
var device_my_suffix_detail_component_1 = require("./device-my-suffix-detail.component");
var device_my_suffix_dialog_component_1 = require("./device-my-suffix-dialog.component");
var device_my_suffix_delete_dialog_component_1 = require("./device-my-suffix-delete-dialog.component");
exports.deviceRoute = [
    {
        path: 'device-my-suffix',
        component: device_my_suffix_component_1.DeviceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'device-my-suffix/:id',
        component: device_my_suffix_detail_component_1.DeviceMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.devicePopupRoute = [
    {
        path: 'device-my-suffix-new',
        component: device_my_suffix_dialog_component_1.DeviceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'device-my-suffix/:id/edit',
        component: device_my_suffix_dialog_component_1.DeviceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'device-my-suffix/:id/delete',
        component: device_my_suffix_delete_dialog_component_1.DeviceMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.device.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
//# sourceMappingURL=device-my-suffix.route.js.map