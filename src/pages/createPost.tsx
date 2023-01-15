import styled from 'styled-components';
import Box from '@mui/material/Box';
import { FormControl, TextField } from '@mui/material';
import { Button, Input, Dropdown } from '@nextui-org/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Select from '@mui/material/Select';
import { css } from '@nextui-org/react';
import CloseIcon from '@mui/icons-material/Close';
import DateRangePicker from '~/components/DateRangePicker';
import useRouter from 'next/router';
import { Textarea } from '@nextui-org/react';

const createPost = () => {
	const router = useRouter;
	const [formState, setFormState] = useState({
		fromDate: '',
		toDate: '',
		location: 'Goa',
		groupSize: 1,
		desc: '',
		commute: 'flight',
	});
	const size = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const commuteTypes = ['flight', 'train', 'bus', 'car', 'bike'];

	return (
		<Parent>
			{/* <Box
				component='form'
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				className='form'
			>
				<TextField
					required
					id='outlined-required'
					label='Location'
					// defaultValue="Goa"
					value={formState.location}
					onChange={(event) =>
						setFormState({ ...formState, location: event.target.value })
					}
					className='text-field'
				/>

                <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id='demo-simple-select-label'>Group Size</InputLabel>
				<Select
					// labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={formState.groupSize}
					label='Group Size'
                    className='group-size'
					onChange={(event) => setFormState({...formState, groupSize: Number(event.target.value)})}
				>
                    {size.map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))}
				</Select>
                </FormControl>
                </div>
				
			</Box> */}

			<NavBarContainer>
				<CloseIcon fontSize='medium' onClick={() => router.push('/')} />
				<Button size='sm' color='primary' rounded css={{ width: '$5' }}>
					Post
				</Button>
			</NavBarContainer>

			<Input
				value={formState.location}
				clearable
				status='primary'
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
				status='primary'
				onChange={(event) =>
					setFormState({ ...formState, groupSize: Number(event.target.value) })
				}
				label='Group Size'
				className='text-field'
				type='number'
			/>

			{/* <Input
				value={formState.desc}
				clearable
				status='primary'
				onChange={(event) =>
					setFormState({ ...formState, desc: event.target.value })
				}
				label='Description'
				// className='text-field'
				// maxLength={100}
				css={{
					fontSize: '$xl',
					height: '100%',
					width: '100%',
					minHeight: '40px',
					display: 'flex',
					flexWrap: 'wrap',
					flexGrow: '1',
				}}
			/> */}

			<Textarea
				label='Write your thoughts'
				placeholder='Enter your amazing ideas.'
			/>

			<p>Commute</p>
			<Dropdown>
				<Dropdown.Button flat>{formState.commute}</Dropdown.Button>
				<Dropdown.Menu aria-label='Static Actions'>
					{commuteTypes.map((commute) => (
						<Dropdown.Item key={commute}>{commute}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</Parent>
	);
};

export default createPost;

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
`;

const NavBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
