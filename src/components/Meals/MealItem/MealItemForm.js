import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef } from 'react';

const MealItemForm = ({ id, onAddToCart }) => {
    const cartItemRef = useRef({});

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = Number(cartItemRef.current.value);
        if (enteredAmount.length === 0) {
            return;
        }
        onAddToCart(enteredAmount)
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={cartItemRef}
                input={{
                    id: `amount_${id}`,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button >+ Add</button>
        </form>
    )
}

export default MealItemForm;