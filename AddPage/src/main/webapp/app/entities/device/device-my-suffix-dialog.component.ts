import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DeviceMySuffix } from './device-my-suffix.model';
import { DeviceMySuffixPopupService } from './device-my-suffix-popup.service';
import { DeviceMySuffixService } from './device-my-suffix.service';
import { ModelMySuffix, ModelMySuffixService } from '../model';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-device-my-suffix-dialog',
    templateUrl: './device-my-suffix-dialog.component.html'
})
export class DeviceMySuffixDialogComponent implements OnInit {

    device: DeviceMySuffix;
    authorities: any[];
    isSaving: boolean;

    models: ModelMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private deviceService: DeviceMySuffixService,
        private modelService: ModelMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.modelService.query()
            .subscribe((res: ResponseWrapper) => { this.models = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.device.id !== undefined) {
            this.subscribeToSaveResponse(
                this.deviceService.update(this.device));
        } else {
            this.subscribeToSaveResponse(
                this.deviceService.create(this.device));
        }
    }

    private subscribeToSaveResponse(result: Observable<DeviceMySuffix>) {
        result.subscribe((res: DeviceMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: DeviceMySuffix) {
        this.eventManager.broadcast({ name: 'deviceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackModelById(index: number, item: ModelMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-device-my-suffix-popup',
    template: ''
})
export class DeviceMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private devicePopupService: DeviceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.devicePopupService
                    .open(DeviceMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.devicePopupService
                    .open(DeviceMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
