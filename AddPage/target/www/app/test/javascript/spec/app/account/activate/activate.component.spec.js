"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var test_module_1 = require("../../../test.module");
var mock_route_service_1 = require("../../../helpers/mock-route.service");
var shared_1 = require("../../../../../../main/webapp/app/shared");
var activate_service_1 = require("../../../../../../main/webapp/app/account/activate/activate.service");
var activate_component_1 = require("../../../../../../main/webapp/app/account/activate/activate.component");
describe('Component Tests', function () {
    describe('ActivateComponent', function () {
        var comp;
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [test_module_1.DeviceMgmtTestModule],
                declarations: [activate_component_1.ActivateComponent],
                providers: [
                    activate_service_1.ActivateService,
                    {
                        provide: router_1.ActivatedRoute,
                        useValue: new mock_route_service_1.MockActivatedRoute({ 'key': 'ABC123' })
                    },
                    {
                        provide: shared_1.LoginModalService,
                        useValue: null
                    }
                ]
            }).overrideTemplate(activate_component_1.ActivateComponent, '')
                .compileComponents();
        }));
        beforeEach(function () {
            var fixture = testing_1.TestBed.createComponent(activate_component_1.ActivateComponent);
            comp = fixture.componentInstance;
        });
        it('calls activate.get with the key from params', testing_1.inject([activate_service_1.ActivateService], testing_1.fakeAsync(function (service) {
            spyOn(service, 'get').and.returnValue(Rx_1.Observable.of());
            comp.ngOnInit();
            testing_1.tick();
            expect(service.get).toHaveBeenCalledWith('ABC123');
        })));
        it('should set set success to OK upon successful activation', testing_1.inject([activate_service_1.ActivateService], testing_1.fakeAsync(function (service) {
            spyOn(service, 'get').and.returnValue(Rx_1.Observable.of({}));
            comp.ngOnInit();
            testing_1.tick();
            expect(comp.error).toBe(null);
            expect(comp.success).toEqual('OK');
        })));
        it('should set set error to ERROR upon activation failure', testing_1.inject([activate_service_1.ActivateService], testing_1.fakeAsync(function (service) {
            spyOn(service, 'get').and.returnValue(Rx_1.Observable.throw('ERROR'));
            comp.ngOnInit();
            testing_1.tick();
            expect(comp.error).toBe('ERROR');
            expect(comp.success).toEqual(null);
        })));
    });
});
//# sourceMappingURL=activate.component.spec.js.map