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
var ModelMySuffixDeleteDialogComponent = (function () {
    function ModelMySuffixDeleteDialogComponent(modelService, activeModal, eventManager) {
        this.modelService = modelService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    ModelMySuffixDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ModelMySuffixDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.modelService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'modelListModification',
                content: 'Deleted an model'
            });
            _this.activeModal.dismiss(true);
        });
    };
    return ModelMySuffixDeleteDialogComponent;
}());
ModelMySuffixDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-model-my-suffix-delete-dialog',
        templateUrl: './model-my-suffix-delete-dialog.component.html'
    }),
    __metadata("design:paramtypes", [model_my_suffix_service_1.ModelMySuffixService,
        ng_bootstrap_1.NgbActiveModal,
        ng_jhipster_1.JhiEventManager])
], ModelMySuffixDeleteDialogComponent);
exports.ModelMySuffixDeleteDialogComponent = ModelMySuffixDeleteDialogComponent;
var ModelMySuffixDeletePopupComponent = (function () {
    function ModelMySuffixDeletePopupComponent(route, modelPopupService) {
        this.route = route;
        this.modelPopupService = modelPopupService;
    }
    ModelMySuffixDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.modelPopupService
                .open(ModelMySuffixDeleteDialogComponent, params['id']);
        });
    };
    ModelMySuffixDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ModelMySuffixDeletePopupComponent;
}());
ModelMySuffixDeletePopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-model-my-suffix-delete-popup',
        template: ''
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        model_my_suffix_popup_service_1.ModelMySuffixPopupService])
], ModelMySuffixDeletePopupComponent);
exports.ModelMySuffixDeletePopupComponent = ModelMySuffixDeletePopupComponent;
//# sourceMappingURL=model-my-suffix-delete-dialog.component.js.map