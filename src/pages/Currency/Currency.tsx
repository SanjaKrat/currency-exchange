import React, { ChangeEvent, useEffect, useState } from 'react';
import getCurrencyRate from '../../utils/utils';
import styles from './Currency.style.module.css';

export default function Currency() {
  const [amount, setAmount] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const amountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (+evt.currentTarget.value < 0) {
      setAmount('0');
    } else {
      setAmount(evt.currentTarget.value);
    }
  }
  const convert = (amount: string, from: string, to: string) => {
    setLoading(true);
    if (from === to) {
      setLoading(false);
      setResult(1);
      return;
    }
    getCurrencyRate().then((data) => {
      let res = null;
      res = Number(amount) * Number(data[to.toUpperCase()]) / Number(data[from.toUpperCase()]);
      setLoading(false);
      setResult(+res.toFixed(2));
    })
  }

  useEffect(() => {
    if (amount && from && to) {
      convert(amount, from, to);
    }
  }, [amount, from, to])

  // const selectHandler = (value: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
  //   setter(value);
  //   console.log('from: ', from, ' to: ', to);
  //   if (from && to) {
  //     convert();
  //   }
  // }

  return (
    <div className='container'>
      <div className={styles.exchange_wrapper}>
        <form className={styles.form}>
          <div className={styles.input_wrapper}>
            <label className={styles.label} htmlFor="amount">Amount</label>
            <input
              value={amount}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => amountHandler(evt)}
              className={styles.input}
              type="number"
              name="amount"
              id="amount"
              min={0}
              placeholder='0' />
          </div>
          <div className={styles.input_wrapper}>
            <label className={styles.label} htmlFor="from">From:</label>
            <select
              value={from}
              onChange={(evt: ChangeEvent<HTMLSelectElement>) => setFrom(evt.target.value)}
              className={styles.input}
              name="from"
              id="from"
            >
              <option value="" disabled>Select currency...</option>
              <option value="uah">UAH</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="pln">PLN</option>
            </select>
          </div>
          <div className={styles.input_wrapper}>
            <label className={styles.label} htmlFor="to">To:</label>
            <select
              value={to}
              onChange={(evt: ChangeEvent<HTMLSelectElement>) => setTo(evt.target.value)}
              className={styles.input}
              name="to"
              id="to"
            >
              <option disabled value="">Select currency...</option>
              <option value="uah">UAH</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="pln">PLN</option>
            </select>
          </div>
        </form>
        {/* <button
          className={styles.convert_btn}
          onClick={convert}
          disabled={!amount || !from || !to}
        >
          Convert
        </button> */}
        {loading ? <div className={styles.loader}></div> : <></>}
        {result ? <div className={styles.result}>{amount}{from.toUpperCase()} = {result}{to.toUpperCase()}</div> : <></>}
      </div>
    </div>
  )
}
