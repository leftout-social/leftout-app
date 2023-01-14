import styled from "styled-components";
import dynamic from "next/dynamic";
const OnboardingForm = dynamic(() => import('../../modules/onboarding/components/OnboardingForm'), {ssr: false})
const Onboarding = () => {
    return (
        <Container>
            <FormContainer>
                <OnboardingForm />
            </FormContainer>
        </Container>
    );
}
export default Onboarding;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background-image: url("/images/cover-onboarding-1.jpg");
`

const FormContainer = styled.div`
  box-shadow: #42C2FF 0px 2px 8px 0px;
  border-radius: 1rem;
  width: 80%;
  max-width: 700px;
  //height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
`;