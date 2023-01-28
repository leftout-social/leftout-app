import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import {
	connectInstagramAccount,
	getFeedByProfile,
} from '~/services/auth-service';
import FeedCard from '../home/components/FeedCard';
import React from 'react';
import { useRouter } from 'next/router';
import InstagramIcon from '@mui/icons-material/Instagram';
import { BottomDrawer } from '~/components/BottomDrawer';
import { Button, Loading, Input } from '@nextui-org/react';
interface ProfileComponentProps {
	firstName: string;
	lastName: string;
	age: string;
	gender: string;
	currentCity: string;
	insta_id: string;
}

const ProfileComponent = ({
	firstName,
	lastName,
	age,
	gender,
	currentCity,
	insta_id,
}: ProfileComponentProps) => {
	const router = useRouter();
	const [tab, setTab] = useState<number>(1);
	const inputFile = useRef<HTMLInputElement>(null);
	const [feeds, setFeeds] = useState<any>([]);
	const [instaId, setInstaId] = useState<string>('');
	const [instaIdDrawer, setInstaIdDrawer] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
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
	};
	//@ts-ignore
	const onImageClick = () => inputFile?.current?.click();
	const connectInstaAccount = async () => {
		setLoading(true);
		try {
			const data = await connectInstagramAccount(instaId);
			setInstaIdDrawer(false);
			setLoading(false);
			window.location.reload();
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};
	const onInstagramClick = () => {
		if (!insta_id) {
			setInstaIdDrawer(true);
			return;
		}
		window.open(`https://www.instagram.com/${insta_id}`)
	};
	return (
		<ProfileContainer>
			<img
				src='/images/top-onboarding.jpg'
				width='100%'
				height={180}
				className='image-container'
			/>
			<div className='profile-image-container'>
				<input
					type='file'
					id='imgupload'
					style={{ display: 'none' }}
					ref={inputFile}
				/>
				<img
					src='/cardImage/beach-1.jpg'
					width={100}
					height={100}
					className='profile-image'
					onClick={onImageClick}
				/>
			</div>
			<UserDetails>
				<span>{firstName + ' ' + lastName}</span>
				<div className='sub-details'>
					<span>{`${age},`}</span>
					<span>{`${gender},`}</span>
					<span>{`${currentCity},`}</span>
					<InstagramIcon
						htmlColor={insta_id && '#7e33ca'}
						onClick={onInstagramClick}
					/>
				</div>
			</UserDetails>

			<TabContainer>
				<TabValue setTab={tab} currTab={1} onClick={() => setTab(1)}>
					<b>{feeds?.length}</b> Trip Posts
				</TabValue>
			</TabContainer>
			<FeedContainer>
				{feeds?.map((item: any) => (
					<FeedCard
						{...item}
						self={true}
						key={item.feed_id}
						onClick={() => onCardClick(item.feed_id)}
					/>
				))}
			</FeedContainer>
			<BottomDrawer
				id='instaId-drawer'
				open={instaIdDrawer}
				onClose={() => setInstaIdDrawer(false)}
			>
				<DrawerParent>
					<Input
						value={instaId}
						placeholder='instagram account'
						onChange={(event) => setInstaId(event.target.value)}
						className='input'
						size='lg'
						labelLeft='@'
					/>
					{!loading && (
						<Button
							onClick={connectInstaAccount}
							className='button'
							disabled={instaId.length <= 2}
						>
							CONNECT
						</Button>
					)}
					{loading && <Loading />}
				</DrawerParent>
			</BottomDrawer>
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
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 100%;
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
