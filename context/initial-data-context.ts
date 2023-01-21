import {createContext} from 'react';

import {ToastItem} from '../components/Toast';
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
        onClose: () => { },
    },
    toastHandler: () => { },
}
export type GlobalData = {
    deviceWidth: number;
    toast: ToastProps;
    userData: any;
}

const InitalDataContext = createContext<GlobalData>({
    deviceWidth: 0,
    toast: ToastDefaultValue,
    userData: {},

});

export default InitalDataContext;