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
var core_2 = require("@ngx-translate/core");
var ActiveMenuDirective = (function () {
    function ActiveMenuDirective(el, renderer, translateService) {
        this.el = el;
        this.renderer = renderer;
        this.translateService = translateService;
    }
    ActiveMenuDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.translateService.onLangChange.subscribe(function (event) {
            _this.updateActiveFlag(event.lang);
        });
        this.updateActiveFlag(this.translateService.currentLang);
    };
    ActiveMenuDirective.prototype.updateActiveFlag = function (selectedLanguage) {
        if (this.jhiActiveMenu === selectedLanguage) {
            this.renderer.setElementClass(this.el.nativeElement, 'active', true);
        }
        else {
            this.renderer.setElementClass(this.el.nativeElement, 'active', false);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActiveMenuDirective.prototype, "jhiActiveMenu", void 0);
    ActiveMenuDirective = __decorate([
        core_1.Directive({
            selector: '[jhiActiveMenu]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object, typeof (_b = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _b || Object, typeof (_c = typeof core_2.TranslateService !== "undefined" && core_2.TranslateService) === "function" && _c || Object])
    ], ActiveMenuDirective);
    return ActiveMenuDirective;
    var _a, _b, _c;
}());
exports.ActiveMenuDirective = ActiveMenuDirective;
//# sourceMappingURL=active-menu.directive.js.map