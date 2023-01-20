import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Toast, { ToastDefaultValue, ToastItem } from '~/components/Toast';
import InitalDataContext, { GlobalData } from '~/context/initial-data-context';
import { useRouter } from 'next/router';
import useDeviceWidth from '~/hooks/use-device-width';
import {getUserDetail} from "~/services/auth-service";
import { Loading } from '@nextui-org/react';
import styled from "styled-components";
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
			const id = localStorage.getItem('leftout-id');
			if (id) {
				const response = await getUserDetail(id)
				if(response.status !== 200){
					await localStorage.clear()
					await router.push('/login')
				}
				console.log(response)
				setInitialData({ ...initalData, userData: response });
			} else if(router.pathname !== '/reset' ) await router.push('/login');
		} catch (e) {
			console.error({ e });
			await router.replace('/login')
		}
		setLoading(false)
	};
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
			{loading && <Container><Loading size='xl' color='currentColor' /></Container>}
			{!loading && <Component {...pageProps} />}
			<Toast></Toast>
		</InitalDataContext.Provider>
	);
}
const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #5252C7;
`;