import { Product } from '../product';

export class RemoveArticle 
{
    static readonly type = '[Product] Remove';
    constructor(public payload: Product) {}
}