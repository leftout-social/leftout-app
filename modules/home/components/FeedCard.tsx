import styled from 'styled-components';
import dayjs from 'dayjs';
import {reactOnFeed} from '../../../services/auth-service';
import { useContext, useEffect, useState } from 'react';
import InitalDataContext from '~/context/initial-data-context';
import { Loading } from '@nextui-org/react';
import { BottomDrawer } from '~/components/BottomDrawer';
import ProfileComponent from '~/modules/profile/ProfileComponent';
export interface FeedCardProps {
	profileImage: string;
	first_name: string;
	created_at: string;
	travel_start_date: string;
	travel_end_date: string;
	travel_medium: string;
	travelling_to_location: string;
	required_travellers: number;
	required_travellers_gender: string;
	feed_id: string;
	user_id: string;
	interested: string[];
	likes: string[];
	additional_description: string;
	feed_id_activity: string;
	self: boolean;
    borderRadius?: boolean;
	onClick?: () => void;
	
}
const FeedCard = ({ ...props }: FeedCardProps) => {
	const {userData} = useContext(InitalDataContext);
	const [interested, setInterested] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const onInterestedClick = async() => {
		setLoading(true);
		try {
			const response = await reactOnFeed(props.feed_id, userData.id);

			setInterested(true);
			setLoading(false);
		}
		catch (err) {
			console.error(err);
			setLoading(false);
		}
	}
	useEffect(() => {
		props.feed_id_activity && setInterested(true);
	}, [interested])
	return (
		<CardContainer onClick={props.onClick}>
			{!props.self && <ProfileContainer position='top ' justifyContent='space-between'>
				<div className='name-avatar'>
					<img
						src='/cardImage/beach-1.jpg'
						width={30}
						height={30}
						className='profile-image'
					/>
					<span className='name'>{props.first_name}</span>
				</div>
				<span className='time'>{dayjs(props.created_at).format('MMM DD')}</span>
			</ProfileContainer>}
			<ContentContainer borderRadius={props.borderRadius}>
				<Details>
					<div className='items'>
						<span id='key'>Trip to : </span>
						<span id='value'>{props.travelling_to_location}</span>
					</div>
					<div className='items'>
						<span id='key'>Looking for peoples : </span>
						<span id='value'>#{props.required_travellers}</span>
					</div>
					<div className='items'>
						<span id='key'>Applicable gender : </span>
						<span id='value'>{props.required_travellers_gender}</span>
					</div>
					<div className='items'>
						<span id='key'>Trip Medium : </span>
						<span id='value'>{props.travel_medium}</span>
					</div>
					{props.additional_description !== '' && <Description>
						<span
							dangerouslySetInnerHTML={{ __html: props.additional_description }}
							id='value'
						/>
					</Description>}
				</Details>
				<Dates>
					<DateContainer>
						<span>{dayjs(props.travel_start_date).format('DD')}</span>
						<span>{dayjs(props.travel_start_date).format('MMM')}</span>
					</DateContainer>
					&darr;
					<DateContainer>
						<span>{dayjs(props.travel_end_date).format('DD')}</span>
						<span>{dayjs(props.travel_end_date).format('MMM')}</span>
					</DateContainer>
				</Dates>
			</ContentContainer>
			{!props.self && <ProfileContainer position='bottom' justifyContent='flex-end'>
				{loading && <Loading />}
				{!loading && !interested && <div className='interested-btn' onClick={onInterestedClick}>
					<img src='/interested.svg' width={20} height={20} alt='in-icon' />
					<span>Interested</span>
				</div>}
				{!loading && interested && <span id='sent'>Your interest request has been sent!</span>}
			</ProfileContainer>}
           
		</CardContainer>
	);
};
export default FeedCard;

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: inherit;
`;

const ProfileContainer = styled.div<{
	position: string;
	justifyContent: string;
}>`
	display: flex;
	justify-content: ${(props) => props.justifyContent};
	align-items: center;
	height: 45px;
	background: #ffffff;
	padding: 10px 14px;
	border-radius: ${(props) =>
		props.position === 'top' ? '8px 8px 0 0' : '0 0 8px 8px'};
	.name-avatar {
		display: flex;
		gap: 8px;
		align-items: center;
		.profile-image {
			border-radius: 50%;
		}
		.name {
			font-style: normal;
			font-weight: 800;
			font-size: 16px;
			line-height: 150%;
			letter-spacing: -0.2px;
			color: #242424;
		}
	}

	.time {
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 150%;
		/* identical to box height, or 21px */

		text-align: right;
		letter-spacing: -0.1px;

		/* Text/Placeholder */

		color: #bdbdbd;
	}
	#sent {
		font-size: 14px;
	}
	.interested-btn {
		display: flex;
		gap: 4px;
		padding: 2px;
		font-size: 14px;
		align-items: center;
		border-radius: 4px;
		// background: #ebe6f3;
		// border: 1px solid #7e33ca;
		cursor: pointer;
	}
`;

const ContentContainer = styled.div<{
    borderRadius?: boolean
}>`
	display: flex;
	justify-content: space-between;
	width: inherit;
	background: #ebe6f3;
	padding: 10px 14px;
    border-radius: ${props => props.borderRadius ? '8px' : 0}
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	.items {
		display: flex;
		gap: 5px;
		align-items: center;
		font-size: 15px;
		#key {
			color: #7e33ca;
			font-weight: bold;
		}
	}
`;
const Dates = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
	align-items: center;
	color: #7e33ca;
`;
const DateContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 500;
    font-size: 13px;
	padding: 6px;
	//   border: 1px solid #42C2FF;
	color: black;
	//   background: conic-gradient(from 315deg, #E8310A, #D39472);
	border-radius: 10px;
	//   color: #ffffff;
`;
const Description = styled.div`
	padding: 6px;
	background: #ffffff;
	//   border: 1px solid #7e33ca;
	font-size: 14px;
	border-radius: 6px;
`;
