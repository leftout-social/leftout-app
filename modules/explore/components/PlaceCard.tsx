import styled from "styled-components";

interface PlaceCardProps {
    id: number,
    title: string,
    img: string
}

const PlaceCard = ({onClick, ...details}: any) => {
    console.log(details.details);

    return (
        <Parent img={details.details.img} onClick={onClick}>
            <span className="title">{details.details.title}</span>
        </Parent>
    )
}

export default PlaceCard;

const Parent = styled.div<{
    img: string
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    border-radius: 8px;
    background-image: url(${props => props.img});
    background-size: 150px 90px;
    min-width: 150px;
    width: 150px;
    font-weight: 700px;
    color: #ffffff;
    font-size: 18px;
    .title {
        text-align: center;
    }
`