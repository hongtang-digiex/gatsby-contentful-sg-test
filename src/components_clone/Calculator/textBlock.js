import React from 'react'
import Button from '../../utils/components/Button/button'
import * as styles from './calculator.module.css'

export default function TextBlock() {
  return (
    <div
      style={{ backgroundColor: 'transparent' }}
      className={`${styles.container} ${styles.center}`}
    >
      <h1 className={styles.textBlockTitle}>Try our awesome Calculator</h1>
      <p className={styles.textBlockDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec
        sagittis lacus. Donec fermentum nisl metus
      </p>
      <Button text="register" />
    </div>
  )
}
