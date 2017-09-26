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
var model_my_suffix_popup_service_1 = require("./model-my-suffix-popup.service");
var model_my_suffix_service_1 = require("./model-my-suffix.service");
var ModelMySuffixDialogComponent = (function () {
    function ModelMySuffixDialogComponent(activeModal, alertService, modelService, eventManager) {
        this.activeModal = activeModal;
        this.alertService = alertService;
        this.modelService = modelService;
        this.eventManager = eventManager;
    }
    ModelMySuffixDialogComponent.prototype.ngOnInit = function () {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    };
    ModelMySuffixDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ModelMySuffixDialogComponent.prototype.save = function () {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            this.subscribeToSaveResponse(this.modelService.update(this.model));
        }
        else {
            this.subscribeToSaveResponse(this.modelService.create(this.model));
        }
    };
    ModelMySuffixDialogComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res);
        }, function (res) { return _this.onSaveError(res); });
    };
    ModelMySuffixDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'modelListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    ModelMySuffixDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    ModelMySuffixDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return ModelMySuffixDialogComponent;
}());
ModelMySuffixDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-model-my-suffix-dialog',
        templateUrl: './model-my-suffix-dialog.component.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal,
        ng_jhipster_1.JhiAlertService,
        model_my_suffix_service_1.ModelMySuffixService,
        ng_jhipster_1.JhiEventManager])
], ModelMySuffixDialogComponent);
exports.ModelMySuffixDialogComponent = ModelMySuffixDialogComponent;
var ModelMySuffixPopupComponent = (function () {
    function ModelMySuffixPopupComponent(route, modelPopupService) {
        this.route = route;
        this.modelPopupService = modelPopupService;
    }
    ModelMySuffixPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.modelPopupService
                    .open(ModelMySuffixDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.modelPopupService
                    .open(ModelMySuffixDialogComponent);
            }
        });
    };
    ModelMySuffixPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ModelMySuffixPopupComponent;
}());
ModelMySuffixPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-model-my-suffix-popup',
        template: ''
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        model_my_suffix_popup_service_1.ModelMySuffixPopupService])
], ModelMySuffixPopupComponent);
exports.ModelMySuffixPopupComponent = ModelMySuffixPopupComponent;
//# sourceMappingURL=model-my-suffix-dialog.component.js.map