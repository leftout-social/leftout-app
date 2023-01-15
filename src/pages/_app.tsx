import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Toast, { ToastDefaultValue, ToastItem } from '~/components/Toast';
import InitalDataContext, { GlobalData } from '~/context/initial-data-context';
import axios from 'axios';
import { useRouter } from 'next/router';
import useDeviceWidth from '~/hooks/use-device-width';
export default function App({ Component, pageProps }: AppProps) {
	// @ts-ignore
	const { height, width } = useDeviceWidth();
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
		try {
			const localData = localStorage.getItem('user');
			if (localData) {
				const parsedata = JSON.parse(localData!);
				const response = await axios.get(`/api/get-user?id=${parsedata?.id}`);
				setInitialData({ ...initalData, userData: response.data[0] });
			} else router.push('/login');
		} catch (e) {
			console.error({ e });
		}
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
			<Component {...pageProps} />
			<Toast></Toast>
		</InitalDataContext.Provider>
	);
}
