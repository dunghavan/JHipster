"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var Rx_1 = require("rxjs/Rx");
var shared_1 = require("../../../../../../main/webapp/app/shared");
var test_module_1 = require("../../../test.module");
var shared_2 = require("../../../../../../main/webapp/app/shared");
var settings_component_1 = require("../../../../../../main/webapp/app/account/settings/settings.component");
var mock_account_service_1 = require("../../../helpers/mock-account.service");
var mock_principal_service_1 = require("../../../helpers/mock-principal.service");
describe('Component Tests', function () {
    describe('SettingsComponent', function () {
        var comp;
        var fixture;
        var mockAuth;
        var mockPrincipal;
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [test_module_1.DeviceMgmtTestModule],
                declarations: [settings_component_1.SettingsComponent],
                providers: [
                    {
                        provide: shared_2.Principal,
                        useClass: mock_principal_service_1.MockPrincipal
                    },
                    {
                        provide: shared_2.AccountService,
                        useClass: mock_account_service_1.MockAccountService
                    },
                    {
                        provide: shared_1.JhiLanguageHelper,
                        useValue: null
                    },
                ]
            }).overrideTemplate(settings_component_1.SettingsComponent, '')
                .compileComponents();
        }));
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(settings_component_1.SettingsComponent);
            comp = fixture.componentInstance;
            mockAuth = fixture.debugElement.injector.get(shared_2.AccountService);
            mockPrincipal = fixture.debugElement.injector.get(shared_2.Principal);
        });
        it('should send the current identity upon save', function () {
            // GIVEN
            var accountValues = {
                firstName: 'John',
                lastName: 'Doe',
                activated: true,
                email: 'john.doe@mail.com',
                langKey: 'en',
                login: 'john'
            };
            mockPrincipal.setResponse(accountValues);
            // WHEN
            comp.settingsAccount = accountValues;
            comp.save();
            // THEN
            expect(mockPrincipal.identitySpy).toHaveBeenCalled();
            expect(mockAuth.saveSpy).toHaveBeenCalledWith(accountValues);
            expect(comp.settingsAccount).toEqual(accountValues);
        });
        it('should notify of success upon successful save', function () {
            // GIVEN
            var accountValues = {
                firstName: 'John',
                lastName: 'Doe'
            };
            mockPrincipal.setResponse(accountValues);
            // WHEN
            comp.save();
            // THEN
            expect(comp.error).toBeNull();
            expect(comp.success).toBe('OK');
        });
        it('should notify of error upon failed save', function () {
            // GIVEN
            mockAuth.saveSpy.and.returnValue(Rx_1.Observable.throw('ERROR'));
            // WHEN
            comp.save();
            // THEN
            expect(comp.error).toEqual('ERROR');
            expect(comp.success).toBeNull();
        });
    });
});
//# sourceMappingURL=settings.component.spec.js.map