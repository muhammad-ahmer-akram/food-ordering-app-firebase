import React, { useContext, useEffect, useState } from "react";
import { CartIcon } from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.scss";
import { CartContext } from "../../Store/CartContext";

export const HeaderCartButton = (props) => {
  const [btnBump, setBtnBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnBump ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBump(true);
    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};
