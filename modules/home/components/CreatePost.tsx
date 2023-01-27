import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Input, Dropdown } from '@nextui-org/react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DateRangePicker from '~/components/DateRangePicker';
import { Textarea } from '@nextui-org/react';
import { createPost } from '~/services/auth-service';
import InitalDataContext from '~/context/initial-data-context';

interface createPostProps {
	closeDrawer: () => void;
}

const CreatePost = ({ closeDrawer }: createPostProps) => {
	const { userData } = useContext(InitalDataContext);
	const [formState, setFormState] = useState({
		fromDate: '',
		toDate: '',
		location: 'Goa',
		groupSize: '1',
		requiredGender: 'Male',
		desc: '',
		commute: 'Flight',
	});
	const commuteTypes = ['Air', 'Train', 'Road', 'Air + Train', 'Road + Train', 'Misc'];
	const genderTypes = ['Male', 'Female', 'Others', 'All'];
	// const groupSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	const handleDropdown = (val: any) => {
		setFormState({ ...formState, commute: val.currentKey });
	};

	const handleGenderDropdown = (val: any) => {
		console.log(val.currentKey);
		setFormState({ ...formState, requiredGender: val.currentKey });
	};

	// const handleGroupSizeDropdown = (val: any) => {
	// 	setFormState({ ...formState, groupSize: val.currentKey });
	// };

	const handlePostOnClick = async () => {
		try {
			const response =  createPost(userData.id, formState);
            console.log("response", response);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Parent>
			<NavBarContainer>
				<CloseIcon fontSize='medium' onClick={closeDrawer} />
				<Button size='xs' color='secondary' rounded onClick={handlePostOnClick}>
					Post
				</Button>
			</NavBarContainer>

			<Input
				value={formState.location}
				clearable
				status='secondary'
				onChange={(event) =>
					setFormState({ ...formState, location: event.target.value })
				}
				label='Location'
				css={{
					fontSize: '$lg',
					color: '$black',
				}}
			/>

			<div className='date-container'>
				<DateRangePicker type='from' />
				<DateRangePicker type='to' />
			</div>

			<Input
				value={formState.groupSize}
				clearable
				status='secondary'
				onChange={(event) =>
					setFormState({ ...formState, groupSize: Number(event.target.value) })
				}
				label='Group Size'
				className='text-field'
				type='number'
			/>

			{/* <p className='commute'>Group Size</p>
			<Dropdown>
				<Dropdown.Button flat color='secondary'>
					{formState.groupSize}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					color='secondary'
					selectionMode='single'
					selectedKeys={formState.groupSize}
					onSelectionChange={(val) => handleGroupSizeDropdown(val)}
				>
					{groupSizes.map((size) => (
						<Dropdown.Item key={`${size}`}>{size}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown> */}

			<p className='commute'>Required Travellers Gender</p>
			<Dropdown>
				<Dropdown.Button flat color='secondary'>
					{formState.requiredGender}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					color='secondary'
					selectionMode='single'
					selectedKeys={formState.requiredGender}
					onSelectionChange={(val) => handleGenderDropdown(val)}
				>
					{genderTypes.map((gender) => (
						<Dropdown.Item key={gender}>{gender}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>

			<Textarea
				label='Description'
				status='secondary'
				css={{ color: 'black' }}
				maxLength={80}
			/>

			<p className='commute'>Commute</p>
			<Dropdown>
				<Dropdown.Button flat color='secondary'>
					{formState.commute}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					color='secondary'
					selectionMode='single'
					selectedKeys={formState.commute}
					onSelectionChange={(val) => handleDropdown(val)}
				>
					{commuteTypes.map((commute) => (
						<Dropdown.Item key={commute}>{commute}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</Parent>
	);
};

export default CreatePost;

const Parent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
	gap: 40px;
	text-field {
		font-size: 40px;
	}
	.date-container {
		display: flex;
		gap: 20px;
	}
	@keyframes bottom-drawer {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}
	transition: transform 1s ease;
	.commute {
		color: #7e33ca;
		margin: -10px 0 -30px;
		font-size: 15px;
	}
`;

const NavBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
