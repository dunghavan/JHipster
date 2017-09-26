"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_1 = require("../../shared");
var _1 = require("./");
var ENTITY_STATES = _1.deviceRoute.concat(_1.devicePopupRoute);
var DeviceMgmtDeviceMySuffixModule = (function () {
    function DeviceMgmtDeviceMySuffixModule() {
    }
    return DeviceMgmtDeviceMySuffixModule;
}());
DeviceMgmtDeviceMySuffixModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_1.DeviceMgmtSharedModule,
            router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        ],
        declarations: [
            _1.DeviceMySuffixComponent,
            _1.DeviceMySuffixDetailComponent,
            _1.DeviceMySuffixDialogComponent,
            _1.DeviceMySuffixDeleteDialogComponent,
            _1.DeviceMySuffixPopupComponent,
            _1.DeviceMySuffixDeletePopupComponent,
        ],
        entryComponents: [
            _1.DeviceMySuffixComponent,
            _1.DeviceMySuffixDialogComponent,
            _1.DeviceMySuffixPopupComponent,
            _1.DeviceMySuffixDeleteDialogComponent,
            _1.DeviceMySuffixDeletePopupComponent,
        ],
        providers: [
            _1.DeviceMySuffixService,
            _1.DeviceMySuffixPopupService,
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DeviceMgmtDeviceMySuffixModule);
exports.DeviceMgmtDeviceMySuffixModule = DeviceMgmtDeviceMySuffixModule;
//# sourceMappingURL=device-my-suffix.module.js.map