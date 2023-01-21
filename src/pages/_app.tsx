import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Toast, { ToastDefaultValue, ToastItem } from '~/components/Toast';
import InitalDataContext, { GlobalData } from '~/context/initial-data-context';
import { useRouter } from 'next/router';
import useDeviceWidth from '~/hooks/use-device-width';
import {getUserDetail} from "~/services/auth-service";
import Loading from "~/components/Loading";
import styled from "styled-components";
import Cookies from "js-cookie";
import {requestInterceptor, responseInterceptor} from "~/config/axios";

export default function App({ Component, pageProps }: AppProps) {
	// @ts-ignore

	const { height, width } = useDeviceWidth();
	const [loading, setLoading] = useState<boolean>(true)
	const router = useRouter();
	const [initalData, setInitialData] = useState<GlobalData>({
		deviceWidth: width,
		toast: { ...ToastDefaultValue },
		userData: {},
	});
	const toastHandler = (item: ToastItem) => setToastItem(item);
	const [toastItem, setToastItem] = useState<ToastItem>({
		type: 'success',
		open: false,
		message: '',
	});
	const fetchUserDetails = async () => {
		setLoading(true)
		try {
			const id = await localStorage.getItem('leftout-id');
			const token = await Cookies.get('leftout-login')
			if (id && token) {
				const response = await getUserDetail(id)
				setInitialData({ ...initalData, userData: response.data });
			} else if(router.pathname !== '/reset' ) await router.push('/login');
		} catch (e) {
			console.error({ e });
			await router.replace('/login')
		}
		setLoading(false)
	};
	useEffect(() => {
		requestInterceptor();
		responseInterceptor();
	}, [])
	useEffect(() => {
		(async () => await fetchUserDetails())();
	}, []);
	const initalDataValue: GlobalData = {
		...initalData,
		toast: {
			item: toastItem,
			toastHandler,
		},
	};
	return (
		<InitalDataContext.Provider value={initalDataValue}>
			{loading && <Loading />}
			{!loading && <Container><Wrapper><Component {...pageProps} /></Wrapper></Container>}
			<Toast></Toast>
		</InitalDataContext.Provider>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	background:#F1F1FE;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	max-width: 900px;
	margin: 0 auto;
	background: #ffffff;
`;