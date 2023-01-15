import styled from 'styled-components';
import { Fragment, useContext, useState } from 'react';
import { Input } from '@nextui-org/react';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { dynamicTitle } from '~/modules/onboarding/util';
import axios from 'axios';
import InitalDataContext from '~/context/initial-data-context';
import { useRouter } from 'next/router';

const OnboardingForm = () => {
	const data = localStorage.getItem('user');
	const router = useRouter();
	const parseData = JSON.parse(data!);
	const { id } = parseData;
	const { toast } = useContext(InitalDataContext);
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		id: id,
		gender: '',
		age: '',
		currentCity: '',
	});
	const [step, setStep] = useState(1);
	const onNextStep = async () => {
		setStep(step + 1);
		if (step == 3) {
			try {
				await axios.post('/api/onboard', {
					first_name: formState.firstName,
					last_name: formState.lastName,
					age: formState.age,
					gender: formState.gender,
					current_city: formState.currentCity,
					id: id,
				});
				router.push('/');
			} catch (e) {
				// @ts-ignore
				toast.toastHandler({
					type: 'error',
					message: 'something wen wrong :(',
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
					status='primary'
					onChange={(event) =>
						setFormState({ ...formState, firstName: event.target.value })
					}
					label='First Name'
				/>
			),
		},
		{
			id: 2,
			step: 2,
			component: () => (
				<Input
					value={formState.lastName}
					status='primary'
					onChange={(event) =>
						setFormState({ ...formState, lastName: event.target.value })
					}
					label='Last Name'
				/>
			),
		},
		{
			id: 3,
			step: 3,
			component: () => (
				<Input
					value={formState.gender}
					status='primary'
					onChange={(event) =>
						setFormState({ ...formState, gender: event.target.value })
					}
					label='Gender'
				/>
			),
		},
		{
			id: 4,
			step: 3,
			component: () => (
				<Input
					value={formState.age}
					status='primary'
					onChange={(event) =>
						setFormState({ ...formState, age: event.target.value })
					}
					label='Age'
				/>
			),
		},
		{
			id: 5,
			step: 3,
			component: () => (
				<Input
					value={formState.currentCity}
					status='primary'
					onChange={(event) =>
						setFormState({ ...formState, currentCity: event.target.value })
					}
					label='Current City'
				/>
			),
		},
	];
	return (
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
			<IconButton id='submit' color='primary'>
				<ArrowForwardIosIcon onClick={onNextStep} />
			</IconButton>
		</OnboardingFormContainer>
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
	.submit {
		float: right;
	}
	.title {
		font-size: 50px;
		line-height: 1.5em;
	}
`;
