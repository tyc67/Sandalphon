import styled from 'styled-components'

/**
 * @typedef {import('~/type/theme').Theme} Theme
 */

const Hamburger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  user-select: none;
  display: block;

  &:focus {
    border: none;
    outline: none;
  }
  .hamburger {
    display: block;
    width: 20px;
    height: 2px;
    margin: 2px auto;
    border-radius: 12px;
    background-color: ${
      /**
       * @param {Object} param
       * @param {Theme} [param.theme]
       * @param {string} [param.color]
       */
      ({ theme, color }) =>
        theme.color.brandColor[color] ? theme.color.brandColor[color] : color
    };

    ${({ theme }) => theme.breakpoint.xl} {
      display: none;
    }
  }
`

export default function HamburgerButton({
  color = '#000000',
  handleOnClick = () => {},
}) {
  return (
    <Hamburger aria-label="side-bar" color={color} onClick={handleOnClick}>
      <i className="hamburger"></i>
      <i className="hamburger"></i>
      <i className="hamburger"></i>
    </Hamburger>
  )
}
