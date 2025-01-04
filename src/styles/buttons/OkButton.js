import styled from 'styled-components'

export const OkButton = styled.button`
    width: 150px;
    margin-bottom: -5px;
    height: 35px;
    background: #07a;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    line-height: 23px;
    color: #FFFFFF;
    cursor: pointer;
    transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
        border: 1px solid #07a;
    }

    @media screen and (max-width: 480px) {
        margin-bottom: -25px;
    }

    @media  (max-width: 360px) {
        width: 225px;
    }

    @media screen and (max-width: 260px) {
        width: 140px;
    }
`