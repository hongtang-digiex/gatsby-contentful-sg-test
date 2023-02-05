import React, { useEffect, useState } from 'react'
import * as styles from './userTitle.module.css'
import axios from 'axios'

export default function UserTitle({
  descColor = {
    color: 'black',
  },
  nameLetter,
  fullName,
  title,
  classValue,
}) {
  const [info, setInfo] = useState({})
  useEffect(() => {
    const response = async () => {
      try {
        const data = await axios.post(
          'https://graphql.contentful.com/content/v1/spaces/w91en02h7ign/environments/master',
          {
            query:
              'query userEntryQuery {\n  user(id: "1GvfdRrynaIWG5ZQuW6ZfS") {\n   info\n    # add the fields you want to query\n  }\n}',
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
              Authorization:
                'Bearer 6QEnqWjjPTZmd5KcyYAWZtoFUtZddk_X7xvZ49JA3Zc',
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
        setInfo(res.data.data.user.info)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className={styles.flex}>
      <div className={styles.userAvatar} style={classValue}>
        <span>{info.name?.toString()[0]}</span>
      </div>
      <div className={styles.details} style={descColor}>
        <p className="username">{info.name}</p>
        <p className="position">{info.position}</p>
      </div>
    </div>
  )
}
