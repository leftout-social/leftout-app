import * as React from 'react';
import { Drawer, DrawerProps } from '@mui/material';
import styled from 'styled-components';
import {useEffect, useState} from "react";

interface BottomDrawerProps extends DrawerProps {
    id: string;
    open: boolean;
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}

export const BottomDrawer = ({ ...props }: BottomDrawerProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(true);
    const closeHandler = () => {
        if (props.onClose) {
            props.onClose();
        }
        return;
    };
    useEffect(() => {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            setIsMobile(true)
        }else{
            setIsMobile(false);
        }
    }, [])
    return (
        <div>
            <React.Fragment key={props.id}>
                <StyledDrawer anchor={isMobile ? 'bottom' : 'left'} onClose={closeHandler}  {...props} isMobile={isMobile}>
                    <TopBar>
                        <div className='horizontal-bar'></div>
                    </TopBar>
                    <Content>{props.children}</Content>
                </StyledDrawer>
            </React.Fragment>
        </div>
    );
};

const StyledDrawer = styled(Drawer)<{isMobile: boolean}>`
    .MuiDrawer-paper {
        max-height: ${(props) => props.isMobile ? 'calc(100vh - 64px)' : '100%'};
        border-radius: ${(props) => props.isMobile ? '20px 20px 0 0' :'0 20ox 20px 0'};
        overflow: hidden;
        width: 100%;
        max-width: 500px;
    }
`;

const TopBar = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px 0;
    align-items: center;
    width: 100%;
    .horizontal-bar {
        width: 48px;
        height: 4px;
        background: #dbdbdb;
        border-radius: 2px;
    }
`;

const Content = styled.div`
    position: relative;
    height: 100%;
    overflow-y: auto;
`;