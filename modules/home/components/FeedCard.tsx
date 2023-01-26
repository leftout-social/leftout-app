import styled from 'styled-components';
import dayjs from 'dayjs';
import {getReactionOnFeed, reactOnFeed} from '../../../services/auth-service';
import { useContext, useEffect, useState } from 'react';
import InitalDataContext from '~/context/initial-data-context';
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
	
}
const FeedCard = ({ ...props }: FeedCardProps) => {
	const {userData} = useContext(InitalDataContext);
	console.log(userData);
	const [interested, setInterested] = useState(false);
	const onInterestedClick = async() => {
		try {
			const response = await reactOnFeed(props.feed_id, userData.id);
			console.log(response);
			setInterested(true);
		}
		catch (err) {
			console.error(err);
		}
	}
	// useEffect(() => {
	// 	fetchActivityStatus();
	// }, [])
	console.log('here -> ', props.feed_id_activity);
	return (
		<CardContainer>
			<ProfileContainer position='top'>
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
			</ProfileContainer>
			<ContentContainer>
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
					<Description>
						<span
							dangerouslySetInnerHTML={{ __html: props.additional_description }}
							id='value'
						/>
					</Description>
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
			<ProfileContainer position='bottom'>
				{props.feed_id_activity === undefined && <img src='/interested.svg' width={20} height={20} alt='in-icon' onClick={onInterestedClick}/>}
				{interested ? 'already' : 'not'}
				<img src='/like.svg' width={20} height={20} alt='like-icon' />
			</ProfileContainer>
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
}>`
	display: flex;
	justify-content: space-between;
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
`;

const ContentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: inherit;
	background: #ebe6f3;
	padding: 10px 14px;
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
	gap: 6px;
	align-items: center;
	color: #7e33ca;
`;
const DateContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 500;
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
