import styled from 'styled-components';
import Toolbar from '~/components/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileComponent from '~/modules/profile/ProfileComponent';
import {useContext, useState} from 'react';
import InitalDataContext from '~/context/initial-data-context';
import Cookies from "js-cookie";
import {BottomDrawer} from "~/components/BottomDrawer";
import {Button} from "@nextui-org/react";

const Profile = () => {
    const [logout, setLogout] = useState<boolean>(false);
    const {userData} = useContext(InitalDataContext);
    const onLogoutClick = async () => {
        setLogout(true);
    };
    const confirmLogout = async () => {
        await localStorage.clear();
        await Cookies.remove('leftout-login');
        window.location.href = '/login';
    }
    const editProfile = () => {
        console.log('edit triggered')
    }
    return (
        <Parent>
            <div className='fixed-header'>
                <Toolbar
                    onLeftButtonClick={editProfile}
                    onRightButtonClick={onLogoutClick}
                    rightButtonJSX={<LogoutIcon color='error'/>}
                />
            </div>
            <div className='scroll-container'>
                <ProfileComponent
                    currentCity={userData?.current_location}
                    gender={userData?.gender}
                    firstName={userData?.first_name}
                    lastName={userData?.last_name}
                    age={userData?.current_age}
                    insta_id={userData?.insta_id}
                />
            </div>
            <div className='bottom-drawer'>
                <BottomDrawer id='logout' open={logout}>
                    <DrawerParent>
                        <Button onClick={() => setLogout(false)} className='cancel'>Cancel</Button>
                        <Button onClick={confirmLogout} className='confirm'>Logout</Button>
                    </DrawerParent>
                </BottomDrawer>
            </div>
           
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
  }
  .scroll-container {
    width: inherit;
    padding: 5rem 1rem 8rem 1rem;
    background: #ffffff;
  }
  .bottom-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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
