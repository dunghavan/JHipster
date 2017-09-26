"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng_jhipster_1 = require("ng-jhipster");
var device_my_suffix_popup_service_1 = require("./device-my-suffix-popup.service");
var device_my_suffix_service_1 = require("./device-my-suffix.service");
var DeviceMySuffixDeleteDialogComponent = (function () {
    function DeviceMySuffixDeleteDialogComponent(deviceService, activeModal, eventManager) {
        this.deviceService = deviceService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    DeviceMySuffixDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    DeviceMySuffixDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.deviceService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'deviceListModification',
                content: 'Deleted an device'
            });
            _this.activeModal.dismiss(true);
        });
    };
    DeviceMySuffixDeleteDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-device-my-suffix-delete-dialog',
            templateUrl: './device-my-suffix-delete-dialog.component.html'
        }),
        __metadata("design:paramtypes", [device_my_suffix_service_1.DeviceMySuffixService, typeof (_a = typeof ng_bootstrap_1.NgbActiveModal !== "undefined" && ng_bootstrap_1.NgbActiveModal) === "function" && _a || Object, typeof (_b = typeof ng_jhipster_1.JhiEventManager !== "undefined" && ng_jhipster_1.JhiEventManager) === "function" && _b || Object])
    ], DeviceMySuffixDeleteDialogComponent);
    return DeviceMySuffixDeleteDialogComponent;
    var _a, _b;
}());
exports.DeviceMySuffixDeleteDialogComponent = DeviceMySuffixDeleteDialogComponent;
var DeviceMySuffixDeletePopupComponent = (function () {
    function DeviceMySuffixDeletePopupComponent(route, devicePopupService) {
        this.route = route;
        this.devicePopupService = devicePopupService;
    }
    DeviceMySuffixDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.devicePopupService
                .open(DeviceMySuffixDeleteDialogComponent, params['id']);
        });
    };
    DeviceMySuffixDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    DeviceMySuffixDeletePopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-device-my-suffix-delete-popup',
            template: ''
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, device_my_suffix_popup_service_1.DeviceMySuffixPopupService])
    ], DeviceMySuffixDeletePopupComponent);
    return DeviceMySuffixDeletePopupComponent;
    var _a;
}());
exports.DeviceMySuffixDeletePopupComponent = DeviceMySuffixDeletePopupComponent;
//# sourceMappingURL=device-my-suffix-delete-dialog.component.js.map