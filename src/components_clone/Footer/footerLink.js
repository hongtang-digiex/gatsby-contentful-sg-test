import React from 'react'
import { capitalize } from '../../utils/funcs/capitalizeString'

export default function FooterLink({ contactTopic, links }) {
  return (
    <div>
      <h4>{capitalize(contactTopic)}</h4>
      {links.map((link, index) => (
        <a key={index} href="/" style={{ display: 'block' }}>
          <small>{link}</small>
        </a>
      ))}
    </div>
  )
}
