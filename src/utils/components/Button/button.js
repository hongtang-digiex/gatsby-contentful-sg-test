import React from 'react'
import * as styles from './button.module.css'
import { capitalize } from '../../funcs/capitalizeString'

export default function Button({ text }) {
  return (
    <div>
      <button className={styles.button}>{capitalize(text)}</button>
    </div>
  )
}
