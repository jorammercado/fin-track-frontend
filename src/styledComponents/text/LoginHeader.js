import styled from 'styled-components'

export const LoginHeader = styled.h2`
  width: 277px;
  height: 30px;
  font-size: 25px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 55px;
  color: #f2f2f2;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 22px;
    margin-bottom: 40px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }

  @media  (max-width: 360px) {
    font-size: 20px;
  }

  @media  (max-width: 260px) {
    font-size: 12px;
  }
`