import styled from 'styled-components';
import Toolbar from '~/components/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileComponent from '~/modules/profile/ProfileComponent';
import {useContext, useState, useEffect} from 'react';
import InitalDataContext from '~/context/initial-data-context';
import Cookies from "js-cookie";
import {BottomDrawer} from "~/components/BottomDrawer";
import {Button, Loading} from "@nextui-org/react";
import EditProfile from '~/modules/profile/EditProfile';
import { getUserDetail } from '~/services/auth-service';
import CircularLoader from '~/components/CircularLoader';

const Profile = () => {
    const [logout, setLogout] = useState<boolean>(false);
    const [openEditBottomDrawer, setOpenEditBottomDrawer] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const {userData} = useContext(InitalDataContext);
    const onLogoutClick = async () => {
        setLogout(true);
    };
    const fetchUserData = async() => {
        try {
            setLoading(true);
            const data = await getUserDetail(userData.id);
            setUserDetails(data['data']);
            setLoading(false);
            setOpenEditBottomDrawer(false);
        }
        catch(e){
            setLoading(false);
            console.error(e);
        }
    }
    const confirmLogout = async () => {
        await localStorage.clear();
        await Cookies.remove('leftout-login');
        window.location.href = '/login';
    }
    useEffect(() => {
        (async() => await fetchUserData())();
    }, [])

    return (
        <Parent>
            <div className='fixed-header'>
                <Toolbar
                    onLeftButtonClick={() => setOpenEditBottomDrawer(true)}
                    onRightButtonClick={onLogoutClick}
                    rightButtonJSX={<LogoutIcon color='error'/>}
                />
            </div>
            <div className='scroll-container'>
                {loading && <CircularLoader />}
                {!loading && <ProfileComponent
                    currentCity={userDetails?.current_location}
                    gender={userDetails?.gender}
                    firstName={userDetails?.first_name}
                    lastName={userDetails?.last_name}
                    age={userDetails?.current_age}
                    insta_id={userDetails?.insta_id}
                    bio={userDetails?.user_bio}
                    profile_image_url={userDetails?.profile_image_url}
                    callback={fetchUserData}
                />}
            </div>
                <BottomDrawer id='logout' open={logout}>
                    <DrawerParent>
                        <Button onClick={() => setLogout(false)} className='cancel'>Cancel</Button>
                        <Button onClick={confirmLogout} className='confirm'>Logout</Button>
                    </DrawerParent>
                </BottomDrawer>
                <BottomDrawer id='profile-preview' open={openEditBottomDrawer} onClose={() => setOpenEditBottomDrawer(false)}>
                    <EditProfile callback={fetchUserData} userData={userDetails} closeDrawer={() => setOpenEditBottomDrawer(false)}/>
                </BottomDrawer>
        </Parent>
    );
};

const Parent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background: #ffffff;
  .fixed-header {
    position: fixed;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    top: 0;
    background: #ffffff;
    z-index: 100;
    @media(min-width: 700px){
        display: none;
    }
  }
  .scroll-container {
    width: inherit;
    padding: 4rem 1rem 8rem 1rem;
    background: #ffffff;
  }
`;
const DrawerParent = styled.div`
    display: flex;
    width: 100vw;
    justify-content: space-around;
	padding: 1rem;
	gap: 5px;
	.cancel {
		background: #f2f2f2;
		color: #000000;
	}
	.confirm {
		background: lightcoral;
	}

`;
export default Profile;
