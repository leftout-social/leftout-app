import styled from 'styled-components';
import Toolbar from '~/components/Toolbar';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileComponent from '~/modules/profile/ProfileComponent';
import { useContext } from 'react';
import InitalDataContext from '~/context/initial-data-context';
import Cookies from "js-cookie";
const Profile = () => {
	const router = useRouter();
	const { userData } = useContext(InitalDataContext);
	console.log(userData)
	const logout = async() => {
		await localStorage.clear();
		await Cookies.remove('leftout-login');
		window.location.href = '/login';
	};
	return (
		<Parent>
			<div className='fixed-header'>
				<Toolbar
					onBackClick={() => router.push('/')}
					onRightButtonClick={logout}
					rightButtonJSX={<LogoutIcon color='error' />}
				/>
			</div>
			<div className='scroll-container'>
				<ProfileComponent
					currentCity={userData?.current_location}
					gender={userData?.gender}
					firstName={userData?.first_name}
					lastName={userData?.last_name}
					age={userData?.current_age}
				/>
			</div>
		</Parent>
	);
};

const Parent = styled.div`
	height: 100%;
	width: 100%;
	max-width: 850px;
	margin: 0 auto;
	position: relative;
	.fixed-header {
		position: fixed;
		width: 100%;
		max-width: 850px;
		margin: 0 auto;
		top: 0;
	}
`;

export default Profile;
