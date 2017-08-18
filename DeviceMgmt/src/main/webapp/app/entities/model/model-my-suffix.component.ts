import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ModelMySuffix } from './model-my-suffix.model';
import { ModelMySuffixService } from './model-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-model-my-suffix',
    templateUrl: './model-my-suffix.component.html'
})
export class ModelMySuffixComponent implements OnInit, OnDestroy {
models: ModelMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private modelService: ModelMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.modelService.query().subscribe(
            (res: ResponseWrapper) => {
                this.models = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInModels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ModelMySuffix) {
        return item.id;
    }
    registerChangeInModels() {
        this.eventSubscriber = this.eventManager.subscribe('modelListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
