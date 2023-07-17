import styled from 'styled-components'

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  background-color: #000;
  height: 32px;
  padding: 9px 12px 9px 13.33px;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  border-radius: 32px;
  border: 1px solid #fff;
`

const Icon = styled.img`
  max-width: 100%;
  height: 100%;
`

const Text = styled.span`
  margin-left: 5.33px;
  color: #fff;
`

export default function DonateButton() {
  return (
    <Wrapper target="_blank" href="https://www.mirrormedia.mg/donate/">
      <Icon src="images/money.png" />
      <Text>贊助本文</Text>
    </Wrapper>
  )
}
