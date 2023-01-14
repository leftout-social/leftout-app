import styled from "styled-components";
import {tagBackgroundFinder} from "~/modules/home/utils";

interface TravelPostCardProps {
    id: string
    name: string
    goingTo: string
    goingOnDate: string
    travelMedium: string
    description: string
    interested: string[],
    tag: 'MOUNTAIN' | 'BEACH'
}
const TravelPostCard = ({id, name, goingTo, travelMedium, goingOnDate, interested, description,
    tag
                        }: TravelPostCardProps) => {
    const getTagBackground = tagBackgroundFinder(tag)
    console.log(getTagBackground)
    return (
        <TravelPostContainer backgroundImage={getTagBackground} tags={tag}>
            <div className='header'>
                <Name>{name}</Name>
                <img src={`/cardImage/${tag.toLowerCase()}-1.jpg`} height='40' width='40' alt='icon' style={{borderRadius: '5px'}}/>
            </div>
            <span>Trip to : {goingTo}</span>
            <span>Trip date : {goingOnDate}</span>
            <span>Trip medium : {travelMedium}</span>
            <span dangerouslySetInnerHTML={{__html: description}}/>
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
  background: #ffffff;
  border-radius: 1rem;
  background: ${(props) => props.backgroundImage};
  color: ${(props) => props.tags === 'BEACH' ? '#000000' : '#ffffff'};
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
