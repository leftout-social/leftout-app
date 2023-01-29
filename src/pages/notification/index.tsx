import { useContext, useEffect } from "react";
import InitalDataContext from "~/context/initial-data-context";
import { getUpdates } from "~/services/auth-service";

const Notification = () => {
    const {userData} = useContext(InitalDataContext);
    const fetchNotifications = async() => {
        try {
            const data = await getUpdates(userData.id)
            console.log(data);
        }
        catch(err){
            console.error(err);
        }
    }
    
    useEffect(() => {
        (async() => await fetchNotifications())();
    }, [])
    return (
        <div>Notifications</div>
    )
}
export default Notification;