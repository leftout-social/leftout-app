import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { getFeedByProfile } from '~/services/auth-service';
import FeedCard from '../home/components/FeedCard';
import React from 'react';
import { useRouter } from 'next/router';
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
	const inputFile = useRef<HTMLInputElement>(null);
	const [feeds, setFeeds] = useState<any>([]);
    const [profilePhoto, setProfilePhoto] = useState('/cardImage/beach-1.jpg');
	const fetchFeeds = async () => {
		try {
			const data = await getFeedByProfile();
			setFeeds(data.data);
		} catch (err) {
			console.error(err);
		}
	};

    const uploadProfilePhoto = (event: any) => {
        if(event.target.files[0]) {
            setProfilePhoto(URL.createObjectURL(event.target.files[0]));
        }
    }
	useEffect(() => {
		(async () => await fetchFeeds())();
	}, []);
	const onCardClick = (id: any) => {
		router.push(`/profile/feed?feed_id=${id}`);
	};

    console.log("profile", profilePhoto);
	//@ts-ignore
	const onImageClick = () => inputFile?.current?.click();
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
					src={profilePhoto}
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
                        <div key={item.feed_id} className='feed-card' onClick={() => onCardClick(item.feed_id)}>
                            <FeedCard {...item} borderRadius self={true} />
                        </div>
                    ))}
            </FeedContainer>
            
		</ProfileContainer>
	);
};

export default ProfileComponent;

const ProfileContainer = styled.div<{
    external?: boolean
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
		
        // top: ${props => !props.external ? '-70px' : '20px'}
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
`;

const TabContainer = styled.div`
	display: flex;
	padding: 0 12px;
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
	display: flex;
    width: 100%;
	flex-direction: column;
	gap: 1rem;
	padding: 1.5rem 1rem 8rem 1rem;
    position: relative;
    top: -70px;
    .feed-card {
        width: 100%;
        // padding: 0 10px;
        border-radius: 12px;
    }
`;
