import styled from 'styled-components';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { getAllFeeds } from '~/services/auth-service';
import { Loading } from '@nextui-org/react';
import FeedCard from '~/modules/home/components/FeedCard';
import InitalDataContext from '~/context/initial-data-context';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
	const [feeds, setFeeds] = useState<any>([]);
	const [userLocation, setUserLocation] = useState<any>({});
	const { userData } = useContext(InitalDataContext);
	const pageNo = useRef<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const successCallback = (position: any) => {
		setUserLocation(position);
	};
	const errorCallback = (error: any) => {
		setUserLocation({});
	};
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, []);
	const fetchFeeds = async () => {
		try {
			const data = await getAllFeeds(
				userLocation?.coords?.latitude || 20,
				userLocation?.coords?.longitude || 70,
				pageNo.current
			);
			if (data.data.length === 0) {
				setHasMore(false);
				return;
			}
			setFeeds([...feeds, ...data.data]);
			pageNo.current += 1;
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		(async () => await fetchFeeds())();
	}, []);
	return (
		<Parent>
			<div className='scroll-container' id='scrollableDiv'>
				{feeds.length === 0 && <Loading size='xl' />}
				<InfiniteScroll
					hasMore={hasMore}
					loader={<Loading />}
					scrollableTarget='scrollableDiv'
					next={fetchFeeds}
					dataLength={feeds.length}
				>
					{feeds &&
						feeds
							.filter((item: any) => item.user_id !== userData.id)
							.map((item: any) => {
								return (
									<Fragment key={item.feed_id}>
										<FeedCard {...item} self={false} />
									</Fragment>
								);
							})}
				</InfiniteScroll>
			</div>
		</Parent>
	);
}
const Parent = styled.div`
	height: 100%;
	width: 100%;
	background: #f6f7f9;
	.scroll-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		height: inherit;
		@media (min-width: 700px) {
			padding: 7rem 1rem 2rem 1rem;
		}
		@media (max-width: 700px) {
			padding: 2rem 1rem 7rem 1rem;
		}

		background: #f6f7f9;
	}
	.add {
		position: sticky;
		display: flex;
		padding: 10px;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		border: 2px solid #42c2ff;
		color: #000000;
		font-weight: bold;
		background: #ffffff;
		font-size: 20px;
		width: 200px;
		float: right;
		bottom: 5%;
		right: 5%;
		z-index: 1000;
	}
`;
// const NavContainer = styled.div`
//   width: inherit;
//   position: fixed;
// 	max-width: 900px;
//   bottom: 0;
//   z-index: 3;
// `;
