import { BaseEntity } from './../../shared';

export class FirstEntityMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public firstEntityfield1?: string,
        public firstEntityfield2?: string,
        public secondEntities?: BaseEntity[],
    ) {
    }
}
