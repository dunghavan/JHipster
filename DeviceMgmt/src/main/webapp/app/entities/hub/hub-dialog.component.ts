import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hub } from './hub.model';
import { HubPopupService } from './hub-popup.service';
import { HubService } from './hub.service';

@Component({
    selector: 'jhi-hub-dialog',
    templateUrl: './hub-dialog.component.html'
})
export class HubDialogComponent implements OnInit {

    hub: Hub;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private hubService: HubService,
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
        if (this.hub.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hubService.update(this.hub));
        } else {
            this.subscribeToSaveResponse(
                this.hubService.create(this.hub));
        }
    }

    private subscribeToSaveResponse(result: Observable<Hub>) {
        result.subscribe((res: Hub) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Hub) {
        this.eventManager.broadcast({ name: 'hubListModification', content: 'OK'});
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
    selector: 'jhi-hub-popup',
    template: ''
})
export class HubPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hubPopupService: HubPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hubPopupService
                    .open(HubDialogComponent as Component, params['id']);
            } else {
                this.hubPopupService
                    .open(HubDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
