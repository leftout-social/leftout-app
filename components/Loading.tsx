import styled from "styled-components";
import {LottieAnimation} from "~/components/LottieAnimation";

interface LoaderProps {
    loadingJson?: string;
}
const Loader = ({loadingJson = 'https://assets5.lottiefiles.com/packages/lf20_cPIWGr.json'}: LoaderProps) => {
    return (
        <Parent>
            <LoadingWrapper>
                <LottieAnimation animationJson={loadingJson} />
            </LoadingWrapper>
        </Parent>
    )
}
export default Loader;

const Parent = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;