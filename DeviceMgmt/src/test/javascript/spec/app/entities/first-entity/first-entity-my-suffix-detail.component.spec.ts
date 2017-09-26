/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DeviceMgmtTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FirstEntityMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/first-entity/first-entity-my-suffix-detail.component';
import { FirstEntityMySuffixService } from '../../../../../../main/webapp/app/entities/first-entity/first-entity-my-suffix.service';
import { FirstEntityMySuffix } from '../../../../../../main/webapp/app/entities/first-entity/first-entity-my-suffix.model';

describe('Component Tests', () => {

    describe('FirstEntityMySuffix Management Detail Component', () => {
        let comp: FirstEntityMySuffixDetailComponent;
        let fixture: ComponentFixture<FirstEntityMySuffixDetailComponent>;
        let service: FirstEntityMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeviceMgmtTestModule],
                declarations: [FirstEntityMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FirstEntityMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(FirstEntityMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FirstEntityMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FirstEntityMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FirstEntityMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.firstEntity).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
