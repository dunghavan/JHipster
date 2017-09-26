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
var http_1 = require("@angular/http");
var shared_1 = require("../../shared");
var DeviceMySuffixService = (function () {
    function DeviceMySuffixService(http) {
        this.http = http;
        this.resourceUrl = 'api/devices';
    }
    DeviceMySuffixService.prototype.create = function (device) {
        var copy = this.convert(device);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    DeviceMySuffixService.prototype.update = function (device) {
        var copy = this.convert(device);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    DeviceMySuffixService.prototype.find = function (id) {
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            return res.json();
        });
    };
    DeviceMySuffixService.prototype.query = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    DeviceMySuffixService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    DeviceMySuffixService.prototype.convertResponse = function (res) {
        var jsonResponse = res.json();
        return new shared_1.ResponseWrapper(res.headers, jsonResponse, res.status);
    };
    DeviceMySuffixService.prototype.convert = function (device) {
        var copy = Object.assign({}, device);
        return copy;
    };
    DeviceMySuffixService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
    ], DeviceMySuffixService);
    return DeviceMySuffixService;
    var _a;
}());
exports.DeviceMySuffixService = DeviceMySuffixService;
//# sourceMappingURL=device-my-suffix.service.js.map