import styled from 'styled-components'


export const SignUpBackground = styled.div`
    position: absolute;
    width: 315px;
    height: 460px;
    top: 51.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #09213A;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    border-radius: 5px;
    padding: 0 0 40px 0;
    box-sizing: border-box;

    @media screen and (max-width: 480px) {
        position: fixed;
        width: 65%;
        height: 60%;
        padding-bottom: 45px;
        box-shadow: none;
    }

    @media screen and (max-width: 400px) {
        width: 80%;
    }
`


export const LoginBackground = styled.form`
  position: absolute;
  width: 315px;
  height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #09213A;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding: 0 0 77px 0;
  box-sizing: border-box;

  @media  (max-width: 480px) {
    height: 335px;
  }

  @media  (max-width: 350px) {
    height: 320px;
    width: 95%;
    overflow: hidden;
  }
`

export const VerifyOPTBackground = styled.form`
  position: absolute;
  width: 315px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #09213A;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding: 0 0 77px 0;
  box-sizing: border-box;

  @media  (max-width: 480px) {
    height: 335px;
  }

  @media  (max-width: 350px) {
    height: 320px;
    width: 95%;
    overflow: hidden;
  }
`

export const VerifyOTPHeader = styled.h2`
  width: 277px;
  height: 30px;
  font-size: 25px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 45px;
  color: #f2f2f2;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 22px;
    margin-bottom: 40px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }

  @media  (max-width: 360px) {
    font-size: 20px;
  }

  @media  (max-width: 260px) {
    font-size: 12px;
  }
`

export const LoginLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoginHeader = styled.h2`
  width: 277px;
  height: 30px;
  font-size: 25px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 55px;
  color: #f2f2f2;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 22px;
    margin-bottom: 40px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }

  @media  (max-width: 360px) {
    font-size: 20px;
  }

  @media  (max-width: 260px) {
    font-size: 12px;
  }
`

export const BigErrorList = styled.ul`
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

export const ProfileMain = styled.div`
    width: 100%;
    height:100%;
    margin-top: 110px;
    box-sizing: border-box;

    @media (max-width: 150px) {
        min-width: 135px;
    }
`

export const EditTransactionBackground = styled.div`
    position: absolute;
    width: 345px;
    height: 555px;
    top: 52.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #09213A;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    font-family: "Roboto-Thin";
    color: white;

    border-radius: 5px;
    padding: 0 0 40px 0;
    box-sizing: border-box;

    @media screen and (max-width: 480px) {
        position: fixed;
        width: 65%;
        height: 60%;
        padding-bottom: 45px;
        box-shadow: none;
    }

    @media screen and (max-width: 400px) {
        width: 80%;
    }
`

export const EditBackground = styled.div`
  position: absolute;
  width: 315px;
  height: 390px;
  top: 51.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #09213A;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  border-radius: 5px;
  padding: 0 0 40px 0;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: 75%;
    padding-bottom: 45px;
    box-shadow: none;
  }

  @media screen and (max-width: 400px) {
    width: 80%;
  }
`

export const PasswordUpdateBackground = styled.div`
    position: absolute;
    width: 315px;
    height: 350px;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #09213A;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    
    border-radius: 5px;
    padding: 0 0 77px 0;
    box-sizing: border-box;

    @media screen and (max-width: 480px) {
        position: fixed;
        width: 90%;
        height: 65%;
        padding-bottom: 45px;
        box-shadow: none;
    }

    @media screen and (max-width: 400px) {
        width: 80%;
    }
`

export const AddTransactionBackground = styled.div`
    position: absolute;
    width: 345px;
    height: 530px;
    top: 52.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #09213A;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    font-family: "Roboto-Thin";
    color: white;

    border-radius: 5px;
    padding: 0 0 40px 0;
    box-sizing: border-box;

    @media screen and (max-width: 480px) {
        position: fixed;
        width: 65%;
        height: 60%;
        padding-bottom: 45px;
        box-shadow: none;
    }

    @media screen and (max-width: 400px) {
        width: 80%;
    }
`