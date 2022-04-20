import React, { useEffect, useState } from 'react';
import getCurrencyRate from '../utils/utils';
import styles from './Header.style.module.css'

export default function Header() {
  const [UAH, setUAH] = useState(0);
  const [EUR, setEUR] = useState(0);
  useEffect(() => {
    getCurrencyRate().then((data) => {
      const { UAH, EUR } = data;
      setEUR(EUR);
      setUAH(UAH);
    });
  })

  return (
    <div className={styles.navbar}>
      <div className={`container ${styles.header_container}`}>
        <div className={styles.logo}>CE</div>
        <div className={styles.currency_wrapper}>
          <p className={styles.currency_item}>1EUR = {(UAH / EUR).toFixed(2)}UAH</p>
          <p className={styles.currency_item}>1USD = {UAH.toFixed(2)}UAH</p>
        </div>
      </div>
    </div>
  )
}
