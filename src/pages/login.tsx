import styled from "styled-components";
import LoginForm from "~/modules/login/components/LoginForm";

const Login = () => {
    return (
        <Parent>
            <LoginContainer>
                <LoginForm/>
            </LoginContainer>
        </Parent>
    );
}
export default Login

const Parent = styled.div`
  height: 100%;
  width: 100%;
  background: #42C2FF;
  position: relative;
  background: url("/images/cover-login.jpg");
  background-size: 100% 100%;
  //.title {
  //  position: absolute;
  //  top: 50%;
  //  left: 50%;
  //  transform: translate(-50%, -50%);
  //  span {
  //    @media (min-width: 500px) {
  //      font-size: 200px;
  //    }
  //    @media (max-width: 499px){
  //      font-size: 50px;
  //    }
  //  }
  //}
`;
const LoginContainer = styled.div`
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 700px;
  padding: 2rem;
  box-shadow: #42C2FF 0px 2px 8px 0px;
  background: #ffffff;
  border-radius: 1rem;

`;