import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { breakpoint, color } from '~/styles/theme'
import { navLists } from '~/constants'

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
  color: ${color.white};
  background: ${color.black};
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;

  ${breakpoint.xl} {
    font-size: 20px;
    padding: 10px;
  }
`

export default function NavLists() {
  return (
    <Wrapper>
      {navLists.map((list, index) => {
        return (
          <Link key={index} href={list.href} scroll={false}>
            <Item>{list.title}</Item>
          </Link>
        )
      })}
    </Wrapper>
  )
}
