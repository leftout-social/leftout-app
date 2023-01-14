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
    return (
        <TravelPostContainer backgroundImage={getTagBackground}>
            <Name>{name}</Name>
            <span>Trip to : {goingTo}</span>
            <span>Trip date : {goingOnDate}</span>
            <span>Trip medium : {travelMedium}</span>
            <span dangerouslySetInnerHTML={{__html: description}}/>
        </TravelPostContainer>
    )
}
export default TravelPostCard;

const TravelPostContainer = styled.div<{backgroundImage: string}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-shadow: #42C2FF 0px 2px 8px 0px;
  background: #ffffff;
  border-radius: 1rem;
  ::before {
    background: url(${(props) => props.backgroundImage}) no-repeat;
    background-size: 100%;
    opacity: 0.75;
  }
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
