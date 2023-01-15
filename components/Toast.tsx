import { Snackbar, Alert } from '@mui/material';
import { useContext } from 'react';

import InitalDataContext from '~/context/initial-data-context';
export interface ToastItem {
	autoHideDuration?: number;
	message: string | JSX.Element;
	onClose?: () => void;
	open: boolean;
	type: 'error' | 'success' | 'warning' | 'info';
}

export interface ToastProps {
	item: ToastItem;
	toastHandler: (item: ToastItem) => void;
}

export const ToastDefaultValue: ToastProps = {
	item: {
		autoHideDuration: 100,
		message: '',
		open: false,
		type: 'success',
		onClose: () => {},
	},
	toastHandler: () => {},
};
const Toast = () => {
	const { toast } = useContext(InitalDataContext);
	if (!toast.item.message) return null;

	return (
		<Snackbar
			open={toast.item.open}
			autoHideDuration={toast.item.autoHideDuration}
			onClose={() => {
				toast.toastHandler({ ...toast.item, open: false });
			}}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert severity={toast.item.type} sx={{ width: '100%' }}>
				{toast.item.message}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
