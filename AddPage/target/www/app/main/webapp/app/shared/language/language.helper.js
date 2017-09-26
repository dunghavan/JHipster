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
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var language_constants_1 = require("./language.constants");
var JhiLanguageHelper = (function () {
    function JhiLanguageHelper(translateService, rootRenderer, titleService, router) {
        this.translateService = translateService;
        this.rootRenderer = rootRenderer;
        this.titleService = titleService;
        this.router = router;
        this.renderer = null;
        this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
        this.init();
    }
    JhiLanguageHelper.prototype.getAll = function () {
        return Promise.resolve(language_constants_1.LANGUAGES);
    };
    /**
     * Update the window title using params in the following
     * order:
     * 1. titleKey parameter
     * 2. $state.$current.data.pageTitle (current state page title)
     * 3. 'global.title'
     */
    JhiLanguageHelper.prototype.updateTitle = function (titleKey) {
        var _this = this;
        if (!titleKey) {
            titleKey = this.getPageTitle(this.router.routerState.snapshot.root);
        }
        this.translateService.get(titleKey).subscribe(function (title) {
            _this.titleService.setTitle(title);
        });
    };
    JhiLanguageHelper.prototype.init = function () {
        var _this = this;
        this.translateService.onLangChange.subscribe(function (event) {
            _this.renderer.setAttribute(document.querySelector('html'), 'lang', _this.translateService.currentLang);
            _this.updateTitle();
        });
    };
    JhiLanguageHelper.prototype.getPageTitle = function (routeSnapshot) {
        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'deviceMgmtApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    };
    JhiLanguageHelper = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof core_2.TranslateService !== "undefined" && core_2.TranslateService) === "function" && _a || Object, typeof (_b = typeof core_1.RendererFactory2 !== "undefined" && core_1.RendererFactory2) === "function" && _b || Object, typeof (_c = typeof platform_browser_1.Title !== "undefined" && platform_browser_1.Title) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
    ], JhiLanguageHelper);
    return JhiLanguageHelper;
    var _a, _b, _c, _d;
}());
exports.JhiLanguageHelper = JhiLanguageHelper;
//# sourceMappingURL=language.helper.js.map