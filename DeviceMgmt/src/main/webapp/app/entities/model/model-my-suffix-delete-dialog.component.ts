import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ModelMySuffix } from './model-my-suffix.model';
import { ModelMySuffixPopupService } from './model-my-suffix-popup.service';
import { ModelMySuffixService } from './model-my-suffix.service';

@Component({
    selector: 'jhi-model-my-suffix-delete-dialog',
    templateUrl: './model-my-suffix-delete-dialog.component.html'
})
export class ModelMySuffixDeleteDialogComponent {

    model: ModelMySuffix;

    constructor(
        private modelService: ModelMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modelListModification',
                content: 'Deleted an model'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-model-my-suffix-delete-popup',
    template: ''
})
export class ModelMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelPopupService: ModelMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.modelPopupService
                .open(ModelMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
