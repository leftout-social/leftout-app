import styled from 'styled-components';
import { Fragment, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import InitalDataContext from '~/context/initial-data-context';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { BottomDrawer } from '~/components/BottomDrawer';
import { Button } from '@nextui-org/react';
export type TABS_ENTITY = {
	id: number;
	inActiveIcon: string;
	activeIcon: string;
	title: string;
	path?: string;
};
interface TopNavbar {
    openNewPostDrawer: () => void;
}
const TopNavbar = ({openNewPostDrawer}: TopNavbar) => {
	const router = useRouter();
	const { userData } = useContext(InitalDataContext);
    const [logout, setLogout] = useState<boolean>(false);
	const path = router.pathname;
	const [currentTab, setCurrentTab] = useState<number>(1);
	const tabs: TABS_ENTITY[] = [
		{
			id: 1,
			inActiveIcon: '/nav/inactive-home.svg',
			activeIcon: '/nav/active-home.svg',
			title: 'Home',
			path: '/',
		},
		{
			id: 2,
			inActiveIcon: '/nav/mypost-inactive.svg',
			activeIcon: '/nav/mypost-active.svg',
			title: 'Explore',
			path: '/',
		},
		{
			id: 3,
			inActiveIcon: '/nav/active-new.svg',
			activeIcon: '/nav/active-new.svg',
			title: 'Add Post',
		},
		{
			id: 4,
			inActiveIcon: '/nav/inactive-notification.svg',
			activeIcon: '/nav/active-notification.svg',
			title: 'Notifications',
			path: '/notification',
		},
		{
		    id: 5,
		    inActiveIcon: '/nav/inactive-profile.svg',
		    activeIcon: '/nav/active-profile.svg',
		    title: 'Profile',
		    path: '/profile',
		},
	];
	const onTabChange = async (tab: number, path?: string) => {
		if (tab !== 3) {
			setCurrentTab(tab);
			if (path) return await router.push(path);
		}
		else openNewPostDrawer();
	};
	const tabMapWithPath = (path: string) => {
		let list = {
			'/profile': 5,
			'/': 1,
		};
		//@ts-ignore
		return list[path];
	};
    const onLogoutClick = async () => {
        setLogout(true);
    };
    const confirmLogout = async () => {
        await localStorage.clear();
        window.location.href = '/login';
    }
	useEffect(() => {
		const currpath = tabMapWithPath(path);
		setCurrentTab(currpath as number);
	}, [path]);
	return (
		<SideNavContainer>
			<ProfileContainer onClick={() => onTabChange(1)}>
				<img
					src='nav/nav-logo.svg'
					height='70'
					width='100'
					alt='profile-img'
					id='profile-img'
				/>
			</ProfileContainer>
            <MenuContainer>
			{tabs.map(({ id, inActiveIcon, activeIcon, title, path }) => {
				return (
					<Fragment key={id}>
						<IconContainer
							addIcon={id == 3}
							onClick={() => onTabChange(id, path)}
							selected={id === currentTab}
						>
							<img
								src={currentTab === id ? activeIcon : inActiveIcon}
								key={id}
								alt={title}
								className='icon'
							/>
							<span>{title}</span>
						</IconContainer>
					</Fragment>
				);
			})}
            </MenuContainer>
            <ProfileContainer>
            <IconButton onClick={onLogoutClick} className='icon-btn-right'>
            <LogoutIcon color='error'/>
            </IconButton>
                </ProfileContainer>
                <BottomDrawer id='logout' open={logout}>
                    <DrawerParent>
                        <Button onClick={() => setLogout(false)} className='cancel'>Cancel</Button>
                        <Button onClick={confirmLogout} className='confirm'>Logout</Button>
                    </DrawerParent>
                </BottomDrawer>
		</SideNavContainer>
	);
};

export default TopNavbar;

const SideNavContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 1rem;
	background-color: #ffffff;
	border-radius: 1rem;
	gap: 2rem;
	align-items: center;
	padding: 1rem;
	width: 100%;
	height: 80px;
`;
const IconContainer = styled.div<{ addIcon: boolean; selected: boolean }>`
    cursor: pointer;
	padding: 1rem;
	gap: 8px;
	border-radius: 6px;
	display: flex;
	align-items: center;
	// background: ${(props) => (props.selected ? '#ebe6f3' : '#f2f2f2')};
	color: ${(props) => (props.selected ? '#7e33ca' : '#000000')};
`;

const ProfileContainer = styled.div`
    cursor: pointer;
	display: flex;
	gap: 5px;
	align-items: center;
	#profile-img {
		border-radius: 50%;
	}
	#name {
		color: #7e33ca;
		font-size: 22px;
		font-weight: bold;
	}
`;

const MenuContainer = styled.div`
    display: flex;
    gap: 6px;
`;
const DrawerParent = styled.div`
    display: flex;
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