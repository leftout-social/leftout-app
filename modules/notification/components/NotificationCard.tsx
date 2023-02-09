import styled from 'styled-components';
import {useRouter} from 'next/router';
import dayjs from 'dayjs';

interface NotificationCardProps {
	firstName: string;
	tripLocation: string;
	profile_image_url?: string;
    createdAt: string;
    feedId: string;
}
const NotificationCard = ({
	firstName,
	tripLocation,
    feedId,
    createdAt,
	profile_image_url = '/cardImage/beach-1.jpg',
}: NotificationCardProps) => {
    const router = useRouter();
    const onFeedClick = () => {
        router.push(`profile/feed?feed_id=${feedId}`);
    }
	return (
		<CardContainer>
			<img src={profile_image_url} className='profile-img' alt='profile-img' />
            <LeftContainer>
            <span>
				{' '}
				<strong>{firstName}</strong> has shown interest on your trip to{' '}
				<span id='trip-location' onClick={onFeedClick}>{tripLocation}</span>
			</span>
            <span id="date">{dayjs(createdAt).format('MMM DD, hh:mm')}</span>
            </LeftContainer>
			
		</CardContainer>
	);
};
export default NotificationCard;

const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 14px 14px 14px 16px;
	gap: 14px;

	width: 100%;
	background: #f1f1fe;
	.profile-img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
	}
	#trip-location {
		background: linear-gradient(270.95deg, #888bf4 0%, #5151c6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
        text-decoration: underline;
        cursor: pointer;
	}
    #date {
        color: #000000;
        font-size: 12px;
    }
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

`;