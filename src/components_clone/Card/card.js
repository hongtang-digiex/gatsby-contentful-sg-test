import React from 'react'
import * as styles from './card.module.css'

export default function CardBlock({ iconComponent, title, desc }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{iconComponent}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{desc}</p>
    </div>
  )
}
