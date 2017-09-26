import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hub } from './hub.model';
import { HubPopupService } from './hub-popup.service';
import { HubService } from './hub.service';

@Component({
    selector: 'jhi-hub-delete-dialog',
    templateUrl: './hub-delete-dialog.component.html'
})
export class HubDeleteDialogComponent {

    hub: Hub;

    constructor(
        private hubService: HubService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hubService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hubListModification',
                content: 'Deleted an hub'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hub-delete-popup',
    template: ''
})
export class HubDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hubPopupService: HubPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hubPopupService
                .open(HubDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
