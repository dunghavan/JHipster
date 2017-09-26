"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var test_module_1 = require("../../../../test.module");
var password_reset_init_component_1 = require("../../../../../../../main/webapp/app/account/password-reset/init/password-reset-init.component");
var password_reset_init_service_1 = require("../../../../../../../main/webapp/app/account/password-reset/init/password-reset-init.service");
describe('Component Tests', function () {
    describe('PasswordResetInitComponent', function () {
        var fixture;
        var comp;
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                imports: [test_module_1.DeviceMgmtTestModule],
                declarations: [password_reset_init_component_1.PasswordResetInitComponent],
                providers: [
                    password_reset_init_service_1.PasswordResetInitService,
                    {
                        provide: core_1.Renderer,
                        useValue: {
                            invokeElementMethod: function (renderElement, methodName, args) { }
                        }
                    },
                    {
                        provide: core_1.ElementRef,
                        useValue: new core_1.ElementRef(null)
                    }
                ]
            }).overrideTemplate(password_reset_init_component_1.PasswordResetInitComponent, '')
                .createComponent(password_reset_init_component_1.PasswordResetInitComponent);
            comp = fixture.componentInstance;
            comp.ngOnInit();
        });
        it('should define its initial state', function () {
            expect(comp.success).toBeUndefined();
            expect(comp.error).toBeUndefined();
            expect(comp.errorEmailNotExists).toBeUndefined();
            expect(comp.resetAccount).toEqual({});
        });
        it('sets focus after the view has been initialized', testing_1.inject([core_1.ElementRef], function (elementRef) {
            var element = fixture.nativeElement;
            var node = {
                focus: function () { }
            };
            elementRef.nativeElement = element;
            spyOn(element, 'querySelector').and.returnValue(node);
            spyOn(node, 'focus');
            comp.ngAfterViewInit();
            expect(element.querySelector).toHaveBeenCalledWith('#email');
            expect(node.focus).toHaveBeenCalled();
        }));
        it('notifies of success upon successful requestReset', testing_1.inject([password_reset_init_service_1.PasswordResetInitService], function (service) {
            spyOn(service, 'save').and.returnValue(Rx_1.Observable.of({}));
            comp.resetAccount.email = 'user@domain.com';
            comp.requestReset();
            expect(service.save).toHaveBeenCalledWith('user@domain.com');
            expect(comp.success).toEqual('OK');
            expect(comp.error).toBeNull();
            expect(comp.errorEmailNotExists).toBeNull();
        }));
        it('notifies of unknown email upon email address not registered/400', testing_1.inject([password_reset_init_service_1.PasswordResetInitService], function (service) {
            spyOn(service, 'save').and.returnValue(Rx_1.Observable.throw({
                status: 400,
                data: 'email address not registered'
            }));
            comp.resetAccount.email = 'user@domain.com';
            comp.requestReset();
            expect(service.save).toHaveBeenCalledWith('user@domain.com');
            expect(comp.success).toBeNull();
            expect(comp.error).toBeNull();
            expect(comp.errorEmailNotExists).toEqual('ERROR');
        }));
        it('notifies of error upon error response', testing_1.inject([password_reset_init_service_1.PasswordResetInitService], function (service) {
            spyOn(service, 'save').and.returnValue(Rx_1.Observable.throw({
                status: 503,
                data: 'something else'
            }));
            comp.resetAccount.email = 'user@domain.com';
            comp.requestReset();
            expect(service.save).toHaveBeenCalledWith('user@domain.com');
            expect(comp.success).toBeNull();
            expect(comp.errorEmailNotExists).toBeNull();
            expect(comp.error).toEqual('ERROR');
        }));
    });
});
//# sourceMappingURL=password-reset-init.component.spec.js.map