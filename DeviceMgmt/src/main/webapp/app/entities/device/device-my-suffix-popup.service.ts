import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeviceMySuffix } from './device-my-suffix.model';
import { DeviceMySuffixService } from './device-my-suffix.service';

@Injectable()
export class DeviceMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private deviceService: DeviceMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.deviceService.find(id).subscribe((device) => {
                this.deviceModalRef(component, device);
            });
        } else {
            return this.deviceModalRef(component, new DeviceMySuffix());
        }
    }

    deviceModalRef(component: Component, device: DeviceMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.device = device;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
