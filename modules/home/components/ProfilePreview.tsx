import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserDetail } from "~/services/auth-service";

const ProfilePreview = (userId: any) => {
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        (async () => {
            const response  = await getUserDetail(userId.userId);
            console.log(response.data);
            setUserDetails(response.data);
        })()
    }, [])

    return (
        <Parent>
            <h1>Profile preview</h1>
        </Parent>
    )
}

export default ProfilePreview;

const Parent = styled.div`
    display: flex;
`;