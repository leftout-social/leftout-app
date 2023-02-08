import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import PlaceCard from "~/modules/explore/components/PlaceCard";

const Explore = () => {
    const router = useRouter();
    const handleOnClick = (id: string) => {
        router.push(`/explore/${id}`);
    }
    const mountainPlaces = [
        {
            id: 'bbf8276f-4107-4375-81e1-6bd0e6bb70ba',
            title: 'Manali',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        },
        {
            id: '63dfe2e2ace6f33a22d70290',
            title: 'Kasol',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        },
        {
            id: 'f2b820cb-31a3-4c5f-96ac-90a24c9cb655',
            title: 'Mussorie',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        },
        {
            id: '1e426f2b-1c3f-4f41-acec-ba955e382de4',
            title: 'Ladakh',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        }
    ];

    const beaches = [
        {
            id: 'a72ec01b-21bb-4466-bba8-9f65e8fe3223',
            title: 'Goa',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        },
        {
            id: '717baeac-aa97-43ed-aa0c-5dc0f8e04464',
            title: 'Lakshadweep',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        },
        {
            id: '50352e4d-0d9a-4c8c-a73d-17f41049933f',
            title: 'Pondicherry',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        },
        {
            id: '6a24b1cc-93c1-48d2-8da2-10da14ce1767',
            title: 'Andaman & Nicobar',
            index: 0,
            img: '/places/kasol/kasol-1.jpg',
        }
    ];

    return (
        <Parent>
            <span className="">Explore</span>
            <span className="heading">MOUNTAINS</span>
            <CardsContainer>
                {mountainPlaces.map((place) => (
                    <PlaceCard details={place} onClick={() => handleOnClick(place.id)}/>
                ))}
            </CardsContainer>
            <span className="heading">BEACHES</span>
            <CardsContainer>
                {beaches.map((place) => (
                    <PlaceCard details={place} />
                ))}
            </CardsContainer>
        </Parent>
    )
}

export default Explore;

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 100%;
    padding: 15px;
    gap: 20px;
    .heading {
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 1.6;
        // text-align: center;
    }
`;

const CardsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    gap: 20px;
`;