import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loader from '~/components/Loader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StarIcon from '@mui/icons-material/Star';

const LocationDetails = () => {
	const router = useRouter();
	const { id } = router.query;
	const [articleData, setArticleData] = useState<any>({});
	const imageIndex = useRef<number>(0);

	const handleImageChange = (type: string) => {
		if (type === 'next') {
			imageIndex.current = (imageIndex.current + 1) % articleData.images.length;
		} else {
			imageIndex.current =
				(imageIndex.current - 1 + articleData.images.length) %
				articleData.images.length;
		}

		console.log('change', imageIndex.current);
	};

	// console.log("images", articleData?.images);
	// console.log("ref", imageIndex);

	useEffect(() => {
		(async () => {
			const response: any = await axios.get(
				`https://api.jsonbin.io/v3/b/${id}?meta=false`
			);
			setArticleData(response.data);
			console.log(response.data);
		})();
	}, []);

	return (
		<>
			{articleData && (
				<Parent>
					<span className='title'>{articleData.title}</span>
					<ImageContainer index={imageIndex.current} articleData={articleData}>
						<ChevronLeftIcon onClick={() => handleImageChange('prev')} />
						<img src={articleData.images && articleData.images[Number(imageIndex)]} alt='image' className='image' />
						<ChevronRightIcon onClick={() => handleImageChange('next')} />
					</ImageContainer>
					<span>{articleData.desc}</span>
					<DetailContainer>
						<span className='heading'>Places to Visit</span>
						<div className='bullet-points'>
							{articleData.places_to_visit?.map((item: string) => (
								<span>
									<StarIcon /> {item}
								</span>
							))}
						</div>
					</DetailContainer>
                    <DetailContainer>
						<span className='heading'>Famous for</span>
						<div className='bullet-points'>
							{articleData.famous_for?.map((item: string) => (
								<span>
									<StarIcon /> {item}
								</span>
							))}
						</div>
					</DetailContainer>
				</Parent>
			)}
		</>
	);
};

export default LocationDetails;

const Parent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	gap: 15px;
	.title {
		font-size: 20px;
		font-weight: 700;
		color: #7e33ca;
	}
	
`;

const ImageContainer = styled.div<{
	index: number;
	articleData: any;
}>`
	display: flex;
	width: 100%;
	padding: 5px;
	height: 170px;
	align-items: center;
	justify-content: space-between;
	border-radius: 6px;
	.image {
		width: 100%;
		height: 170px;
		border-radius: 4px;
	}
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
    align-items: flex-start;

    .bullet-points {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
`;
