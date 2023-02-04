import styled from "styled-components";
import {Loading} from '@nextui-org/react';
interface CircularLoaderProps {
    screenHeight?: string;
    screenWidth?: string;
}
const CircularLoader = ({screenHeight='100%', screenWidth='100%'}: CircularLoaderProps) => {
    return (
            <LoadingWrapper height={screenHeight} width={screenWidth}>
                <Loading type='default' size='sm' />
            </LoadingWrapper>
    )
}
export default CircularLoader;

const LoadingWrapper = styled.div<{height: string, width: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;