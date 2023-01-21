
// import Tabs from '~/modules/home/components/Tabs';
import styled from 'styled-components';
import {DummyFeedList} from '~/modules/home/utils';
import {Fragment} from 'react';
import TravelPostCard from '~/components/TravelPostCard';
// import AddIcon from '@mui/icons-material/Add';
// import { BottomDrawer } from '~/components/BottomDrawer';
// import CreatePost from '~/modules/home/components/CreatePost';
// import BottomNavbar from "~/modules/nav/components/BottomNavbar";

export default function Home() {
    //const [openBottomDrawer, setOpenBottomDrawer] = useState<boolean>(false);
    // const [currentTab, setCurrentTab] = useState<number>(1);

    return (
        <Parent>
            {/*<div className='fixed-header'>*/}
            {/*	<Tabs />*/}
            {/*</div>*/}
          <div className='scroll-container'>
                {DummyFeedList.map((item) => (
                    <Fragment key={item.id}>
                        <TravelPostCard {...item} self={false}/>
                    </Fragment>
                ))}
            </div>
            {/*<div className='add' onClick={() => setOpenBottomDrawer(true)}>*/}
            {/*    <AddIcon />*/}
            {/*</div>*/}
            {/*<BottomDrawer id='post-drawer' open={openBottomDrawer}>*/}
            {/*    <CreatePost closeDrawer={() => setOpenBottomDrawer(false)}/>*/}
            {/*</BottomDrawer>*/}
            {/*<NavContainer>*/}
            {/*    <BottomNavbar currentTab={currentTab} setTab={setCurrentTab}/>*/}
            {/*</NavContainer>*/}

        </Parent>
    );
}
const Parent = styled.div`
  height: 100%;
  width: 100%;
  .scroll-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 2rem 8rem 2rem;
    background: #ffffff;
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