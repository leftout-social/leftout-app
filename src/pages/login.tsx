import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import {useRouter} from 'next/router';
import LoginForm from '~/modules/login/components/LoginForm';
import InitalDataContext from '~/context/initial-data-context';

const Login = () => {
	const router = useRouter();
	const { userData } = useContext(InitalDataContext);

	useEffect(() => {
		if (userData.first_name) router.push('/');
	}, []);

	return (
		<Parent>
			<LoginImage />
			<LoginContainer>
				<LoginForm />
			</LoginContainer>
		</Parent>
	);
};
export default Login;

const Parent = styled.div`
	height: 100%;
	width: 100%;
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
const LoginImage = styled.div`
	height: 320px;
	width: 100%;
	background: url('/images/cover-onboarding-1.jpg');
	background-size: 100% 100%;
	
`;
const LoginContainer = styled.div`
	width: 100%;
	background: #FFFFFF;
	border-radius: 28px 28px 0 0;
	position: relative;
	top: -1.5rem;
	display: flex;
	padding: 40px 30px;
`;
