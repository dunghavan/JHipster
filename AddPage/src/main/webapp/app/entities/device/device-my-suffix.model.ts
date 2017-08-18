import { BaseEntity } from './../../shared';

export class DeviceMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public deviceName?: string,
        public ipAddress?: string,
        public download?: number,
        public upload?: number,
        public model?: BaseEntity,
    ) {
    }
}
