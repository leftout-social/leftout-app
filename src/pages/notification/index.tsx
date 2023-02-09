import { Fragment, useContext, useEffect, useState } from 'react';
import InitalDataContext from '~/context/initial-data-context';
import { getUpdates } from '~/services/auth-service';
import styled from 'styled-components';
import CircularLoader from '~/components/CircularLoader';
import NotificationCard from '~/modules/notification/components/NotificationCard';
const Notification = () => {
	const { userData } = useContext(InitalDataContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<any>([]);
	const fetchNotifications = async () => {
		setLoading(true);
		try {
			const data = await getUpdates(userData.id);
			setNotifications(data['data']);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};
	useEffect(() => {
		(async () => await fetchNotifications())();
	}, []);
	return (
		<Parent>
			{loading && <CircularLoader />}
			{!loading && <div className='scroll-container'>
                <span id="activity">Activity ({notifications?.length})</span>
				{notifications?.map((item: any) => (
					<Fragment key={item.feed_id}>
						<NotificationCard
							firstName={item.first_name}
							tripLocation={item.travelling_to_location}
							feedId={item.feed_id}
							createdAt={item.created_at_activity}
							profile_image_url={item.profile_image}
						/>
					</Fragment>
				))}
			</div>}
		</Parent>
	);
};
export default Notification;

const Parent = styled.div`
	width: 100%;
	background: #ffffff;
    .scroll-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        #activity {
            font-size: 24px;
        }
        @media (min-width: 700px) {
			padding: 7rem 1rem 2rem 1rem;
		}
		@media (max-width: 700px) {
			padding: 2rem 1rem 7rem 1rem;
		}
    }
`;
