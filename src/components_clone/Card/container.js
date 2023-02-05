import React from 'react'
import CardBlock from './card'
import { BsPatchCheckFill } from 'react-icons/bs'

import * as styles from './card.module.css'

export default function container() {
  const title = ['advisor', 'agency', 'management']
  return (
    <div className={styles.topic}>
      <div className="topic">
        <h1 className={styles['topicText']}>
          {`
            High quality output,
            Awesome services
            `}
        </h1>
      </div>
      <div className={styles.cardsContainer}>
        {title.map((t, index) => (
          <CardBlock
            key={index}
            iconComponent={<BsPatchCheckFill />}
            title={t}
            desc="bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla "
          />
        ))}
      </div>
    </div>
  )
}
