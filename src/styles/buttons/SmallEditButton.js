import styled from 'styled-components'

export const SmallEditButton = styled.button`  
    width: 88px;
    height: 40px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    cursor: pointer;
    background-color: #07a;
    font-family: 'Roboto-Thin';
    margin-right: 6px;
    margin-left: 6px;
    transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
        border: 1px solid #07a;
    }

    @media screen and (max-width: 350px) {
        width: 75%;
    }
`