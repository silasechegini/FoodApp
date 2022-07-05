import { useContext } from 'react';
import { cartContext } from '../../store/ContextApi';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = ({ onClick }) => {
    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => cartCtx.removeItem(id);

    const cartItemAddHandler = (item) => cartCtx.addItem(item);

    const cartItems = (
        <ul className={classes['cart-items']}>{
            cartCtx.items.map((item) => <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
            />
            )}
        </ul>
    )


    return (
        <Modal onClick={onClick}>
            {/* <div className={classes['cart-items']}></div> */}
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={onClick}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;