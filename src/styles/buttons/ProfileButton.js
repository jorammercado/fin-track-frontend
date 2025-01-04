import styled from 'styled-components'

export const ProfileButton = styled.button`  
    width: 120px;
    height: 35px;
    border: none;
    border-radius: 5px;
    font-size: 13px;
    color: white;
    cursor: pointer;
    margin-left: 1px;
    margin-right: 1px;
    background-color: #07a;
    transition: background-color 0.45s ease-in-out;

    &:hover {
        background-color: #36B5E133;
        border: 1px solid #07a;
    }

    @media (max-width: 570px) {
        font-size: 12px;
    }

    @media (max-width: 485px) {
        width: 105px;
        font-size: 11px;
    }

    @media (max-width: 445px) {
        height: 35px;
        width: 95px;
        font-size: 10px;
        padding-bottom: 0px;
      
    }
`