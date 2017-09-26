/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DeviceMgmtTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HubDetailComponent } from '../../../../../../main/webapp/app/entities/hub/hub-detail.component';
import { HubService } from '../../../../../../main/webapp/app/entities/hub/hub.service';
import { Hub } from '../../../../../../main/webapp/app/entities/hub/hub.model';

describe('Component Tests', () => {

    describe('Hub Management Detail Component', () => {
        let comp: HubDetailComponent;
        let fixture: ComponentFixture<HubDetailComponent>;
        let service: HubService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeviceMgmtTestModule],
                declarations: [HubDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HubService,
                    JhiEventManager
                ]
            }).overrideTemplate(HubDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HubDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HubService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Hub(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.hub).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
