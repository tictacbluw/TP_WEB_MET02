import { Product } from '../product';

export class AddArticle 
{
    static readonly type = '[Product] Add';
    constructor(public payload: Product) {}
}