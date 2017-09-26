"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var model_my_suffix_component_1 = require("./model-my-suffix.component");
var model_my_suffix_detail_component_1 = require("./model-my-suffix-detail.component");
var model_my_suffix_dialog_component_1 = require("./model-my-suffix-dialog.component");
var model_my_suffix_delete_dialog_component_1 = require("./model-my-suffix-delete-dialog.component");
exports.modelRoute = [
    {
        path: 'model-my-suffix',
        component: model_my_suffix_component_1.ModelMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'model-my-suffix/:id',
        component: model_my_suffix_detail_component_1.ModelMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.modelPopupRoute = [
    {
        path: 'model-my-suffix-new',
        component: model_my_suffix_dialog_component_1.ModelMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model-my-suffix/:id/edit',
        component: model_my_suffix_dialog_component_1.ModelMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model-my-suffix/:id/delete',
        component: model_my_suffix_delete_dialog_component_1.ModelMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deviceMgmtApp.model.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
//# sourceMappingURL=model-my-suffix.route.js.map