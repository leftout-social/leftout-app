import styled from "styled-components";
import dayjs from "dayjs";

export interface FeedCardProps {
    profileImage: string;
    first_name: string;
    created_at: string;
    travel_start_date: string;
    travel_end_date: string;
    travel_medium: string;
    travelling_to_location: string;
    required_travellers: number;
    required_travellers_gender: string;
    feed_id: string
    user_id: string
    interested: string[]
    likes: string[]
    additional_description: string;
}
const FeedCard = ({...props}: FeedCardProps) => {
    return (
        <CardContainer>
            <ProfileContainer>
                <div className='name-avatar'>
                <img
                    src='/cardImage/beach-1.jpg'
                    width={30}
                    height={30}
                    className='profile-image'
                />
                    <span className='name'>{props.first_name}</span>
                </div>
                <span className='time'>{dayjs(props.created_at).format('MMM DD')}</span>
            </ProfileContainer>
            <ContentContainer>
                <Details>
                    <div className='items'>
                        <span id='key'>Trip to : </span>
                        <span id='value'>{props.travelling_to_location}</span>
                    </div>
                    <div className='items'>
                        <span id='key'>Looking for peoples :  </span>
                        <span id='value'>#{props.required_travellers}</span>
                    </div>
                    <div className='items'>
                        <span id='key'>Applicable gender : </span>
                        <span id='value'>{props.required_travellers_gender}</span>
                    </div>
                    <div className='items'>
                        <span id='key'>Trip Medium : </span>
                        <span id='value'>{props.travel_medium}</span>
                    </div>
                    <Description>
                        <span dangerouslySetInnerHTML={{__html: props.additional_description}} id='value'/>
                    </Description>
                </Details>
                <Dates>
                    <DateContainer>
                        <span>{dayjs(props.travel_start_date).format('DD')}</span>
                        <span>{dayjs(props.travel_start_date).format('MMM')}</span>
                    </DateContainer>
                    &darr;
                    <DateContainer>
                        <span>{dayjs(props.travel_end_date).format('DD')}</span>
                        <span>{dayjs(props.travel_end_date).format('MMM')}</span>
                    </DateContainer>
                </Dates>
            </ContentContainer>
            <ProfileContainer>
                <img
                    src='/interested.svg'
                    width={20}
                    height={20}
                    alt='in-icon'
                />
                <img
                    src='/like.svg'
                    width={20}
                    height={20}
                    alt='like-icon'
                />
            </ProfileContainer>
        </CardContainer>
    )
}
export default FeedCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  border-radius: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #FFFFFF;
  padding: 10px 14px;
  .name-avatar {
    display: flex;
    gap: 8px;
    align-items: center;
    .profile-image {
      border-radius: 50%;
    }
    .name {
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 150%;
      letter-spacing: -0.2px;
      color: #242424;
  
    }
  }
 
  .time {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    text-align: right;
    letter-spacing: -0.1px;

    /* Text/Placeholder */

    color: #BDBDBD;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: inherit;
  background: #ebe6f3;
  padding: 10px 14px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  .items {
    display: flex;
    gap: 5px;
    align-items: center;
    #key {
      color: #7e33ca;
      font-weight: bold;
      font-size: 18px;
    }
  }
`;
const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  color: #7e33ca;
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: 1px solid #42C2FF;
  background: conic-gradient(from 315deg, #E8310A, #D39472);
  border-radius: 10px;
  color: #ffffff;
`;
const Description = styled.div`
  padding: 6px;
  background: #ffffff;
  border: 1px solid #7e33ca;
  border-radius: 6px;
`;