import styled from 'styled-components';
import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { getAllFeeds } from '~/services/auth-service';
import { Loading } from '@nextui-org/react';
import FeedCard from '~/modules/home/components/FeedCard';
import InitalDataContext from '~/context/initial-data-context';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchContainer from "~/modules/home/components/SearchContainer";
import {useRouter} from "next/router";

export default function Home() {
	const {push} = useRouter();
	const [feeds, setFeeds] = useState<any>([]);
	const [userLocation, setUserLocation] = useState<any>({});
	const { userData } = useContext(InitalDataContext);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const pageNo = useRef<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [distance, setDistance] = useState<{id: number, value: number, text: string}>({
		id: 4,
		value: 1000,
		text: '1000+ KM'
	})
	const fetchFeeds = async (lat = userLocation?.coords?.latitude, long = userLocation?.coords?.longitude) => {
		try {
			const data = await getAllFeeds(
				lat || 20 ,
				long || 70,
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
	const successCallback = async(position: any) => {
		setUserLocation(position);
		const lat = position?.coords?.latitude;
		const long = position?.coords?.longitude;
		await fetchFeeds(lat, long)
	};
	const errorCallback = async(error: any) => {
		setUserLocation({});
		await fetchFeeds()
	};
	const onChange = (val: string) => {
		setSearchQuery(val);
	}
	const filteredData = feeds?.filter((item: any) =>
		Object.values(item).join('').toLowerCase().includes(searchQuery.toLowerCase())
	)
	const renderData = (filteredData?.length >= 1 ? filteredData : feeds)
	const onDistanceChange = (data: {id: number, value: number, text: string}) => {
		setDistance(data)
		console.log(data);
	}
	useEffect(() => {
		push({ query: {search: searchQuery } }, undefined, { shallow: true });
	}, [searchQuery])
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, []);
	const ItemLoading = () => (
		<LoadingWrapper>
			<Loading />
		</LoadingWrapper>
	);
	return (
		<Parent>
			<SearchContainer searchQuery={searchQuery} onChange={onChange} selectedMenu={distance.id} onMenuChange={onDistanceChange}/>
			<div id='scrollableDiv'>
				<InfiniteScroll
					hasMore={hasMore}
					loader={ItemLoading()}
					scrollableTarget='scrollableDiv'
					next={fetchFeeds}
					dataLength={feeds.length}
				>
					<div className='scroll-container'>
						{feeds &&
							renderData
								.filter((item: any) =>
									item.user_id !== userData.id
								)
								.map((item: any) => {
									return (
										<Fragment key={item.feed_id}>
											<FeedCard {...item} self={false} />
										</Fragment>
									);
								})}
					</div>
				</InfiniteScroll>
			</div>
		</Parent>
	);
}
const Parent = styled.div`
	height: 100%;
	width: 100%;
	background: #f6f7f9;
	position: relative;
	#scrollableDiv {
		height: 100%;
		overflow: auto;
	}
	.scroll-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		@media (min-width: 700px) {
			padding: 10rem 1rem 2rem 1rem;
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

const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	overflow: auto;
`;
// const NavContainer = styled.div`
//   width: inherit;
//   position: fixed;
// 	max-width: 900px;
//   bottom: 0;
//   z-index: 3;
// `;
