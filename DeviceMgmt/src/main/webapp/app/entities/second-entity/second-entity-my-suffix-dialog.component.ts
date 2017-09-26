import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SecondEntityMySuffix } from './second-entity-my-suffix.model';
import { SecondEntityMySuffixPopupService } from './second-entity-my-suffix-popup.service';
import { SecondEntityMySuffixService } from './second-entity-my-suffix.service';
import { FirstEntityMySuffix, FirstEntityMySuffixService } from '../first-entity';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-second-entity-my-suffix-dialog',
    templateUrl: './second-entity-my-suffix-dialog.component.html'
})
export class SecondEntityMySuffixDialogComponent implements OnInit {

    secondEntity: SecondEntityMySuffix;
    isSaving: boolean;

    firstentities: FirstEntityMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private secondEntityService: SecondEntityMySuffixService,
        private firstEntityService: FirstEntityMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.firstEntityService.query()
            .subscribe((res: ResponseWrapper) => { this.firstentities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.secondEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.secondEntityService.update(this.secondEntity));
        } else {
            this.subscribeToSaveResponse(
                this.secondEntityService.create(this.secondEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<SecondEntityMySuffix>) {
        result.subscribe((res: SecondEntityMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SecondEntityMySuffix) {
        this.eventManager.broadcast({ name: 'secondEntityListModification', content: 'OK'});
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

    trackFirstEntityById(index: number, item: FirstEntityMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-second-entity-my-suffix-popup',
    template: ''
})
export class SecondEntityMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private secondEntityPopupService: SecondEntityMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.secondEntityPopupService
                    .open(SecondEntityMySuffixDialogComponent as Component, params['id']);
            } else {
                this.secondEntityPopupService
                    .open(SecondEntityMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
