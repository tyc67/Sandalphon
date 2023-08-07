import styled from 'styled-components'
import { imagePrefix } from '../../config'
const Link = styled.a`
  background-color: black;
  width: fit-content;
  height: 32px;
  padding: 9px 12px 9px 13.33px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  border-radius: 32px;
  color: white;
  :hover {
    background: rgba(0, 0, 0, 0.87);
    transition: background 0.3s ease;
  }
  margin-right: 8px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`
export default function DonateLink({ className = '' }) {
  return (
    <Link
      className={className}
      href="https://www.mirrormedia.mg/donate"
      target="_blank"
    >
      <img src={`${imagePrefix}/icon/donate.png`} alt="donate" />
      <span>贊助本文</span>
    </Link>
  )
}
