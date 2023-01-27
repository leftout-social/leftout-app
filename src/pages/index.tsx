
import styled from 'styled-components';
import {Fragment, useContext, useEffect, useState} from 'react';
import {getAllFeeds} from "~/services/auth-service";
import FeedCard from "~/modules/home/components/FeedCard";
import Loading from "~/components/Loading";
import InitalDataContext from '~/context/initial-data-context';

export default function Home() {
    const [feeds, setFeeds] = useState<any>();
    const {userData} = useContext(InitalDataContext);
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
              {loading && <Loading />}
              {!loading && feeds && feeds.filter((item: any) => item.user_id !== userData.id ).map((item: any) => {
                console.log(item, '->', userData.id);
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
    padding: 1.5rem 1rem 8rem 1rem;
    background:  #F6F7F9;
  }

  //
  //.fixed-header {
  //  position: fixed;
  //  width: 100%;
  //  max-width: 850px;
  //  margin: 0 auto;
  //  top: 0;
  //  z-index: 20;
  //}

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