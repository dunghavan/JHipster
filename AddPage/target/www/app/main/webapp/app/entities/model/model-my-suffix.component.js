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
var ng_jhipster_1 = require("ng-jhipster");
var model_my_suffix_service_1 = require("./model-my-suffix.service");
var shared_1 = require("../../shared");
var ModelMySuffixComponent = (function () {
    function ModelMySuffixComponent(modelService, alertService, eventManager, principal) {
        this.modelService = modelService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.principal = principal;
    }
    ModelMySuffixComponent.prototype.loadAll = function () {
        var _this = this;
        this.modelService.query().subscribe(function (res) {
            _this.models = res.json;
        }, function (res) { return _this.onError(res.json); });
    };
    ModelMySuffixComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInModels();
    };
    ModelMySuffixComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    ModelMySuffixComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    ModelMySuffixComponent.prototype.registerChangeInModels = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('modelListModification', function (response) { return _this.loadAll(); });
    };
    ModelMySuffixComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    ModelMySuffixComponent = __decorate([
        core_1.Component({
            selector: 'jhi-model-my-suffix',
            templateUrl: './model-my-suffix.component.html'
        }),
        __metadata("design:paramtypes", [model_my_suffix_service_1.ModelMySuffixService, typeof (_a = typeof ng_jhipster_1.JhiAlertService !== "undefined" && ng_jhipster_1.JhiAlertService) === "function" && _a || Object, typeof (_b = typeof ng_jhipster_1.JhiEventManager !== "undefined" && ng_jhipster_1.JhiEventManager) === "function" && _b || Object, shared_1.Principal])
    ], ModelMySuffixComponent);
    return ModelMySuffixComponent;
    var _a, _b;
}());
exports.ModelMySuffixComponent = ModelMySuffixComponent;
//# sourceMappingURL=model-my-suffix.component.js.map