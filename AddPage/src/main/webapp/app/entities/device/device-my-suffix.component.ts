import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { DeviceMySuffix } from './device-my-suffix.model';
import { DeviceMySuffixService } from './device-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-device-my-suffix',
    templateUrl: './device-my-suffix.component.html'
})
export class DeviceMySuffixComponent implements OnInit, OnDestroy {
devices: DeviceMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private deviceService: DeviceMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.deviceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.devices = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDevices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DeviceMySuffix) {
        return item.id;
    }
    registerChangeInDevices() {
        this.eventSubscriber = this.eventManager.subscribe('deviceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
