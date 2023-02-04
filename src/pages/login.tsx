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
			<br />
			<div className='company-promotion'>
				<span>Made with &#128156; in India</span>
			</div>
		</Parent>
	);
};
export default Login;

const Parent = styled.div`
	height: 100%;
	width: 100%;
	.company-promotion {
		display: flex;
		justify-content: center;
		span {
			font-family: 'Circular Std', serif;
			font-style: normal;
			font-weight: 400;
			font-size: 14px;
			line-height: 120%;
			text-align: center;
			letter-spacing: 2px;
			text-transform: uppercase;
			color: #000000;
		}
	}
`;
const LoginImage = styled.div`
	height: 320px;
	width: 100%;
	background: url('/leftout-cover-mobile.webp');
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
