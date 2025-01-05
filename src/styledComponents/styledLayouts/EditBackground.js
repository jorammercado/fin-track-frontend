import styled from 'styled-components'

export const EditBackground = styled.div`
  position: absolute;
  width: 315px;
  height: 390px;
  top: 51.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #09213A;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  border-radius: 5px;
  padding: 0 0 40px 0;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: 75%;
    padding-bottom: 45px;
    box-shadow: none;
  }

  @media screen and (max-width: 400px) {
    width: 80%;
  }
`