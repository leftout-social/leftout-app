import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { verifyEmail } from '~/services/auth-service';
const VerifyEmail = () => {
    const router = useRouter();
    const [verified, setVerified] = useState<boolean>(false);
    const {token} = router.query;
    useEffect(() => {
        (async() => {
            try {
                const status = await verifyEmail(token);
                if(status === 200) {
                    setVerified(true)
                    router.push('/login');
                }
            }
            catch(e){
                console.error(e);
            }
            
        })()
    }, [token])
    return (
        <div>
            {verified && <span>Email verified!, Redirecting...</span>}
        </div>
    );
}

export default VerifyEmail;