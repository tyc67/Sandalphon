import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { breakpoint } from '~/styles/theme'

const Wrapper = styled.div`
  display: none;

  ${breakpoint.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-right: 25px;
  }

  ${breakpoint.xl} {
    gap: 10px;
    margin-right: 30px;
  }
`

const Item = styled.li`
  font-family: 'Noto Serif TC', serif;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  list-style: none;
  color: #ffffff;
  background: #000000;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;

  ${breakpoint.xl} {
    font-size: 20px;
    padding: 10px;
  }
`

export default function NavLists() {
  const navLists = [
    { title: '論壇簡介', href: 'introduction' },
    { title: '活動影音', href: 'video' },
    { title: '與會陣容', href: 'speakers' },
    { title: '論壇議程', href: 'schedule' },
    { title: '相關報導', href: 'related-post' },
    { title: '報名資訊', href: 'registration' },
    { title: '共同推動', href: 'partners' },
  ]

  return (
    <Wrapper>
      {navLists.map((list, index) => {
        return (
          <Link key={index} href={`/#${list.href}`} scroll={false}>
            <Item>{list.title}</Item>
          </Link>
        )
      })}
    </Wrapper>
  )
}
