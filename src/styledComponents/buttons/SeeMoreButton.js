import styled from 'styled-components'

export const SeeMoreButton = styled.button`  
    width: 110px;
    height: 28px;
    border-radius: 4px;
    font-size: 16px;
    font-family: 'Roboto-Thin';
    color: white;
    cursor: pointer;
    background-color: #07a;
    border: 1px solid #07a;
    transition: background-color 0.35s ease-in-out, 
                box-shadow 0.35s ease-in-out, 
                font-family 0.25s ease-in-out;

    &:hover {
        font-family: 'Roboto-Regular';
        background-color: #09213A;
        box-shadow:
                    rgba(0, 0, 0, 0.5) 0px 80px 80px -20px,
                    rgba(0, 0, 0, 0.3) 0px -20px 50px -10px,
                    rgba(0, 0, 0, 0.4) 0px 10px 20px -5px,
                    rgba(0, 0, 0, 0.35) 0px 30px 35px -5px,
                    rgba(0, 0, 0, 0.45) 0px -10px 25px -5px,
                    rgba(0, 0, 0, 0.5) 0px 100px 100px -30px,
                    rgba(0, 0, 0, 0.6) 0px 120px 120px -40px;
    }

    @media (max-width: 485px) {
        font-size: 13px;
    }

    @media (max-width: 445px) {
        font-size: 10px;
    }

    @media (max-width: 375px) {
        font-size: 9px;
    }
`