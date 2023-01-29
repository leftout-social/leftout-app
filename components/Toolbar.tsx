import styled from "styled-components";
import {IconButton} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
interface ToolbarProps {
    onLeftButtonClick: () => void;
    onRightButtonClick?: () => void;
    rightButtonJSX?:  JSX.Element | JSX.Element[];
    leftButtonJSX?: JSX.Element | JSX.Element[];
}
const Toolbar = ({onLeftButtonClick, onRightButtonClick, rightButtonJSX, leftButtonJSX = <ManageAccountsIcon htmlColor='#7e33ca' />}: ToolbarProps) => {
    return (
        <ToolbarContainer>
            <IconButton onClick={onLeftButtonClick} className='icon-btn'>
                {leftButtonJSX}
            </IconButton>
            {rightButtonJSX && <IconButton onClick={onRightButtonClick} className='icon-btn-right'>
                {rightButtonJSX}
            </IconButton>}
        </ToolbarContainer>
    )
}

export default Toolbar;

const ToolbarContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  .icon-btn {
    background: #F1F1FE;
  }
  .icon-btn-right {
    background: #ffc6c4;
  }
  
    
`;