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