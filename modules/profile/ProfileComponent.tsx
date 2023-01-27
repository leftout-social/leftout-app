import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getFeedByProfile } from '~/services/auth-service';
import FeedCard from '../home/components/FeedCard';
import React from 'react';
import {useRouter} from 'next/router';
interface ProfileComponentProps {
	firstName: string;
	lastName: string;
	age: string;
	gender: string;
	currentCity: string;
}

const ProfileComponent = ({
	firstName,
	lastName,
	age,
	gender,
	currentCity,
}: ProfileComponentProps) => {
	const router = useRouter();
	const [tab, setTab] = useState<number>(1);
	const [feeds, setFeeds] = useState<any>([]);
	const fetchFeeds = async () => {
		try {
			const data = await getFeedByProfile();
			setFeeds(data.data);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		(async () => await fetchFeeds())();
	}, []);
	const onCardClick = (id: any) => {
		router.push(`/profile/feed?feed_id=${id}`);
	}
	return (
		<ProfileContainer>
			<img
				src='/images/top-onboarding.jpg'
				width='100%'
				height={180}
				className='image-container'
			/>
			<div className='profile-image-container'>
				<img
					src='/cardImage/beach-1.jpg'
					width={100}
					height={100}
					className='profile-image'
				/>
			</div>
			<UserDetails>
				<span>{firstName + ' ' + lastName}</span>
				<div className='sub-details'>
					<span>{`${age},`}</span>
					<span>{`${gender},`}</span>
					<span>{`${currentCity}`}</span>
				</div>
			</UserDetails>

			<TabContainer>
				<TabValue setTab={tab} currTab={1} onClick={() => setTab(1)}>
					<b>{feeds?.length}</b> Trip Posts
				</TabValue>
				{/* <TabValue setTab={tab} currTab={2} onClick={() => setTab(2)}>
					<b>150</b> Interested
				</TabValue> */}
			</TabContainer>
			<FeedContainer>
				{feeds?.map((item: any) => (
					<div key={item.feed_id} onClick={() => onCardClick(item.feed_id)}><FeedCard {...item} self={true} /></div>
				))}
			</FeedContainer>
		</ProfileContainer>
	);
};

export default ProfileComponent;

const ProfileContainer = styled.div`
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	background: #ffffff;

	span {
		@media (min-width: 500px) {
			font-size: 20px;
		}
	}

	.recent-posts-heading {
		font-size: 20px;
		font-weight: bold;
		text-align: left;
		width: 100%;
	}

	.scroll-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 0 2rem 2rem 2rem;
	}

	.profile-image {
		border-radius: 50%;
		padding: 5px;
		margin-top: -70px;
		background: white;
	}
`;

const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 6px;
	font-weight: 700;
	font-size: 20px;
	line-height: 120%;
	text-align: center;

	.sub-details {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		font-weight: 400;
		font-size: 16px;
		line-height: 150%;
		color: #8f90a7;
	}
`;

const TabContainer = styled.div`
	display: flex;
	padding: 0 8px;
	width: inherit;
	margin-top: 20px;
`;

const TabValue = styled.span<{
	setTab: number;
	currTab: number;
}>`
	flex: 1;
	display: flex;
	gap: 6px;
	font-size: 16px;
	color: #7e33ca;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	border-radius: 6px;
	background: ${(props) =>
		props.setTab === props.currTab ? `#F1F1FE` : '#FFFFFF'};
`;

const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1.5rem 1rem 8rem 1rem;
`;
