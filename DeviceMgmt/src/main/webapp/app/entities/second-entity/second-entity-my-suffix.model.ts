import { BaseEntity } from './../../shared';

export class SecondEntityMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public secondEntityfield1?: string,
        public secondEntityfield2?: string,
        public firstEntity?: BaseEntity,
    ) {
    }
}
