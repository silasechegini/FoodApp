import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import { cartContext } from '../../store/ContextApi';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = ({ onClick }) => {
    const cartCtx = useContext(cartContext);
    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => currNumber + item.amount, 0)

    const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

    const btnClasses = `${classes.button} ${isBtnHighlighted && classes.bump}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setIsBtnHighlighted(true);
        const timer = setTimeout(() => {
            setIsBtnHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [cartCtx.items]);

    return (
        <button className={btnClasses} onClick={onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span> Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;