"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var spyobject_1 = require("./spyobject");
var account_service_1 = require("../../../../main/webapp/app/shared/auth/account.service");
var MockAccountService = (function (_super) {
    __extends(MockAccountService, _super);
    function MockAccountService() {
        var _this = _super.call(this, account_service_1.AccountService) || this;
        _this.fakeResponse = null;
        _this.getSpy = _this.spy('get').andReturn(_this);
        _this.saveSpy = _this.spy('save').andReturn(_this);
        return _this;
    }
    MockAccountService.prototype.subscribe = function (callback) {
        callback(this.fakeResponse);
    };
    MockAccountService.prototype.setResponse = function (json) {
        this.fakeResponse = json;
    };
    return MockAccountService;
}(spyobject_1.SpyObject));
exports.MockAccountService = MockAccountService;
//# sourceMappingURL=mock-account.service.js.map