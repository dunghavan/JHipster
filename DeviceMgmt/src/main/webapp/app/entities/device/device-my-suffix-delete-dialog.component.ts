import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DeviceMySuffix } from './device-my-suffix.model';
import { DeviceMySuffixPopupService } from './device-my-suffix-popup.service';
import { DeviceMySuffixService } from './device-my-suffix.service';

@Component({
    selector: 'jhi-device-my-suffix-delete-dialog',
    templateUrl: './device-my-suffix-delete-dialog.component.html'
})
export class DeviceMySuffixDeleteDialogComponent {

    device: DeviceMySuffix;

    constructor(
        private deviceService: DeviceMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deviceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'deviceListModification',
                content: 'Deleted an device'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-device-my-suffix-delete-popup',
    template: ''
})
export class DeviceMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private devicePopupService: DeviceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.devicePopupService
                .open(DeviceMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
