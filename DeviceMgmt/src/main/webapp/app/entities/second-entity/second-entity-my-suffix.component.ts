import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { SecondEntityMySuffix } from './second-entity-my-suffix.model';
import { SecondEntityMySuffixService } from './second-entity-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-second-entity-my-suffix',
    templateUrl: './second-entity-my-suffix.component.html'
})
export class SecondEntityMySuffixComponent implements OnInit, OnDestroy {
secondEntities: SecondEntityMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private secondEntityService: SecondEntityMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.secondEntityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.secondEntities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSecondEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SecondEntityMySuffix) {
        return item.id;
    }
    registerChangeInSecondEntities() {
        this.eventSubscriber = this.eventManager.subscribe('secondEntityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
