import {useContext, useState} from 'react';
import styled from 'styled-components';
import { Button, Loading, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import {forgotPasswordWithEmail, login, signup} from "~/services/auth-service";
import InitalDataContext from "~/context/initial-data-context";
import {BottomDrawer} from "~/components/BottomDrawer";
import ClearIcon from '@mui/icons-material/Clear';
import Cookies from 'js-cookie';

const LoginForm = () => {
	const router = useRouter();
	const [formState, setFormState] = useState({ email: '', password: '' });
	const {toast} = useContext(InitalDataContext);
	const [loginState, setLoginState] = useState<'LOGIN' | 'SIGN_UP'>('LOGIN');
	const [loading, setLoading] = useState<boolean>(false);
	const [forgotDrawer, setForgotDrawer] = useState<boolean>(false);
	const [forgotLoading,setForgotLoading] = useState<boolean>(false)
	const onSubmit = async () => {
		setLoading(true);
		if(loginState === 'LOGIN') {
			try {
				const response = await login(formState)
                await Cookies.set('leftout-login', response.jwt_token);
				await localStorage.setItem('leftout-login', response.jwt_token);
				await localStorage.setItem('leftout-id', response.user_id)
				if(response.user_data.length === 1) return window.location.href = '/'
				await router.push(`/onboarding?id=${response.user_id}`);
			}
			catch (e){
				console.error(e)
				// @ts-ignore
				toast.toastHandler({type: 'error', message: e.message || 'Something went wrong', open: true})
			}
		}
		else {
			try {
				await signup(formState)
				toast.toastHandler({type: 'info', message: 'successfully signed up, now you can login', open: true})
				setLoginState('LOGIN');
			}
			catch (e){
				console.error(e)
				// @ts-ignore
				toast.toastHandler({type: 'error', message: e.message || 'Something went wrong', open: true})
			}
		}
		setLoading(false);
	};
	const disabled = formState.email.length < 5 || formState.password.length < 6;
	const onForgotClicked = () => setForgotDrawer(true);
	const forgotDisabled = formState.email.length < 5;
	const forgotPassword = async() => {
		setForgotLoading(true)
		try {
			await forgotPasswordWithEmail(formState.email);
			setForgotDrawer(false);
			setFormState({email: '', password: ''})
			toast.toastHandler({type: 'info', message: 'reset link sent to your email', open: true})
		}
		catch (error){
			// @ts-ignore
			toast.toastHandler({type: 'error', message: e.message || 'Something went wrong', open: true})
		}
		setForgotLoading(false)
	}

	return (
		<ParentContainer blur={forgotDrawer}>
			<Input
				value={formState.email}
				placeholder='email'
				onChange={(event) =>
					setFormState({ ...formState, email: event.target.value })
				}
				className='input'
				size='lg'
				type="email"
			/>
			<Input
				value={formState.password}
				placeholder='password'
				onChange={(event) =>
					setFormState({ ...formState, password: event.target.value })
				}
				className='input'
				type='password'
			/>
			<br />
			<span className='forgot' onClick={onForgotClicked}>FORGOT PASSWORD</span>
			<br />
			{!loading && (
				<Button onClick={onSubmit} className='button' disabled={disabled} >
					{loginState === 'LOGIN' ? 'LOGIN' : 'SIGN UP'}
				</Button>
			)}
			{loading && <Loading />}
			<br />
			{loginState === 'LOGIN' && (
				<StateWording>
					Don't have an account?
					<span onClick={() => setLoginState('SIGN_UP')}> SIGN UP</span>
				</StateWording>
			)}
			{loginState === 'SIGN_UP' && (
				<StateWording>
					Already have an account?
					<span onClick={() => setLoginState('LOGIN')}> LOGIN</span>
				</StateWording>
			)}
			<BottomDrawer id='forgot-drawer' open={forgotDrawer}>
				<DrawerParent>
					<ClearIcon className='close-icon' onClick={() => {
						setForgotDrawer(false);
						setFormState({email: '', password: ''});
					}}/>
					<Input
						value={formState.email}
						placeholder='email'
						onChange={(event) =>
							setFormState({ ...formState, email: event.target.value })
						}
						className='input'
						size='lg'
					/>
					{!forgotLoading && <Button onClick={forgotPassword} className='button' disabled={forgotDisabled}>
						SUBMIT
					</Button>}
					{forgotLoading && <Loading />}
				</DrawerParent>
			</BottomDrawer>
		</ParentContainer>
	);
};
export default LoginForm;

const ParentContainer = styled.div<{blur: boolean}>`
	height: 100%;
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	gap: 1rem;
	filter: ${(props) => props.blur && 'blur(10px)'};
	.input {
		height: 60px;
		font-size: 20px;
		font-weight: bold;
		padding: 6px;
	}
	.button {
		height: 52px;
		background: linear-gradient(270.95deg, #888BF4 0%, #5151C6 100%);
		border-radius: 30px;
		color: #FFFFFF;
	}
	.progress {
		color: #42c2ff;
	}
	.forgot {
		font-family: 'Circular Std',serif;
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 120%;
		text-align: center;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: #5252C7;
		cursor: pointer;

	}

`;
const StateWording = styled.div`
	display: flex;
	gap: 5px;
	font-family: 'Circular Std';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 150%;
	justify-content: center;
	letter-spacing: -0.2px;
	color: #606060;
	span {
		cursor: pointer;
		color: #5252C7;
	}
`;
const DrawerParent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
	position: relative;
  height: 50%;
	.close-icon {
		position: absolute;
		right: 2rem;
		top: 0;
		cursor: pointer;
	}
  .input {
    height: 60px;
    font-size: 18px;
  }
  
`;