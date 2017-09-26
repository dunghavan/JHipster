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
var device_my_suffix_service_1 = require("./device-my-suffix.service");
var shared_1 = require("../../shared");
var DeviceMySuffixComponent = (function () {
    function DeviceMySuffixComponent(deviceService, alertService, eventManager, principal) {
        this.deviceService = deviceService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.principal = principal;
    }
    DeviceMySuffixComponent.prototype.loadAll = function () {
        var _this = this;
        this.deviceService.query().subscribe(function (res) {
            _this.devices = res.json;
        }, function (res) { return _this.onError(res.json); });
    };
    DeviceMySuffixComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInDevices();
    };
    DeviceMySuffixComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    DeviceMySuffixComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    DeviceMySuffixComponent.prototype.registerChangeInDevices = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('deviceListModification', function (response) { return _this.loadAll(); });
    };
    DeviceMySuffixComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return DeviceMySuffixComponent;
}());
DeviceMySuffixComponent = __decorate([
    core_1.Component({
        selector: 'jhi-device-my-suffix',
        templateUrl: './device-my-suffix.component.html'
    }),
    __metadata("design:paramtypes", [device_my_suffix_service_1.DeviceMySuffixService,
        ng_jhipster_1.JhiAlertService,
        ng_jhipster_1.JhiEventManager,
        shared_1.Principal])
], DeviceMySuffixComponent);
exports.DeviceMySuffixComponent = DeviceMySuffixComponent;
//# sourceMappingURL=device-my-suffix.component.js.map