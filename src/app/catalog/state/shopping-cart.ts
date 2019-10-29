import {NgxsModule,Action,Selector,State, StateContext} from '@ngxs/store';
import {ShoppingCartModel} from './shopping-cart-model';
import {AddArticle} from '../action/add-article';
import {RemoveArticle} from '../action/remove-article';

@State<ShoppingCartModel>({
    name: 'shoppingCart',
    defaults: {
        shoppingCart: []
    }
})

export class ShoppingCart 
{
    @Selector()
    static getShoppingCart(state: ShoppingCartModel) {
        return state.shoppingCart;
    }

@Action(AddArticle)
    Add({getState, patchState }: StateContext<ShoppingCartModel>, { payload }: AddArticle) {
        const state = getState();
        patchState({
            shoppingCart: [...state.shoppingCart, payload]
        });
    }

 @Action(RemoveArticle)
    Remove({getState, patchState }: StateContext<ShoppingCartModel>, { payload }: AddArticle) {
        const state = getState();
        
        patchState({
            shoppingCart: [...(state.shoppingCart.slice(0,-1))]
        });
    }   
}