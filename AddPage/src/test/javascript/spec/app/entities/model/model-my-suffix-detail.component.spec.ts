/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DeviceMgmtTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModelMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/model/model-my-suffix-detail.component';
import { ModelMySuffixService } from '../../../../../../main/webapp/app/entities/model/model-my-suffix.service';
import { ModelMySuffix } from '../../../../../../main/webapp/app/entities/model/model-my-suffix.model';

describe('Component Tests', () => {

    describe('ModelMySuffix Management Detail Component', () => {
        let comp: ModelMySuffixDetailComponent;
        let fixture: ComponentFixture<ModelMySuffixDetailComponent>;
        let service: ModelMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeviceMgmtTestModule],
                declarations: [ModelMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModelMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModelMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModelMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ModelMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.model).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
