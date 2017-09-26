import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { SecondEntityMySuffix } from './second-entity-my-suffix.model';
import { SecondEntityMySuffixService } from './second-entity-my-suffix.service';

@Component({
    selector: 'jhi-second-entity-my-suffix-detail',
    templateUrl: './second-entity-my-suffix-detail.component.html'
})
export class SecondEntityMySuffixDetailComponent implements OnInit, OnDestroy {

    secondEntity: SecondEntityMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private secondEntityService: SecondEntityMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSecondEntities();
    }

    load(id) {
        this.secondEntityService.find(id).subscribe((secondEntity) => {
            this.secondEntity = secondEntity;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSecondEntities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'secondEntityListModification',
            (response) => this.load(this.secondEntity.id)
        );
    }
}
