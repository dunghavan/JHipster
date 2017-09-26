import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { FirstEntityMySuffix } from './first-entity-my-suffix.model';
import { FirstEntityMySuffixService } from './first-entity-my-suffix.service';

@Component({
    selector: 'jhi-first-entity-my-suffix-detail',
    templateUrl: './first-entity-my-suffix-detail.component.html'
})
export class FirstEntityMySuffixDetailComponent implements OnInit, OnDestroy {

    firstEntity: FirstEntityMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private firstEntityService: FirstEntityMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFirstEntities();
    }

    load(id) {
        this.firstEntityService.find(id).subscribe((firstEntity) => {
            this.firstEntity = firstEntity;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFirstEntities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'firstEntityListModification',
            (response) => this.load(this.firstEntity.id)
        );
    }
}
