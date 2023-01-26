import styled from "styled-components";
import { Fragment, useState, useEffect} from "react";
import {useRouter} from "next/router";

interface BottomTabsProps {
    openNewPostDrawer: () => void;
}
export type TABS_ENTITY = {
    id: number;
    inActiveIcon: string;
    activeIcon: string;
    title: string;
    path?: string;
}
const BottomNavbar = ({openNewPostDrawer}:BottomTabsProps) => {
    const router = useRouter();
    const path = router.pathname;
    const [currentTab, setCurrentTab] = useState<number>(1);
    const tabs: TABS_ENTITY[] = [
        {
            id: 1,
            inActiveIcon: '/nav/inactive-home.svg',
            activeIcon: '/nav/active-home.svg',
            title: 'Home',
            path: '/',
        },
        {
            id: 2,
            inActiveIcon: '/nav/mypost-inactive.svg',
            activeIcon: '/nav/mypost-active.svg',
            title: 'Home',
            path: '/',
        },
        {
            id: 3,
            inActiveIcon: '/nav/active-new.svg',
            activeIcon: '/nav/active-new.svg',
            title: 'Home',
        },
        {
            id: 4,
            inActiveIcon: '/nav/inactive-notification.svg',
            activeIcon: '/nav/active-notification.svg',
            title: 'Home',
            path: '/',
        },
        {
            id: 5,
            inActiveIcon: '/nav/inactive-profile.svg',
            activeIcon: '/nav/active-profile.svg',
            title: 'Home',
            path: '/profile',
        },
    ]
    const onTabChange = async(tab: number, path?: string) => {
        if(tab !== 3) {
          setCurrentTab(tab)
            if(path) return await router.push(path)
        }
        else openNewPostDrawer();
    }
    const tabMapWithPath = (path: string) => {
        let list = {
            '/profile': 5,
            '/': 1,
        }
        //@ts-ignore
        return list[path];
    }
    useEffect(() => {
        const currpath = tabMapWithPath(path)
        setCurrentTab(currpath as number);
    }, [path])
    return (
        <NavigationContainer>
            {tabs.map(({id, inActiveIcon, activeIcon, title, path}) => {
                return (
                    <Fragment key={id}>
                        <IconContainer addIcon={id == 3} onClick={() => onTabChange(id, path)}>
                            <img src={currentTab === id ? activeIcon : inActiveIcon} key={id}
                                 alt={title}
                                 className='icon'/>
                        </IconContainer>
                    </Fragment>
                )
            })}
        </NavigationContainer>
    )
}
export default BottomNavbar;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px -1px 30px rgba(138, 149, 158, 0.2);
  height: 80px;
`;

const IconContainer = styled.div<{ addIcon: boolean }>`
  .icon {
    @media (max-width: 500px){
      height: 30px;
      width: 30px;
    }
    height: 40px;
    width: 40px;
  }
 
  position: relative;
  top: ${(props) => props.addIcon ? '-2em' : 0};
  height: ${(props) => props.addIcon && '80px'};
  width: ${(props) => props.addIcon && '80px'};
  background: ${(props) => props.addIcon && 'linear-gradient(270.95deg, #888BF4 0%, #5151C6 100%)'};
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => props.addIcon && '10px solid #F1F1FE'}

`;