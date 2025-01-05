import styled from 'styled-components'

export const FormInput = styled.input`
  width: 290px;
  height: 40px;
  background: #F8F5F5;
  border-radius: 3px;
  border: none;
  margin-bottom: 3px;
  font-size: 1.1rem;
  padding-left: 10px;

  &:focus{
    outline: none;
  }

  &::placeholder{
    color: black;
    font-family: 'Roboto-Thin';
  }

  @media  (max-width: 360px) {
    width: 225px;
  }

  @media  (max-width: 260px) {
    width: 140px;
  }
`