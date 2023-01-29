import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Toast, { ToastDefaultValue, ToastItem } from '~/components/Toast';
import InitalDataContext, { GlobalData } from '~/context/initial-data-context';
import { useRouter } from 'next/router';
import useDeviceWidth from '~/hooks/use-device-width';
import { getUserDetail } from '~/services/auth-service';
import Loading from '~/components/Loading';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { requestInterceptor, responseInterceptor } from '~/config/axios';
import BottomNavbar from '~/modules/nav/components/BottomNavbar';
import TopNavbar from '~/modules/nav/components/SideNavbar';
import { BottomDrawer } from '~/components/BottomDrawer';
import CreatePost from '~/modules/home/components/CreatePost';

export default function App({ Component, pageProps }: AppProps) {
	// @ts-ignore

	const { height, width } = useDeviceWidth();
	const [loading, setLoading] = useState<boolean>(true);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const router = useRouter();

	const [initalData, setInitialData] = useState<GlobalData>({
		deviceWidth: width,
		toast: { ...ToastDefaultValue },
		userData: {},
		userGeoLocation: {
			permission: false,
			data: {},
		},
	});
	const toastHandler = (item: ToastItem) => setToastItem(item);
	const [toastItem, setToastItem] = useState<ToastItem>({
		type: 'success',
		open: false,
		message: '',
	});
	const [openBottomDrawer, setOpenBottomDrawer] = useState<boolean>(false);
	const [userLocation, setUserLocation] = useState<any>({});
	const fetchUserDetails = async () => {
		setLoading(true);
		try {
			const id = await localStorage.getItem('leftout-id');
			const token = await localStorage.getItem('leftout-login');
			if (id && token) {
				const response = await getUserDetail(id);
				setInitialData({ ...initalData, userData: response.data });
			} else if (router.pathname !== '/reset') await router.push('/login');
		} catch (e) {
			console.error({ e });
			await router.replace('/login');
		}
		setLoading(false);
	};

	useEffect(() => {
		(async () => {
			await fetchUserDetails();
		})();
	}, []);
	const initalDataValue: GlobalData = {
		...initalData,
		toast: {
			item: toastItem,
			toastHandler,
		},
	};
	const successCallback = (position: any) => {
		setUserLocation(position);
	};
	const errorCallback = (error: any) => {
		setUserLocation({});
	};
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, []);
	useEffect(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, []);
	useEffect(() => {
		requestInterceptor();
		responseInterceptor(toastHandler);
	}, []);
	const openNewPostDrawer = () => setOpenBottomDrawer(true);
	const tabNotEligiblePath = [
		'/login',
		'/reset',
		'/onboarding',
		'/profile/feed',
	];
	return (
		<InitalDataContext.Provider value={initalDataValue}>
			{loading && <Loading />}
			{!loading && (
				<Container>
                    {!tabNotEligiblePath.includes(router.pathname) && (
							<SideNavContainer>
								<TopNavbar openNewPostDrawer={openNewPostDrawer} />
							</SideNavContainer>
						)}
					<Wrapper>
						<Component {...pageProps} />
						{!tabNotEligiblePath.includes(router.pathname) && (
							<NavContainer>
								<BottomNavbar
									openNewPostDrawer={openNewPostDrawer}
									position={'BOTTOM'}
								/>
							</NavContainer>
						)}
						{!tabNotEligiblePath.includes(router.pathname) && (
							<BottomDrawer
								id='post-drawer'
								open={openBottomDrawer}
								onClose={() => setOpenBottomDrawer(false)}
							>
								<CreatePost
									closeDrawer={() => {
										setOpenBottomDrawer(false);
									}}
									latitude={userLocation?.coords?.latitude || 20}
									longitude={userLocation?.coords?.longitude || 70}
								/>
							</BottomDrawer>
						)}
					</Wrapper>
				</Container>
			)}
			<Toast></Toast>
		</InitalDataContext.Provider>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: #f1f1fe;
	display: flex;
	gap: 1rem;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	max-width: 850px;
	margin: 0 auto;
`;
const NavContainer = styled.div`
	width: inherit;
	position: fixed;
	max-width: 850px;
	bottom: 0;
	z-index: 3;
    @media (min-width: 700px){
        display: none;
    }
`;

const SideNavContainer = styled.div`
    @media(max-width: 700px){
        display: none;
    }
	width: inherit;
	position: fixed;
    width: 100%;
	top: 0;
	z-index: 3;
`;
