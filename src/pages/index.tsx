
import styled from 'styled-components';
import {Fragment, useContext, useEffect, useState} from 'react';
import {getAllFeeds} from "~/services/auth-service";
import { Loading } from '@nextui-org/react';
import FeedCard from "~/modules/home/components/FeedCard";
import InitalDataContext from '~/context/initial-data-context';

export default function Home() {
    const [feeds, setFeeds] = useState<any>();
    const [userLocation, setUserLocation] = useState<any>({});
    const {userData} = useContext(InitalDataContext);
    const [loading, setLoading] = useState<boolean>(false)
    const successCallback = (position: any) => {
        setUserLocation(position)
    };
    const errorCallback = (error: any) => {
        setUserLocation({})
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);
    const fetchFeeds = async() => {
        setLoading(true);
        try {
            const data = await getAllFeeds(userLocation?.coords?.latitude || 20, userLocation?.coords?.longitude || 70);
            setFeeds(data.data)
            setLoading(false)
        }
        catch (error){
            console.error(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        (async() => await fetchFeeds())();
    }, [])
    return (
        <Parent>
          <div className='scroll-container'>
              {loading && <Loading size='xl' />}
              {!loading && feeds && feeds.filter((item: any) => item.user_id !== userData.id ).map((item: any) => {
                return(
                  <Fragment key={item.feed_id}>
                      <FeedCard {...item} self={false} />
                  </Fragment>
              )})}
            </div>

        </Parent>
    );
}
const Parent = styled.div`
  height: 100%;
  width: 100%;
  background:  #F6F7F9;
  .scroll-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 700px){
        padding: 7rem 1rem 2rem 1rem;
    }
    @media(max-width: 700px){
        padding: 2rem 1rem 7rem 1rem;
    }
  
    background:  #F6F7F9;
  }
  .add {
    position: sticky;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 2px solid #42C2FF;
    color: #000000;
    font-weight: bold;
    background: #ffffff;
    font-size: 20px;
    width: 200px;
    float: right;
    bottom: 5%;
    right: 5%;
    z-index: 1000;
  }
`;
// const NavContainer = styled.div`
//   width: inherit;
//   position: fixed;
// 	max-width: 900px;
//   bottom: 0;
//   z-index: 3;
// `;