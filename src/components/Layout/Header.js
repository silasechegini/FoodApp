import React, { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton'
import mealsImage from "../../assets/meals.jpg";
import classes from './Header.module.css';

const Header = ({ onClick }) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React meals</h1>
                <HeaderCartButton onClick={onClick} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="a table full of delicious meals" />
            </div>
        </Fragment>
    )
}

export default Header;