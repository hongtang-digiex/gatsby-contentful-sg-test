import React, { useState } from 'react'
import * as styles from './navigation.module.css'

import UserTitle from '../../utils/components/UserTitle/userTitle'

import useWindowSize from '../../custom-hooks/useWindow'

import { GiHamburgerMenu } from 'react-icons/gi'
export default function Navigation() {
  const linkDetails = [
    {
      title: 'calculator',
    },
    {
      title: 'services',
    },
  ]

  // set activated navigation link
  const [linkActivated, setLinkActivated] = useState(0)

  // useWindowSize hook to get window page width and height
  const { width } = useWindowSize()

  // create hook for opening or closing the menu navaigation
  const [isOpen, setOpen] = useState(false)

  const addClassLinks = (index) => {
    return index === linkActivated ? styles.activeNavLink : styles.navLink
  }

  const handleActiveLinks = (index) => {
    setLinkActivated(index)
  }

  return (
    <>
      <header>
        <nav className={styles.navFlex}>
          <div className="item-1">
            <UserTitle
              classValue={{
                color: 'white',
                background: '#ff783a',
              }}
              descColor={{
                color: 'white',
              }}
              nameLetter="K"
              fullName="Kinka"
              title="Finance"
            />
          </div>

          {width >= 768 ? (
            <div className="item-2">
              {linkDetails.map((link, index) => (
                <a
                  key={index}
                  onClick={() => handleActiveLinks(index)}
                  className={`${styles.link} ${addClassLinks(index)}`}
                >
                  {link.title}
                </a>
              ))}
            </div>
          ) : (
            <div className={styles['mobileItem2']}>
              <button
                className={styles.menuButton}
                onClick={() => setOpen((prev) => !prev)}
              >
                <GiHamburgerMenu />
              </button>
              {isOpen ? (
                <ul className={styles.lists}>
                  {linkDetails.map((link, index) => (
                    <li>
                      <a
                        key={index}
                        onClick={() => handleActiveLinks(index)}
                        className={`${styles.link} ${addClassLinks(index)}`}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
