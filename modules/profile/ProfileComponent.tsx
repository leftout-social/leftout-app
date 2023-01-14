import styled from "styled-components";
import {User} from "@nextui-org/react";
interface ProfileComponentProps {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    currentCity: string;
}
const ProfileComponent = ({firstName, lastName, age, gender, currentCity}: ProfileComponentProps) => {
    return (
        <ProfileContainer>
            <User
                bordered
                src='/images/images.jpg'
                size='2000px'
                name=''
            />
            <Card>
                <span><b>Name :</b> {firstName + ' ' + lastName}</span>
                <span><b>Age :</b> {age}</span>
                <span><b>Gender : </b>{gender}</span>
                <span><b>Currently located at :</b> {currentCity}</span>
            </Card>
            <Divider />
            <span className='recent-posts-heading'>Recent Travel Posts</span>
            <Card>
                <span><b>Name :</b> {firstName + ' ' + lastName}</span>
                <span><b>Age :</b> {age}</span>
                <span><b>Gender : </b>{gender}</span>
                <span><b>Currently located at :</b> {currentCity}</span>
            </Card>
            <Card>
                <span><b>Name :</b> {firstName + ' ' + lastName}</span>
                <span><b>Age :</b> {age}</span>
                <span><b>Gender : </b>{gender}</span>
                <span><b>Currently located at :</b> {currentCity}</span>
            </Card>
            <Card>
                <span><b>Name :</b> {firstName + ' ' + lastName}</span>
                <span><b>Age :</b> {age}</span>
                <span><b>Gender : </b>{gender}</span>
                <span><b>Currently located at :</b> {currentCity}</span>
            </Card>
        </ProfileContainer>
    )
}

export default ProfileComponent;

const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  align-items: center;
  background: #f5f5f5;
  span {
    @media (min-width: 500px){
      font-size: 20px;
    }
  }
  .recent-posts-heading {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    width: 100%;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-shadow: #42C2FF 0px 2px 8px 0px;
  background: #ffffff;
  border-radius: 1rem;
    
`;

const Divider = styled.div`
  height: 5px;
  width: 100%;
  background: #42C2FF;
    
`;