import { BaseEntity } from './../../shared';

export class Hub implements BaseEntity {
    constructor(
        public id?: number,
        public uid?: number,
        public alias?: string,
        public uuid?: string,
        public lastactive?: any,
    ) {
    }
}
