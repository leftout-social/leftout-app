import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Toolbar from '~/components/Toolbar';
import CircularLoader from '~/components/CircularLoader';

const LocationDetails = () => {
	const router = useRouter();
	const { id } = router.query;
	const [articleData, setArticleData] = useState<any>({});
	const [imageIndex, setImageIndex] = useState<number>(0);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const [loading, setLoading] = useState(false);

	const minSwipeDistance = 80;

	const onTouchStart = (e: any) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe) handleImageChange('prev');
		else if (isRightSwipe) handleImageChange('next');
	};

	const handleImageChange = (type: string) => {
		if (type === 'next') {
			setImageIndex((imageIndex + 1) % articleData.images.length);
		} else {
			setImageIndex(
				(imageIndex - 1 + articleData.images.length) % articleData.images.length
			);
		}
	};

	useEffect(() => {
		setLoading(true);
		(async () => {
			const response: any = await axios.get(
				`https://api.jsonbin.io/v3/b/${id}?meta=false`
			);
			setArticleData(response.data);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			{articleData && (
				<Parent>
					<div className='fixed-header'>
						<Toolbar
							onLeftButtonClick={() => router.back()}
							leftButtonJSX={<KeyboardBackspaceIcon htmlColor='#7e33ca' />}
						/>
					</div>

					<span className='title'>{articleData.title}</span>
					<ImageContainer
						index={imageIndex}
						articleData={articleData}
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
					>
						{loading && <CircularLoader />}
						<img
							src={articleData.images && articleData.images[imageIndex]}
							alt='image'
							className='image'
						/>
					</ImageContainer>
					<span>{articleData.desc}</span>
					<DetailContainer>
						<span className='heading'>Places to Visit</span>
						<div className='bullet-points'>
							<ul>
								{articleData.places_to_visit?.map((item: string) => (
									<li>{item}</li>
								))}
							</ul>
						</div>
					</DetailContainer>
					<DetailContainer>
						<span className='heading'>Best time to visit</span>
						<div className='bullet-points'>
							<ul>
								{articleData.best_time_to_visit?.map((item: string) => (
									<li dangerouslySetInnerHTML={{ __html: item }} />
								))}
							</ul>
						</div>
					</DetailContainer>
				</Parent>
			)}
		</>
	);
};

export default LocationDetails;

const Parent = styled.div`
	position: relative;
  height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	gap: 20px;
	color: #7e33ca;
	overflow: auto;

	.fixed-header {
		position: fixed;
		width: 100%;
		max-width: 850px;
		margin: 0 auto;
		top: 0;
		padding: 0 0.7rem;
	}

	.title {
		font-size: 22px;
		font-weight: 700;
	}
`;

const ImageContainer = styled.div<{
	index: number;
	articleData: any;
}>`
	display: flex;
	width: 100%;
	height: 170px;
	align-items: center;
	justify-content: space-between;
	border-radius: 6px;
	.image {
		width: 100vw;
		height: 170px;
		border-radius: 4px;
		object-fit: cover;
	}
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	.heading {
		font-weight: 600;
		font-size: 18px;
	}

	.bullet-points {
		display: flex;
		flex-direction: column;
		margin-left: -10px;
	}
`;
