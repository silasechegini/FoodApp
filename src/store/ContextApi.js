import { createContext, useReducer } from "react";

const cartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
});

const defaultState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex] || null;
        let updatedItems
        if (existingCartItem) {
            const updatedItem = { ...action.item, amount: action.item.amount + existingCartItem.amount };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item)
        }
        let updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== existingCartItem.id);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        let updatedTotalAmount = state.totalAmount - existingCartItem.price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultState
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    }
    const removeItemFromCartHandler = (id: string | number) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    }

    const cartContextProps = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
        <cartContext.Provider value={cartContextProps}>
            {props.children}
        </cartContext.Provider>
    )
}



export default CartProvider;
export { cartContext };