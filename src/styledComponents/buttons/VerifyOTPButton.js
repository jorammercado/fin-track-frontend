import styled from 'styled-components'

export const VerifyOTPButton = styled.button`
    width: 150px;
    height: 35px;
    background: #07a;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    margin-top: 25px;
    margin-bottom: -25px;
    transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
        border: 1px solid #07a;
    }

    @media  (max-width: 360px) {
        width: 225px;
    }

    @media  (max-width: 260px) {
        width: 140px;
    }
`