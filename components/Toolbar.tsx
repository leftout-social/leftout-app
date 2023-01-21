import styled from "styled-components";
import {IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
interface ToolbarProps {
    onBackClick: () => void;
    onRightButtonClick?: () => void;
    rightButtonJSX?:  JSX.Element | JSX.Element[];
}
const Toolbar = ({onBackClick, onRightButtonClick, rightButtonJSX}: ToolbarProps) => {
    return (
        <ToolbarContainer>
            <IconButton onClick={onBackClick} className='icon-btn'>
                <ArrowBackIcon htmlColor='#42C2FF'/>
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
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  .icon-btn {
    background: #f1f1f1;
    border: 1px solid #42C2FF;
  }
  .icon-btn-right {
    background: #ffc6c4;
  }
  
    
`;