"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_1 = require("../../../../../../../main/webapp/app/shared");
var test_module_1 = require("../../../../test.module");
var password_reset_finish_component_1 = require("../../../../../../../main/webapp/app/account/password-reset/finish/password-reset-finish.component");
var password_reset_finish_service_1 = require("../../../../../../../main/webapp/app/account/password-reset/finish/password-reset-finish.service");
var mock_route_service_1 = require("../../../../helpers/mock-route.service");
describe('Component Tests', function () {
    describe('PasswordResetFinishComponent', function () {
        var fixture;
        var comp;
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                imports: [test_module_1.DeviceMgmtTestModule],
                declarations: [password_reset_finish_component_1.PasswordResetFinishComponent],
                providers: [
                    password_reset_finish_service_1.PasswordResetFinishService,
                    {
                        provide: shared_1.LoginModalService,
                        useValue: null
                    },
                    {
                        provide: router_1.ActivatedRoute,
                        useValue: new mock_route_service_1.MockActivatedRoute({ 'key': 'XYZPDQ' })
                    },
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
            }).overrideTemplate(password_reset_finish_component_1.PasswordResetFinishComponent, '')
                .createComponent(password_reset_finish_component_1.PasswordResetFinishComponent);
            comp = fixture.componentInstance;
        });
        it('should define its initial state', function () {
            comp.ngOnInit();
            expect(comp.keyMissing).toBeFalsy();
            expect(comp.key).toEqual('XYZPDQ');
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
            expect(element.querySelector).toHaveBeenCalledWith('#password');
            expect(node.focus).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=password-reset-finish.component.spec.js.map