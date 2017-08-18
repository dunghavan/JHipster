import { BaseEntity } from './../../shared';

export class ModelMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public modelName?: string,
        public note?: string,
    ) {
    }
}
