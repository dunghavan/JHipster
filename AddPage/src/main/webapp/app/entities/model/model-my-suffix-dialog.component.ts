import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ModelMySuffix } from './model-my-suffix.model';
import { ModelMySuffixPopupService } from './model-my-suffix-popup.service';
import { ModelMySuffixService } from './model-my-suffix.service';

@Component({
    selector: 'jhi-model-my-suffix-dialog',
    templateUrl: './model-my-suffix-dialog.component.html'
})
export class ModelMySuffixDialogComponent implements OnInit {

    model: ModelMySuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private modelService: ModelMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modelService.update(this.model));
        } else {
            this.subscribeToSaveResponse(
                this.modelService.create(this.model));
        }
    }

    private subscribeToSaveResponse(result: Observable<ModelMySuffix>) {
        result.subscribe((res: ModelMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ModelMySuffix) {
        this.eventManager.broadcast({ name: 'modelListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-model-my-suffix-popup',
    template: ''
})
export class ModelMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelPopupService: ModelMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.modelPopupService
                    .open(ModelMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.modelPopupService
                    .open(ModelMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
