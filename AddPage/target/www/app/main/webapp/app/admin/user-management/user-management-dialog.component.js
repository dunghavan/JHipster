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
var user_modal_service_1 = require("./user-modal.service");
var shared_1 = require("../../shared");
var UserMgmtDialogComponent = (function () {
    function UserMgmtDialogComponent(activeModal, languageHelper, userService, eventManager) {
        this.activeModal = activeModal;
        this.languageHelper = languageHelper;
        this.userService = userService;
        this.eventManager = eventManager;
    }
    UserMgmtDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe(function (authorities) {
            _this.authorities = authorities;
        });
        this.languageHelper.getAll().then(function (languages) {
            _this.languages = languages;
        });
    };
    UserMgmtDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    UserMgmtDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(function (response) { return _this.onSaveSuccess(response); }, function () { return _this.onSaveError(); });
        }
        else {
            this.userService.create(this.user).subscribe(function (response) { return _this.onSaveSuccess(response); }, function () { return _this.onSaveError(); });
        }
    };
    UserMgmtDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    UserMgmtDialogComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    UserMgmtDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-user-mgmt-dialog',
            templateUrl: './user-management-dialog.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ng_bootstrap_1.NgbActiveModal !== "undefined" && ng_bootstrap_1.NgbActiveModal) === "function" && _a || Object, shared_1.JhiLanguageHelper,
            shared_1.UserService, typeof (_b = typeof ng_jhipster_1.JhiEventManager !== "undefined" && ng_jhipster_1.JhiEventManager) === "function" && _b || Object])
    ], UserMgmtDialogComponent);
    return UserMgmtDialogComponent;
    var _a, _b;
}());
exports.UserMgmtDialogComponent = UserMgmtDialogComponent;
var UserDialogComponent = (function () {
    function UserDialogComponent(route, userModalService) {
        this.route = route;
        this.userModalService = userModalService;
    }
    UserDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['login']) {
                _this.modalRef = _this.userModalService.open(UserMgmtDialogComponent, params['login']);
            }
            else {
                _this.modalRef = _this.userModalService.open(UserMgmtDialogComponent);
            }
        });
    };
    UserDialogComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    UserDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-user-dialog',
            template: ''
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, user_modal_service_1.UserModalService])
    ], UserDialogComponent);
    return UserDialogComponent;
    var _a;
}());
exports.UserDialogComponent = UserDialogComponent;
//# sourceMappingURL=user-management-dialog.component.js.map