import styled from 'styled-components'

export const AddTransactionButton = styled.button`  
    width: 110px;
    height: 27px;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Roboto-Thin';
    color: white;
    cursor: pointer;
    margin-left: 1px;
    margin-right: 1px;
    padding: 0px;
    background-color: #07a;
    border: 1px solid #07a;
    transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
    }

    @media (max-width: 570px) {
        font-size: 11px;
    }

    @media (max-width: 485px) {
        width: 90px;
        font-size: 10px;
    }

    @media (max-width: 445px) {
        height: 20px;
        width: 85px;
        font-size: 9px;
        padding-bottom: 0px;
      
    }
`