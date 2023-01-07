import React, { useRef, useState } from "react";
import styles from "./Checkout.module.scss";

const isEmpty = (value) => value.trim() === "";
const isFive = (value) => value.trim().length === 5;

export const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFive(enteredPostal);

    setFormInputsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
    nameInputRef.current.value = "";
    postalInputRef.current.value = "";
    streetInputRef.current.value = "";
    cityInputRef.current.value = "";
  };

  const nameControlStyles = `${styles.control} ${
    formInputsValid.name ? "" : styles.invalid
  }`;
  const streetControlStyles = `${styles.control} ${
    formInputsValid.street ? "" : styles.invalid
  }`;
  const postalControlStyles = `${styles.control} ${
    formInputsValid.postal ? "" : styles.invalid
  }`;
  const cityControlStyles = `${styles.control} ${
    formInputsValid.city ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyles}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValid.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div className={streetControlStyles}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValid.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={postalControlStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValid.postal && <p>Please Enter a Valid Postal Code!</p>}
      </div>
      <div className={cityControlStyles}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValid.city && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
