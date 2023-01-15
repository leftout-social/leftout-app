import * as React from 'react';
import { Drawer } from '@mui/material';
import styled from 'styled-components';

interface DrawerProps {
    id: string;
    open: boolean;
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}

export const BottomDrawer = ({ id, open, children, onClose }: DrawerProps) => {
    const closeHandler = () => {
        if (onClose) {
            onClose();
        }
        return;
    };

    return (
        <div>
            <React.Fragment key={id}>
                <StyledDrawer anchor='bottom' open={open} onClose={closeHandler}>
                    <TopBar>
                        <div className='horizontal-bar'></div>
                    </TopBar>
                    <Content>{children}</Content>
                </StyledDrawer>
            </React.Fragment>
        </div>
    );
};

const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        max-height: calc(100vh - 64px);
        border-radius: 20px 20px 0 0;
        overflow: hidden;
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