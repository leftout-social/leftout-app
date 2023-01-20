import { useState } from 'react';
import styled from 'styled-components';
import { Button, Loading, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import {login, signup} from "~/services/auth-service";

const LoginForm = () => {
	const router = useRouter();
	const [formState, setFormState] = useState({ email: '', password: '' });
	// const globalData = useContext(InitalDataContext);
	const [loginState, setLoginState] = useState<'LOGIN' | 'SIGN_UP'>('LOGIN');
	const [loading, setLoading] = useState<boolean>(false);
	const onSubmit = async () => {
		setLoading(true);
		if(loginState === 'LOGIN') {
			try {
				const response = await login(formState)
				localStorage.setItem('leftout-login', response.jwt_token);
				localStorage.setItem('leftout-id', response.user_id)
				if(response.user_data.length === 1) return await router.push('/')
				await router.push(`/onboarding?id=${response.user_id}`);
			}
			catch (e){
				console.error(e)
			}
		}
		else {
			try {
				const response = await signup(formState)
				console.log(response)
			}
			catch (e){
				console.error(e)
			}
		}
		// try {
		// 	const response = await axios.post('/api/login', {
		// 		email: formState.email,
		// 		password: formState.password,
		// 		state: loginState,
		// 	});
		// 	if (response.data.state === 'SIGN_UP') {
		// 		globalData.toast.toastHandler({
		// 			type: 'info',
		// 			message: 'verification has been sent your email, please verify it',
		// 			open: true,
		// 		});
		// 	} else {
		// 		localStorage.setItem('user', JSON.stringify(response.data.data.user));
		// 		const userData = await axios.get(
		// 			`/api/get-user?id=${response.data.data.user.id}`
		// 		);
		// 		console.log(userData);
		// 		if (userData?.data.length > 0) {
		// 			router.push('/');
		// 		} else router.push('/onboarding');
		// 		router.push('/');
		// 	}
		// 	console.log(response.data.data.user);
		// } catch (error: any) {
		// 	console.log(error);
		// 	// @ts-ignore
		// 	globalData.toast.toastHandler({
		// 		type: 'error',
		// 		message: error.response.data.error.message || '',
		// 		open: true,
		// 	});
		setLoading(false);
	};
	const disabled = formState.email.length < 5 || formState.password.length < 6;
	return (
		<ParentContainer>
			<Input
				value={formState.email}
				placeholder='email'
				onChange={(event) =>
					setFormState({ ...formState, email: event.target.value })
				}
				className='input'
				size='lg'
			/>
			<Input
				value={formState.password}
				placeholder='password'
				onChange={(event) =>
					setFormState({ ...formState, password: event.target.value })
				}
				className='input'
			/>
			{!loading && (
				<Button onClick={onSubmit} className='button' disabled={disabled}>
					{loginState === 'LOGIN' ? 'Login' : 'Sign up'}
				</Button>
			)}
			{loading && <Loading />}
			{loginState === 'LOGIN' && (
				<StateWording>
					New user?{' '}
					<span onClick={() => setLoginState('SIGN_UP')}> Sign up</span>
				</StateWording>
			)}
			{loginState === 'SIGN_UP' && (
				<StateWording>
					Existing user?{' '}
					<span onClick={() => setLoginState('LOGIN')}> Login</span>
				</StateWording>
			)}
		</ParentContainer>
	);
};
export default LoginForm;

const ParentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	gap: 1rem;
	.input {
		height: 60px;
		font-size: 20px;
		font-weight: bold;
		padding: 6px;
	}
	.button {
		background: #42c2ff;
	}
	.progress {
		color: #42c2ff;
	}
`;
const StateWording = styled.div`
	display: flex;
	gap: 5px;
	span {
		text-decoration: underline;
		cursor: pointer;
	}
`;
