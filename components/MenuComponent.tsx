import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
interface MenuComponentProps {
    menuItems: any[];
    onMenuClick: (selected: any) => void;
    selectedMenuItem?: number;
    targetElement: JSX.Element;
}
const MenuComponent = ({
                           menuItems,
                           onMenuClick,
                           selectedMenuItem,
                           targetElement,
                       }: MenuComponentProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onClick = (data: any) => {
        handleClose();
        onMenuClick(data);
    };
    const open = Boolean(anchorEl);
    return (
        <div>
            <div
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {targetElement}
            </div>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.id} onClick={() => onClick(item)}>
						<span
                            style={{
                                color: selectedMenuItem === item.id ? '#7e33ca' : '#000000',
                            }}
                        >
							{item.text}
						</span>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
export default MenuComponent;
