import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { FirstEntityMySuffix } from './first-entity-my-suffix.model';
import { FirstEntityMySuffixService } from './first-entity-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-first-entity-my-suffix',
    templateUrl: './first-entity-my-suffix.component.html'
})
export class FirstEntityMySuffixComponent implements OnInit, OnDestroy {
firstEntities: FirstEntityMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private firstEntityService: FirstEntityMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.firstEntityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.firstEntities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFirstEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FirstEntityMySuffix) {
        return item.id;
    }
    registerChangeInFirstEntities() {
        this.eventSubscriber = this.eventManager.subscribe('firstEntityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
