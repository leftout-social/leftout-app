import styled from "styled-components";
import {tagBackgroundFinder} from "~/modules/home/utils";
import dayjs from "dayjs";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
interface TravelPostCardProps {
    id: string
    name: string
    goingTo: string
    goingOnDate: string
    travelMedium: string
    description: string
    interested: string[],
    tag: 'MOUNTAIN' | 'BEACH'
    tripStartDate?: string
    tripEndDate?: string
    self: boolean;
}
const TravelPostCard = ({id, name, goingTo, travelMedium, goingOnDate, interested, description,
    tag,tripStartDate, tripEndDate, self,
                        }: TravelPostCardProps) => {
    const getTagBackground = tagBackgroundFinder(tag)
    return (
        <TravelPostContainer backgroundImage={getTagBackground} tags={tag}>
            <div className='header'>
                <NameAndDPContainer>
                <img src={`/cardImage/${tag.toLowerCase()}-1.jpg`} height='40' width='40' alt='icon' style={{borderRadius: '50%'}}/>
                    <Name>{name}</Name>
                </NameAndDPContainer>
                    <TripDetails>
                        <Left>
                            <span id='heading'>Trip details</span>
                            <span>Trip to : {goingTo}</span>
                            <span>Trip date : {goingOnDate}</span>
                            <span>Trip medium : {travelMedium}</span>
                            <span>Description: </span>
                            <span dangerouslySetInnerHTML={{__html: description}} />
                        </Left>
                        <Right>
                            <DateContainer>
                                <span>{dayjs(tripStartDate).format('DD')}</span>
                                <span>{dayjs(tripStartDate).format('MMM')}</span>
                            </DateContainer>
                            <VerticalDivider></VerticalDivider>
                            <DateContainer>
                                <span>{dayjs(tripEndDate).format('DD')}</span>
                                <span>{dayjs(tripEndDate).format('MMM')}</span>
                            </DateContainer>
                        </Right>

                    </TripDetails>

            </div>
            {!self && <button className='interested'><FavoriteBorderOutlinedIcon /></button>}
        </TravelPostContainer>
    )
}
export default TravelPostCard;

const TravelPostContainer = styled.div<{backgroundImage: string, tags: 'MOUNTAIN' | 'BEACH'}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-shadow: #42C2FF 0px 2px 8px 0px;
  /* Created with https://www.css-gradient.com */
  background: conic-gradient(from 315deg, #EFEFEF, #C3E6E4);
  border-radius: 1rem;
  position: relative;
  color: ${(props) => props.tags === 'BEACH' ? '#000000' : '#000000'};
  .header {
    display: flex;
    gap: 5px;
   flex-direction: column;
  }
  .interested {
    padding: 10px;
    position: absolute;
    top: -15px;
    right: -10px;
    border-radius: 8px;
    background: #42C2FF;
    border: 1px solid #42C2FF;
    color: #ffffff;
  }
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const NameAndDPContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
`;
const TripDetails = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  border: 1px solid #42C2FF;
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  #heading {
    font-weight: bold;
    font-size: 16px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const VerticalDivider = styled.div`
  height: 100%;
  border-left: 4px solid #42C2FF;
`;