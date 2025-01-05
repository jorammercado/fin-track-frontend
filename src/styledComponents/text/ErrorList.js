import styled from 'styled-components'

export const ErrorList = styled.ul`
    font-style: normal;
    font-size: 15px;
    line-height: 15px;
    text-align: center;
    color: #f2f2f2;
    width:300px;
    margin-bottom: 50px;

    @media screen and (max-width: 480px) {
        width: 250px;
        font-size: 14px;
    }
    @media screen and (max-width: 300px) {
        width: 220px;
        font-size: 13px;
    }
`