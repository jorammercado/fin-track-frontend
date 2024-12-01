import styled from 'styled-components'

export const HomeButton = styled.button`  
  width: 190px;
  height: 50px;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  color: white;
  cursor: pointer;
  background-color: #07a;
  transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
        border: 1px solid #07a;
    }
  

  @media (max-width: 570px) {
    height: 40px;
    width: 150px;
    font-size: 16px;
  }

  @media (max-width: 485px) {
    height: 35px;
    width: 105px;
    font-size: 13px;
    line-height: 15px;
  }

  @media (max-width: 445px) {
    height: 30px;
    width: 95px;
    font-size: 11px;
    line-height: 15px;
  }
`

export const FourOFourButton = styled.button`  
  width: 190px;
  height: 50px;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  color: white;
  cursor: pointer;
  background-color: #07a;
  transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #4399c8;
        border: 1px solid #07a;
    }
  

  @media (max-width: 570px) {
    height: 40px;
    width: 150px;
    font-size: 16px;
  }

  @media (max-width: 485px) {
    height: 35px;
    width: 105px;
    font-size: 13px;
    line-height: 15px;
  }

  @media (max-width: 445px) {
    height: 30px;
    width: 95px;
    font-size: 11px;
    line-height: 15px;
  }
`

export const SignUpBackground = styled.div`
    position: absolute;
    width: 315px;
    height: 460px;
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
        width: 65%;
        height: 60%;
        padding-bottom: 45px;
        box-shadow: none;
    }

    @media screen and (max-width: 400px) {
        width: 80%;
    }
`

export const SignUpButton = styled.button`  
    width: 150px;
    height: 45px;
    background: #07a;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 17px;
    line-height: 23px;
    cursor: pointer;
    margin-top: 25px;
    transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
        border: 1px solid #07a;
    }

    @media screen and (max-width: 350px) {
        width: 75%;
    }
`