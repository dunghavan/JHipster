"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable max-line-length */
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var ng_jhipster_1 = require("ng-jhipster");
var test_module_1 = require("../../../test.module");
var mock_route_service_1 = require("../../../helpers/mock-route.service");
var model_my_suffix_detail_component_1 = require("../../../../../../main/webapp/app/entities/model/model-my-suffix-detail.component");
var model_my_suffix_service_1 = require("../../../../../../main/webapp/app/entities/model/model-my-suffix.service");
var model_my_suffix_model_1 = require("../../../../../../main/webapp/app/entities/model/model-my-suffix.model");
describe('Component Tests', function () {
    describe('ModelMySuffix Management Detail Component', function () {
        var comp;
        var fixture;
        var service;
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [test_module_1.DeviceMgmtTestModule],
                declarations: [model_my_suffix_detail_component_1.ModelMySuffixDetailComponent],
                providers: [
                    ng_jhipster_1.JhiDateUtils,
                    ng_jhipster_1.JhiDataUtils,
                    common_1.DatePipe,
                    {
                        provide: router_1.ActivatedRoute,
                        useValue: new mock_route_service_1.MockActivatedRoute({ id: 123 })
                    },
                    model_my_suffix_service_1.ModelMySuffixService,
                    ng_jhipster_1.JhiEventManager
                ]
            }).overrideTemplate(model_my_suffix_detail_component_1.ModelMySuffixDetailComponent, '')
                .compileComponents();
        }));
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(model_my_suffix_detail_component_1.ModelMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(model_my_suffix_service_1.ModelMySuffixService);
        });
        describe('OnInit', function () {
            it('Should call load all on init', function () {
                // GIVEN
                spyOn(service, 'find').and.returnValue(Rx_1.Observable.of(new model_my_suffix_model_1.ModelMySuffix(10)));
                // WHEN
                comp.ngOnInit();
                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.model).toEqual(jasmine.objectContaining({ id: 10 }));
            });
        });
    });
});
//# sourceMappingURL=model-my-suffix-detail.component.spec.js.map