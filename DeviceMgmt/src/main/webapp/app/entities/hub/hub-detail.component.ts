import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Hub } from './hub.model';
import { HubService } from './hub.service';

@Component({
    selector: 'jhi-hub-detail',
    templateUrl: './hub-detail.component.html'
})
export class HubDetailComponent implements OnInit, OnDestroy {

    hub: Hub;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hubService: HubService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHubs();
    }

    load(id) {
        this.hubService.find(id).subscribe((hub) => {
            this.hub = hub;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHubs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hubListModification',
            (response) => this.load(this.hub.id)
        );
    }
}
