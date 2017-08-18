/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DeviceMgmtTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DeviceMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/device/device-my-suffix-detail.component';
import { DeviceMySuffixService } from '../../../../../../main/webapp/app/entities/device/device-my-suffix.service';
import { DeviceMySuffix } from '../../../../../../main/webapp/app/entities/device/device-my-suffix.model';

describe('Component Tests', () => {

    describe('DeviceMySuffix Management Detail Component', () => {
        let comp: DeviceMySuffixDetailComponent;
        let fixture: ComponentFixture<DeviceMySuffixDetailComponent>;
        let service: DeviceMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeviceMgmtTestModule],
                declarations: [DeviceMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DeviceMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(DeviceMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeviceMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeviceMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DeviceMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.device).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
