import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '~/components/Loader';
import { getUserDetail } from '~/services/auth-service';
import InstagramIcon from '@mui/icons-material/Instagram';

const ProfilePreview = (userId: any) => {
	const [userDetails, setUserDetails] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
        try {
            (async () => {
                const response = await getUserDetail(userId.userId);
                console.log("userDetails", response.data);
                setUserDetails(response.data);
            })();
            setLoading(false);
        } catch(err){
            console.error(err);
            setLoading(false);
        }
	}, []);

    if(loading){
        return <Loader height={20} width={20}/>
    }

    const onInstagramClick = () => {
		window.open(`https://www.instagram.com/${userDetails.insta_id}`);
	};

	return (
		<Parent>
			<img
				src='/images/cover-onboarding-1.jpg'
				width={150}
				height={150}
				alt='Profile Image'
				className='profile-image'
			/>
			<Details>
				<span>{userDetails.first_name + ' ' + userDetails.last_name}</span>
				<div className='sub-details'>
					<span>{`${userDetails.current_age},`}</span>
					<span>{`${userDetails.gender},`}</span>
					<span>{userDetails.current_location}</span>
				</div>
                   {userDetails.insta_id && 
                    <span className='insta' onClick={onInstagramClick}><InstagramIcon
                    htmlColor={'#7e33ca'}
                />
                {userDetails.insta_id}</span>}
        
				{/* <span className='bio'>{userDetails.user_bio}</span> */}
                <span className='bio'>{`daljdhgaudhaldjsajd  as;'djasoidjasoi udhjasio dhjasopdasdasd`}</span>
			</Details>
		</Parent>
	);
};

export default ProfilePreview;

const Parent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	align-items: center;
	justify-content: center;
    gap: 30px;
    font-size: 18px;
    color: #242424;
	.profile-image {
		border-radius: 50%;
	}
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: center;
    gap: 10px;
    font-weight: 600;

    .sub-details {
        display: flex;
        gap: 12px;
        font-weight: 600;
    }
    .bio {
        margin-top: 8px;
        font-size: 16px;
        text-align: center;
        font-weight: 400;
    }
    .insta {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 5px;
        color: #7e33ca;
    }

`;
