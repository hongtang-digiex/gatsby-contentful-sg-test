import React from 'react'
import FooterLink from './footerLink'
import UserTitle from '../../utils/components/UserTitle/userTitle'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

import * as styles from './footer.module.css'
export default function Footer() {
  const contact = [
    {
      topic: 'location',
      links: ['america', 'asia', 'europe', 'africa'],
    },
    {
      topic: 'contact',
      links: ['about me', 'teams', 'profile', 'FAQ'],
    },
    {
      topic: 'legals',
      links: ['privacy', 'disclaimer', 'terms', 'company'],
    },
  ]

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.item1}>
        <UserTitle
      
          classValue={{
            color: 'white',
            background: 'black',
          }}
          desColor={{ fontWeight: 'bold' }}
          nameLetter="K"
          fullName="Kinka"
          title="Finance"
        />
        <p className={styles.description}>
          2021 Award winning Finance Advisor and Lorem ipsum dolor sit amet
        </p>
        <div className={styles.iconsSize}>
          <div className={styles.icon}>
            <FaFacebookF />
          </div>
          <div className={styles.icon}>
            <FaTwitter />
          </div>
          <div className={styles.icon}>
            <FaInstagram />
          </div>
        </div>
      </div>
      <div className={styles.item2}>
        {contact.map((content, index) => (
          <FooterLink
            key={index}
            contactTopic={content.topic}
            links={content.links}
          />
        ))}
      </div>
    </footer>
  )
}
