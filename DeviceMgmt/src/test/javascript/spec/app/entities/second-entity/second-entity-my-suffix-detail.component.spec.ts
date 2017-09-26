/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DeviceMgmtTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SecondEntityMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/second-entity/second-entity-my-suffix-detail.component';
import { SecondEntityMySuffixService } from '../../../../../../main/webapp/app/entities/second-entity/second-entity-my-suffix.service';
import { SecondEntityMySuffix } from '../../../../../../main/webapp/app/entities/second-entity/second-entity-my-suffix.model';

describe('Component Tests', () => {

    describe('SecondEntityMySuffix Management Detail Component', () => {
        let comp: SecondEntityMySuffixDetailComponent;
        let fixture: ComponentFixture<SecondEntityMySuffixDetailComponent>;
        let service: SecondEntityMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeviceMgmtTestModule],
                declarations: [SecondEntityMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SecondEntityMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(SecondEntityMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SecondEntityMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SecondEntityMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SecondEntityMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.secondEntity).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
