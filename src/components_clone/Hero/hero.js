import React, { useEffect, useState } from 'react'
import * as styles from './hero.module.css'
import { capitalize } from '../../utils/funcs/capitalizeString'
import Button from '../../utils/components/Button/button'
import axios from 'axios'

export default function Hero({ navbar }) {
  const [heroContents, setHeroCotents] = useState({})

  useEffect(() => {
    const response = async () => {
      try {
        const data = await axios.post(
          'https://graphql.contentful.com/content/v1/spaces/w91en02h7ign/environments/master',
          {
            query:
              'query heroEntryQuery {\n  hero(id: "4faCM0ntELAr558JQdNgOi") {\n  content\n    # add the fields you want to query\n  }\n}',
          },
          {
            headers: {
              'Accept-Encoding': 'gzip, deflate, br',
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Connection: 'keep-alive',
              DNT: '1',
              Origin:
                'https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net',
              Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            },
          }
        )
        return data
      } catch (err) {
        console.log(err)
      }
    }

    response()
      .then((res) => {
        setHeroCotents(res?.data?.data?.hero?.content)
      })
      .catch((err) => {
      console.log(err);
      })
  }, [])

  return (
    <div className={`${styles.hero}`}>
      <div className="navbar">{navbar}</div>
      <section className={`${styles.item1}`}>
        <h1 className={styles.title}>{capitalize(heroContents.title)}</h1>
        <h4 className={styles.description}>{heroContents.description}</h4>
        <Button text="learn more" />
      </section>
      <section className={styles.background}></section>
    </div>
  )
}
