import React, { useState } from 'react'
import * as styles from '../calculator.module.css'

export default function RatioComponent({ forInput, label, nameInput, type }) {
  const [price, setPrice] = useState(0)

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const displaySign = (t, text) => {
    return t == '$' ? `$${text}` : t == 'year' ? `${text} year(s)` : `${text}%`
  }

  return (
    <div className={styles.inputElement}>
      <label forhtml={forInput} className={styles.label}>
        {label}:{' '}
        {displaySign(type, formatter.format(price).replace('.00', '')).replace(
          '$',
          ''
        )}
      </label>
      <input
        type="range"
        id={forInput}
        name={nameInput}
        value={price}
        onChange={handlePrice}
        min="0"
        max={type == '$' ? 500000 : 100}
      />
    </div>
  )
}
