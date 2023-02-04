import { useContext, useEffect, useState } from "react";
import InitalDataContext from "~/context/initial-data-context";
import { getUpdates } from "~/services/auth-service";
import styled from 'styled-components';
import CircularLoader from "~/components/CircularLoader";
const Notification = () => {
    const {userData} = useContext(InitalDataContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>([]);
    const fetchNotifications = async() => {
        setLoading(true);
        try {
            const data = await getUpdates(userData.id)
            console.log(data);
            setLoading(false);
        }
        catch(err){
            console.error(err);
            setLoading(false);
        }
    }
    useEffect(() => {
        (async() => await fetchNotifications())();
    }, [])
    return (
        <Parent>
            {loading && <CircularLoader />}
            
        </Parent>
    )
}
export default Notification;
const Parent = styled.div`
	height: 100%;
	width: 100%;
	background: #f6f7f9;
`