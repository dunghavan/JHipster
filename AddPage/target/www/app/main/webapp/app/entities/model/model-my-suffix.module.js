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
var ENTITY_STATES = _1.modelRoute.concat(_1.modelPopupRoute);
var DeviceMgmtModelMySuffixModule = (function () {
    function DeviceMgmtModelMySuffixModule() {
    }
    DeviceMgmtModelMySuffixModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_1.DeviceMgmtSharedModule,
                router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
            ],
            declarations: [
                _1.ModelMySuffixComponent,
                _1.ModelMySuffixDetailComponent,
                _1.ModelMySuffixDialogComponent,
                _1.ModelMySuffixDeleteDialogComponent,
                _1.ModelMySuffixPopupComponent,
                _1.ModelMySuffixDeletePopupComponent,
            ],
            entryComponents: [
                _1.ModelMySuffixComponent,
                _1.ModelMySuffixDialogComponent,
                _1.ModelMySuffixPopupComponent,
                _1.ModelMySuffixDeleteDialogComponent,
                _1.ModelMySuffixDeletePopupComponent,
            ],
            providers: [
                _1.ModelMySuffixService,
                _1.ModelMySuffixPopupService,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], DeviceMgmtModelMySuffixModule);
    return DeviceMgmtModelMySuffixModule;
}());
exports.DeviceMgmtModelMySuffixModule = DeviceMgmtModelMySuffixModule;
//# sourceMappingURL=model-my-suffix.module.js.map