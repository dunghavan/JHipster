import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ModelMySuffix } from './model-my-suffix.model';
import { ModelMySuffixService } from './model-my-suffix.service';

@Component({
    selector: 'jhi-model-my-suffix-detail',
    templateUrl: './model-my-suffix-detail.component.html'
})
export class ModelMySuffixDetailComponent implements OnInit, OnDestroy {

    model: ModelMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private modelService: ModelMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModels();
    }

    load(id) {
        this.modelService.find(id).subscribe((model) => {
            this.model = model;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modelListModification',
            (response) => this.load(this.model.id)
        );
    }
}
