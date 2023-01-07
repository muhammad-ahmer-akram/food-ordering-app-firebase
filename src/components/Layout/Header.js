import React from "react";
import styles from "./Header.module.scss";
import mealsImage from "../../assets/meals.jpg";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Foody Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles.main_image}>
        <img src={mealsImage} alt="Meals Table!!" />
      </div>
    </React.Fragment>
  );
};
