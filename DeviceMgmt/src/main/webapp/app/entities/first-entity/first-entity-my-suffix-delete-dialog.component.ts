import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FirstEntityMySuffix } from './first-entity-my-suffix.model';
import { FirstEntityMySuffixPopupService } from './first-entity-my-suffix-popup.service';
import { FirstEntityMySuffixService } from './first-entity-my-suffix.service';

@Component({
    selector: 'jhi-first-entity-my-suffix-delete-dialog',
    templateUrl: './first-entity-my-suffix-delete-dialog.component.html'
})
export class FirstEntityMySuffixDeleteDialogComponent {

    firstEntity: FirstEntityMySuffix;

    constructor(
        private firstEntityService: FirstEntityMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.firstEntityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'firstEntityListModification',
                content: 'Deleted an firstEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-first-entity-my-suffix-delete-popup',
    template: ''
})
export class FirstEntityMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private firstEntityPopupService: FirstEntityMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.firstEntityPopupService
                .open(FirstEntityMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
