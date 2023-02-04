import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import {
	connectInstagramAccount,
	getFeedByProfile,
} from '~/services/auth-service';
import FeedCard from '../home/components/FeedCard';
import InstagramIcon from '@mui/icons-material/Instagram';
import { BottomDrawer } from '~/components/BottomDrawer';
import { Button, Input, Loading } from '@nextui-org/react';
import ImageKit from 'imagekit';
interface ProfileComponentProps {
	firstName: string;
	lastName: string;
	age: string;
	gender: string;
	currentCity: string;
	insta_id: string;
	bio?: string;
	profile_image_url?: string;
	callback: () => void;
}

const ProfileComponent = ({
	firstName,
	lastName,
	age,
	gender,
	currentCity,
	insta_id,
	bio,
	profile_image_url,
	callback
}: ProfileComponentProps) => {
	const router = useRouter();
	const [tab, setTab] = useState<number>(1);
	const inputFile = useRef<HTMLInputElement>(null);
	const [feeds, setFeeds] = useState<any>([]);
	const [profilePhoto, setProfilePhoto] = useState(profile_image_url);
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
	const imageKit = new ImageKit({
		publicKey: process.env.NEXT_PUBLIC_IMGKIT_publicKey as string,
		privateKey: process.env.NEXT_PUBLIC_IMGKIT_privateKey as string,
		urlEndpoint: process.env.NEXT_PUBLIC_IMGKIT_urlEndpoint as string
	});

	const uploadProfilePhoto = (event: any) => {
		if (event.target.files[0]) {
			setProfilePhoto(URL.createObjectURL(event.target.files[0]));
		}

		imageKit.upload(
			{
				file: event.target.files[0],
				fileName: `${firstName}_${lastName}`,
			},
			async function (err, result) {
				console.log(result);
				const profile_image_url = result?.url
				const userData = {
					firstName,
					lastName,
					age,
					gender,
					currentCity,
					instaId,
					bio,
					profile_image_url
				};
				await connectInstagramAccount(userData);
				callback?.();
			}
		);
	};
	console.log('profile-image -> ', profile_image_url);
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
			const userData = {
				firstName,
				lastName,
				age,
				gender,
				currentCity,
				instaId,
				bio,
				profile_image_url
			};
			await connectInstagramAccount(userData);
			setInstaIdDrawer(false);
			setLoading(false);
			callback?.();
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
		window.open(`https://www.instagram.com/${insta_id}`);
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
					onChange={(event) => uploadProfilePhoto(event)}
				/>
				<img
					src={profilePhoto || '/cardImage/beach-1.jpg'}
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
					<span>{`${currentCity}`}</span>
					<InstagramIcon
						htmlColor={insta_id && '#7e33ca'}
						onClick={onInstagramClick}
					/>
				</div>
				<span className='bio'>{bio}</span>
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
						borderRadius
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

const ProfileContainer = styled.div<{
	external?: boolean;
}>`
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

	.profile-image-container {
		position: relative;
		top: -70px;
	}
	.profile-image {
		border-radius: 50%;
		padding: 5px;
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
	position: relative;
	top: -70px;
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
	.bio {
		margin-top: 10px;
		font-size: 14px;
		padding: 0 8px;
	}
`;

const TabContainer = styled.div`
	display: flex;
	width: inherit;
	margin-top: 20px;
	position: relative;
	top: -70px;
`;

const TabValue = styled.span<{
	setTab: number;
	currTab: number;
}>`
	flex: 1;
	display: flex;
	gap: 6px;
	font-size: 16px;
	font-weight: 500;
	color: #7e33ca;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	border-radius: 6px;
	background: ${(props) =>
		props.setTab === props.currTab ? `#ebe6f3;` : '#FFFFFF'};
`;

const FeedContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: 100%;
	position: relative;
	top: -30px;
`;
const DrawerParent = styled.div`
	display: flex;
	width: 100%;
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
