import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { LottieAnimation } from '~/components/LottieAnimation';

const OnboardingForm = dynamic(
	() => import('../../modules/onboarding/components/OnboardingForm'),
	{ ssr: false }
);
const Onboarding = () => {
	return (
		<Container>
			<img
				src='/images/top-onboarding.jpg'
				width='100%'
				height={200}
				className='image-container'
			/>
			<FormContainer>
				<OnboardingForm />
			</FormContainer>
			<LottieContainer>
				<LottieAnimation
					animationJson='https://assets9.lottiefiles.com/packages/lf20_TOdpiB.json'
					height={200}
					width='100%'
				/>
			</LottieContainer>
		</Container>
	);
};
export default Onboarding;

const Container = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	//   background-image: url("/images/cover-onboarding-1.jpg");
`;

const FormContainer = styled.div`
	border-radius: 1rem;
	width: 80%;
	max-width: 700px;
	//height: 400px;
	position: absolute;
	margin-top: 60px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #ffffff;
`;

const LottieContainer = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
`;
