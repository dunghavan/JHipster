import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SecondEntityMySuffix } from './second-entity-my-suffix.model';
import { SecondEntityMySuffixPopupService } from './second-entity-my-suffix-popup.service';
import { SecondEntityMySuffixService } from './second-entity-my-suffix.service';

@Component({
    selector: 'jhi-second-entity-my-suffix-delete-dialog',
    templateUrl: './second-entity-my-suffix-delete-dialog.component.html'
})
export class SecondEntityMySuffixDeleteDialogComponent {

    secondEntity: SecondEntityMySuffix;

    constructor(
        private secondEntityService: SecondEntityMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.secondEntityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'secondEntityListModification',
                content: 'Deleted an secondEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-second-entity-my-suffix-delete-popup',
    template: ''
})
export class SecondEntityMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private secondEntityPopupService: SecondEntityMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.secondEntityPopupService
                .open(SecondEntityMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
