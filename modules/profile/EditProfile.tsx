import { Button } from '@mui/material';
import {useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Input, Dropdown } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { connectInstagramAccount } from '~/services/auth-service';

interface EditProfileProps {
	userData: any;
	callback: () => void;
	closeDrawer: () => void;
}

const EditProfile = ({ userData, callback, closeDrawer }: EditProfileProps) => {
	const [userDetails, setUserDetails] = useState({
		currentCity: userData?.current_location,
		gender: userData?.gender,
		firstName: userData?.first_name,
		lastName: userData?.last_name,
		age: userData?.current_age,
		instaId: userData?.insta_id,
        bio: userData?.user_bio || '',
	});

	const genderTypes = ['Male', 'Female', 'Others', 'All'];

	const handleGenderDropdown = (val: any) => {
		setUserDetails({ ...userDetails, gender: val.currentKey });
	};
    const handleDescChange = (event: any) => {
        setUserDetails({...userDetails, bio: event.target.value});
    }

	const handleOnSave = async () => {
		try {
			await connectInstagramAccount(userDetails);
			callback?.();
		} catch (err) {
			console.error(err);
		}
	};

    console.log(userDetails);

	return (
		<Parent>
			<NavBarContainer>
				<CloseIcon fontSize='medium' onClick={closeDrawer} />
				<Button size='xs' color='secondary' rounded onClick={handleOnSave}>
					Save
				</Button>
			</NavBarContainer>

			<Input
				value={userDetails.firstName}
				clearable
				status='secondary'
				onChange={(event) =>
					setUserDetails({ ...userDetails, firstName: event.target.value })
				}
				label='First Name'
				css={{
					fontSize: '$lg',
					color: '$black',
				}}
			/>

			<Input
				value={userDetails.lastName}
				clearable
				status='secondary'
				onChange={(event) =>
					setUserDetails({ ...userDetails, lastName: event.target.value })
				}
				label='Last Name'
				css={{
					fontSize: '$lg',
					color: '$black',
				}}
			/>

			<Input
				value={userDetails.age}
				clearable
				status='secondary'
				onChange={(event) =>
					setUserDetails({ ...userDetails, age: Number(event.target.value) })
				}
				label='Age'
				className='text-field'
				type='number'
			/>

			<p className='label-name'>Gender</p>
			<Dropdown>
				<Dropdown.Button flat color='secondary'>
					{userDetails.gender}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					color='secondary'
					selectionMode='single'
					selectedKeys={userDetails.gender}
					onSelectionChange={(val) => handleGenderDropdown(val)}
				>
					{genderTypes.map((gender) => (
						<Dropdown.Item key={gender}>{gender}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>

			<Input
				value={userDetails.currentCity}
				clearable
				status='secondary'
				onChange={(event) =>
					setUserDetails({ ...userDetails, currentCity: event.target.value })
				}
				label='Current City'
				css={{
					fontSize: '$lg',
					color: '$black',
				}}
			/>

			<Input
				value={userDetails.instaId}
				clearable
				status='secondary'
				onChange={(event) =>
					setUserDetails({ ...userDetails, instaId: event.target.value })
				}
				label='Insta Id'
				css={{
					fontSize: '$lg',
					color: '$black',
				}}
			/>

			<Textarea
				label='Bio'
				status='secondary'
                value={userDetails.bio}
				css={{ color: 'black' }}
				maxLength={80}
				onChange={(event) => handleDescChange(event)}
			/>
		</Parent>
	);
};

export default EditProfile;

const Parent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
	gap: 25px;

	.label-name {
		color: #7e33ca;
		// margin-bottom: -10px;
		margin: -5px 0 -10px;
		font-size: 15px;
	}
`;

const NavBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
