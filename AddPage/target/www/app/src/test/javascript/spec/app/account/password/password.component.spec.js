"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var Rx_1 = require("rxjs/Rx");
var test_module_1 = require("../../../test.module");
var password_component_1 = require("../../../../../../main/webapp/app/account/password/password.component");
var password_service_1 = require("../../../../../../main/webapp/app/account/password/password.service");
var principal_service_1 = require("../../../../../../main/webapp/app/shared/auth/principal.service");
var account_service_1 = require("../../../../../../main/webapp/app/shared/auth/account.service");
describe('Component Tests', function () {
    describe('PasswordComponent', function () {
        var comp;
        var fixture;
        var service;
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [test_module_1.DeviceMgmtTestModule],
                declarations: [password_component_1.PasswordComponent],
                providers: [
                    principal_service_1.Principal,
                    account_service_1.AccountService,
                    password_service_1.PasswordService
                ]
            }).overrideTemplate(password_component_1.PasswordComponent, '')
                .compileComponents();
        }));
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(password_component_1.PasswordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(password_service_1.PasswordService);
        });
        it('should show error if passwords do not match', function () {
            // GIVEN
            comp.password = 'password1';
            comp.confirmPassword = 'password2';
            // WHEN
            comp.changePassword();
            // THEN
            expect(comp.doNotMatch).toBe('ERROR');
            expect(comp.error).toBeNull();
            expect(comp.success).toBeNull();
        });
        it('should call Auth.changePassword when passwords match', function () {
            // GIVEN
            spyOn(service, 'save').and.returnValue(Rx_1.Observable.of(true));
            comp.password = comp.confirmPassword = 'myPassword';
            // WHEN
            comp.changePassword();
            // THEN
            expect(service.save).toHaveBeenCalledWith('myPassword');
        });
        it('should set success to OK upon success', function () {
            // GIVEN
            spyOn(service, 'save').and.returnValue(Rx_1.Observable.of(true));
            comp.password = comp.confirmPassword = 'myPassword';
            // WHEN
            comp.changePassword();
            // THEN
            expect(comp.doNotMatch).toBeNull();
            expect(comp.error).toBeNull();
            expect(comp.success).toBe('OK');
        });
        it('should notify of error if change password fails', function () {
            // GIVEN
            spyOn(service, 'save').and.returnValue(Rx_1.Observable.throw('ERROR'));
            comp.password = comp.confirmPassword = 'myPassword';
            // WHEN
            comp.changePassword();
            // THEN
            expect(comp.doNotMatch).toBeNull();
            expect(comp.success).toBeNull();
            expect(comp.error).toBe('ERROR');
        });
    });
});
//# sourceMappingURL=password.component.spec.js.map