import styled from 'styled-components'

export const SignUpButton = styled.button`  
    width: 150px;
    height: 45px;
    background: #07a;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
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