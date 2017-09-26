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
var ng_jhipster_1 = require("ng-jhipster");
var model_my_suffix_service_1 = require("./model-my-suffix.service");
var ModelMySuffixDetailComponent = (function () {
    function ModelMySuffixDetailComponent(eventManager, modelService, route) {
        this.eventManager = eventManager;
        this.modelService = modelService;
        this.route = route;
    }
    ModelMySuffixDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInModels();
    };
    ModelMySuffixDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.modelService.find(id).subscribe(function (model) {
            _this.model = model;
        });
    };
    ModelMySuffixDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    ModelMySuffixDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    ModelMySuffixDetailComponent.prototype.registerChangeInModels = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('modelListModification', function (response) { return _this.load(_this.model.id); });
    };
    return ModelMySuffixDetailComponent;
}());
ModelMySuffixDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-model-my-suffix-detail',
        templateUrl: './model-my-suffix-detail.component.html'
    }),
    __metadata("design:paramtypes", [ng_jhipster_1.JhiEventManager,
        model_my_suffix_service_1.ModelMySuffixService,
        router_1.ActivatedRoute])
], ModelMySuffixDetailComponent);
exports.ModelMySuffixDetailComponent = ModelMySuffixDetailComponent;
//# sourceMappingURL=model-my-suffix-detail.component.js.map