import React, { useRef, useState } from 'react'
import RatioInputField from './components/ratioComponent'
import * as styles from './calculator.module.css'

export default function Calculator() {
  const ratioContents = [
    {
      label: 'Purchase Price',
      for: 'purchase-price',
    },
    {
      label: 'Down Payment',
      for: 'down-payment',
    },
    {
      label: 'Repayment Time',
      for: 'repayment-time',
    },
    {
      label: 'Interest Rate',
      for: 'interest-rate',
    },
  ]

  const [price, setPrices] = useState([])
  const prices = useRef()

  const getValueInput = () => {
    const inputsDOM = prices.current.querySelectorAll('input')
    const newPrices = []
    inputsDOM.forEach((ele) => {
      newPrices.push(ele.value)
    })
    setPrices(newPrices)
  }

  //Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]

  // M = total monthly payment
  // P = the principal loan amount(price[0]- price[1])
  // r = your monthly interest rate (price[3])
  // n = number of payments over the loan’s lifetime. (price[2])

  const calculateMortgage = () => {
    const P = price[0] - price[1]
    const r = price[3]
    const n = price[2]

    return ((P * ((r * (1 + r)) ^ (n / ((1 + r) ^ n) - 1))) / r) | 0
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Mortgage calculator</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec
          sagittis lacus. Donec fermentum nisl metus, semper porttitor eros
          dapibus a. Phasellus dictum enim in mauris fringilla
        </p>

        <div
          ref={prices}
          onClick={() => getValueInput()}
          className={styles.formInputPrices}
        >
          {ratioContents.map((ratioContent, index) => (
            <RatioInputField
              type={index <= 1 ? '$' : index == 2 ? 'year' : 'percent'}
              key={index}
              forInput={ratioContent.for}
              label={ratioContent.label}
              nameInput={ratioContent.for}
            />
          ))}
        </div>

        <div className={styles.results}>
          <h3 className={styles.loan}>
            Loan amount:{' '}
            <mark className={styles.priceText}>
              {' '}
              {formatter.format((price[0] - price[1]) | 0).replace('.00', '')}
            </mark>
          </h3>
          <h3 className={styles.repayment}>
            Estimate repayment per month:
            <mark className={styles.priceText}>
              {' '}
              {formatter.format(calculateMortgage()).replace('.00', '')}
            </mark>
          </h3>
        </div>
      </div>
    </>
  )
}
