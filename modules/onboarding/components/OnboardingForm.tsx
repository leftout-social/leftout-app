import styled from 'styled-components';
import { Fragment, useContext, useState } from 'react';
import { Input } from '@nextui-org/react';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { dynamicTitle } from '~/modules/onboarding/util';
import InitalDataContext from '~/context/initial-data-context';
import { useRouter } from 'next/router';
import { onboard } from '~/services/auth-service';
import Loader from '~/components/Loader';

const OnboardingForm = () => {
	const router = useRouter();
	const { toast } = useContext(InitalDataContext);
	const { id } = router.query;
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		gender: '',
		age: '',
		currentCity: '',
	});
	const [step, setStep] = useState(1);
	const onNextStep = async () => {
		setStep(step + 1);
		if (step == 2) {
			try {
				await onboard(formState, id);
				await router.push('/');
			} catch (e) {
				// @ts-ignore
				toast.toastHandler({
					type: 'error',
					message: 'something went wrong :(',
					open: true,
				});
			}
		}
	};
	const onboardingFormJSON = [
		{
			id: 1,
			step: 1,
			component: () => (
				<Input
					value={formState.firstName}
					status='secondary'
					onChange={(event) =>
						setFormState({ ...formState, firstName: event.target.value })
					}
					label='First Name'
				/>
			),
		},
		{
			id: 2,
			step: 1,
			component: () => (
				<Input
					value={formState.lastName}
					status='secondary'
					onChange={(event) =>
						setFormState({ ...formState, lastName: event.target.value })
					}
					label='Last Name'
				/>
			),
		},
		{
			id: 3,
			step: 2,
			component: () => (
				<Input
					value={formState.gender}
					status='secondary'
					onChange={(event) =>
						setFormState({ ...formState, gender: event.target.value })
					}
					label='Gender'
				/>
			),
		},
		{
			id: 4,
			step: 2,
			component: () => (
				<Input
					value={formState.age}
					status='secondary'
					onChange={(event) =>
						setFormState({ ...formState, age: event.target.value })
					}
					label='Age'
				/>
			),
		},
		{
			id: 5,
			step: 2,
			component: () => (
				<Input
					value={formState.currentCity}
					status='secondary'
					onChange={(event) =>
						setFormState({ ...formState, currentCity: event.target.value })
					}
					label='Current City'
				/>
			),
		},
	];
	return (
		<>
			{step === 3 ? (
				<Loader width='100%' height='100%' />
			) : (
				<OnboardingFormContainer>
					<span
						className='title'
						dangerouslySetInnerHTML={{ __html: dynamicTitle(step) }}
					></span>
					{onboardingFormJSON
						.filter((item) => item.step === step)
						.map((item) => (
							<Fragment key={item.id}>{item.component()}</Fragment>
						))}
					<IconButton id='submit' color='secondary'>
						<ArrowForwardIosIcon onClick={onNextStep} />
					</IconButton>
				</OnboardingFormContainer>
			)}
		</>
	);
};
export default OnboardingForm;

const OnboardingFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	//justify-content: flex-end;
	gap: 2rem;
	padding: 1rem;
	color: #5151c6;
	// box-shadow: #5151c6 0px 2px 8px 0px;
	border-radius: 1rem;
	.submit {
		float: right;
	}
	.title {
		font-size: 40px;
		line-height: 1.5em;
	}
`;
