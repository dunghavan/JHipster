import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FirstEntityMySuffix } from './first-entity-my-suffix.model';
import { FirstEntityMySuffixPopupService } from './first-entity-my-suffix-popup.service';
import { FirstEntityMySuffixService } from './first-entity-my-suffix.service';

@Component({
    selector: 'jhi-first-entity-my-suffix-dialog',
    templateUrl: './first-entity-my-suffix-dialog.component.html'
})
export class FirstEntityMySuffixDialogComponent implements OnInit {

    firstEntity: FirstEntityMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private firstEntityService: FirstEntityMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.firstEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.firstEntityService.update(this.firstEntity));
        } else {
            this.subscribeToSaveResponse(
                this.firstEntityService.create(this.firstEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FirstEntityMySuffix>) {
        result.subscribe((res: FirstEntityMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: FirstEntityMySuffix) {
        this.eventManager.broadcast({ name: 'firstEntityListModification', content: 'OK'});
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
    selector: 'jhi-first-entity-my-suffix-popup',
    template: ''
})
export class FirstEntityMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private firstEntityPopupService: FirstEntityMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.firstEntityPopupService
                    .open(FirstEntityMySuffixDialogComponent as Component, params['id']);
            } else {
                this.firstEntityPopupService
                    .open(FirstEntityMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
