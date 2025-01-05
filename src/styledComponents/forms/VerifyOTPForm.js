import styled from 'styled-components'

export const VerifyOPTForm = styled.form`
  position: absolute;
  width: 315px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #09213A;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding: 0 0 77px 0;
  box-sizing: border-box;

  @media  (max-width: 480px) {
    height: 335px;
  }

  @media  (max-width: 350px) {
    height: 320px;
    width: 95%;
    overflow: hidden;
  }
`