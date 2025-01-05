import styled from 'styled-components'

export const TransactionsButtonDisabled = styled.button`  
    width: 90px;
    height: 25px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Roboto-Thin';
    color: white;
    cursor: default !important; 
    margin-left: 1px;
    margin-right: 1px;
    padding: 0px;
    background-color: #09213A;
    border: 1px solid #07a;
    transition: background-color 0.45s ease-in-out;



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