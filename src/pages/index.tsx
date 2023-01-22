
import styled from 'styled-components';
import {Fragment, useEffect, useState} from 'react';
import {getAllFeeds} from "~/services/auth-service";
import FeedCard from "~/modules/home/components/FeedCard";
import Loading from "~/components/Loading";

export default function Home() {
    const [feeds, setFeeds] = useState<any>();
    const [userLocation, setUserLocation] = useState<any>({});
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
            const data = await getAllFeeds(userLocation.coords.latitude, userLocation.coords.longitude);
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
    }, [userLocation])
    return (
        <Parent>
          <div className='scroll-container'>
              {loading && <Loading />}
              {!loading && feeds && feeds.map((item: any) => (
                  <Fragment key={item.feed_id}>
                      <FeedCard {...item} />
                  </Fragment>
              ))}
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
    gap: 2rem;
    padding: 2rem 1rem 8rem 1rem;
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