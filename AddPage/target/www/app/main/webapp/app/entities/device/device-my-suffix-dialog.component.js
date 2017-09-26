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
var model_1 = require("../model");
var DeviceMySuffixDialogComponent = (function () {
    function DeviceMySuffixDialogComponent(activeModal, alertService, deviceService, modelService, eventManager) {
        this.activeModal = activeModal;
        this.alertService = alertService;
        this.deviceService = deviceService;
        this.modelService = modelService;
        this.eventManager = eventManager;
    }
    DeviceMySuffixDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.modelService.query()
            .subscribe(function (res) { _this.models = res.json; }, function (res) { return _this.onError(res.json); });
    };
    DeviceMySuffixDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    DeviceMySuffixDialogComponent.prototype.save = function () {
        this.isSaving = true;
        if (this.device.id !== undefined) {
            this.subscribeToSaveResponse(this.deviceService.update(this.device));
        }
        else {
            this.subscribeToSaveResponse(this.deviceService.create(this.device));
        }
    };
    DeviceMySuffixDialogComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res);
        }, function (res) { return _this.onSaveError(res); });
    };
    DeviceMySuffixDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'deviceListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    DeviceMySuffixDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    DeviceMySuffixDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    DeviceMySuffixDialogComponent.prototype.trackModelById = function (index, item) {
        return item.id;
    };
    DeviceMySuffixDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-device-my-suffix-dialog',
            templateUrl: './device-my-suffix-dialog.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ng_bootstrap_1.NgbActiveModal !== "undefined" && ng_bootstrap_1.NgbActiveModal) === "function" && _a || Object, typeof (_b = typeof ng_jhipster_1.JhiAlertService !== "undefined" && ng_jhipster_1.JhiAlertService) === "function" && _b || Object, device_my_suffix_service_1.DeviceMySuffixService,
            model_1.ModelMySuffixService, typeof (_c = typeof ng_jhipster_1.JhiEventManager !== "undefined" && ng_jhipster_1.JhiEventManager) === "function" && _c || Object])
    ], DeviceMySuffixDialogComponent);
    return DeviceMySuffixDialogComponent;
    var _a, _b, _c;
}());
exports.DeviceMySuffixDialogComponent = DeviceMySuffixDialogComponent;
var DeviceMySuffixPopupComponent = (function () {
    function DeviceMySuffixPopupComponent(route, devicePopupService) {
        this.route = route;
        this.devicePopupService = devicePopupService;
    }
    DeviceMySuffixPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.devicePopupService
                    .open(DeviceMySuffixDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.devicePopupService
                    .open(DeviceMySuffixDialogComponent);
            }
        });
    };
    DeviceMySuffixPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    DeviceMySuffixPopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-device-my-suffix-popup',
            template: ''
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, device_my_suffix_popup_service_1.DeviceMySuffixPopupService])
    ], DeviceMySuffixPopupComponent);
    return DeviceMySuffixPopupComponent;
    var _a;
}());
exports.DeviceMySuffixPopupComponent = DeviceMySuffixPopupComponent;
//# sourceMappingURL=device-my-suffix-dialog.component.js.map