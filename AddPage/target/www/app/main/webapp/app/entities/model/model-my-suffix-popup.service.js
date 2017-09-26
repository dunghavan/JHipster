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
var model_my_suffix_model_1 = require("./model-my-suffix.model");
var model_my_suffix_service_1 = require("./model-my-suffix.service");
var ModelMySuffixPopupService = (function () {
    function ModelMySuffixPopupService(modalService, router, modelService) {
        this.modalService = modalService;
        this.router = router;
        this.modelService = modelService;
        this.isOpen = false;
    }
    ModelMySuffixPopupService.prototype.open = function (component, id) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (id) {
            this.modelService.find(id).subscribe(function (model) {
                _this.modelModalRef(component, model);
            });
        }
        else {
            return this.modelModalRef(component, new model_my_suffix_model_1.ModelMySuffix());
        }
    };
    ModelMySuffixPopupService.prototype.modelModalRef = function (component, model) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.model = model;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    ModelMySuffixPopupService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof ng_bootstrap_1.NgbModal !== "undefined" && ng_bootstrap_1.NgbModal) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object, model_my_suffix_service_1.ModelMySuffixService])
    ], ModelMySuffixPopupService);
    return ModelMySuffixPopupService;
    var _a, _b;
}());
exports.ModelMySuffixPopupService = ModelMySuffixPopupService;
//# sourceMappingURL=model-my-suffix-popup.service.js.map