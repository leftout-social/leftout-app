import styled from 'styled-components';
import { useRouter } from 'next/router';
import Toolbar from '~/components/Toolbar';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState, useEffect } from 'react';
import { getFeedDetails } from '~/services/auth-service';
import FeedCard from '~/modules/home/components/FeedCard';
import { Loading } from '@nextui-org/react';

interface UserCardProps {
	first_name: string;
	gender: string;
	current_age: string;
	current_location: string;
	insta_id: string;
}
const UserCard = ({
	first_name,
	current_age,
	gender,
	current_location,
}: UserCardProps) => {
	return (
		<UserCardContainer>
			<ContentContainer>
				<Details>
					<div className='items'>
						<span id='key'>Name </span>
						<span id='value'>{first_name}</span>
					</div>
                    <div className='items'>
						<span id='key'>Age</span>
						<span id='value'>{current_age}</span>
					</div>
                    <div className='items'>
						<span id='key'>Gender </span>
						<span id='value'>{gender}</span>
					</div>
                    <div className='items'>
						<span id='key'>Current location </span>
						<span id='value'>{current_location}</span>
					</div>
				</Details>
			</ContentContainer>
		</UserCardContainer>
	);
};
const FeedInformation = (props: any) => {
	const router = useRouter();
	const { feed_id } = router.query;
	const [feedInfo, setFeedInfo] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const onBackClick = () => {
		router.back();
	};
	const fetchFeedData = async () => {
		try {
			setLoading(true);
			const data = await getFeedDetails(feed_id);
			setFeedInfo(data);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};
	useEffect(() => {
		(async () => await fetchFeedData())();
	}, []);
	console.log(feedInfo);
	return (
		<Parent>
			{loading && <Loading />}
			{!loading && (
				<>
					<div className='fixed-header'>
						<Toolbar
							onLeftButtonClick={onBackClick}
							leftButtonJSX={<KeyboardBackspaceIcon htmlColor='#7e33ca' />}
						/>
						<FeedCard {...feedInfo?.feedInfo} self={true} />
					</div>
					<div className='scroll-container'>
                        <Title>Interested Peoples</Title>
                        {feedInfo?.interestedInfo?.map((item: any) => <UserCard {...item} />)}
                    </div>
				</>
			)}
		</Parent>
	);
};
export default FeedInformation;
const Parent = styled.div`
	height: 100%;
	width: 100%;
	max-width: 850px;
	margin: 0 auto;
	position: relative;
    background: #ffffff;
	.fixed-header {
		position: fixed;
		width: 100%;
		max-width: 850px;
		margin: 0 auto;
		top: 0;
        background: #ffffff;
	}
	.scroll-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 18rem 1rem 8rem 1rem;
        background: #ffffff;
	}
`;

const UserCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: inherit;
`;
const ContentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: inherit;
    border: 1px solid #ebe6f3;
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
const Title = styled.span`
    font-size: 22px;
`;