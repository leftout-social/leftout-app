import { useRouter } from "next/router";
import styled from "styled-components";
import PlaceCard from "~/modules/explore/components/PlaceCard";
import RewardUtility from "~/modules/explore/components/RewardUtility";
import {getWalletBalance} from "~/services/wallet-service";
import {useEffect, useState} from "react";
import {Loading} from "@nextui-org/react";

const Explore = () => {
    const router = useRouter();
    const [balance, setBalance] = useState<any>();
    const [walletLoading,setWalletLoading] = useState(false)
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
    const fetchWallet = async() => {
        setWalletLoading(true)
        try {
            const data = await getWalletBalance();
            setBalance(data[0]);
            setWalletLoading(false)
        }

        catch (error){
            console.log(error)
            setWalletLoading(false)
        }
    }

    useEffect(() => {
        (async() => await fetchWallet())()
    }, [])

    return (
        <Parent>
            <WalletContainer>
                {walletLoading && <Loading color='success'/>}
                {!walletLoading && <><span className='wording'>Available Leftout credits</span>
                <span className='balance'>{balance?.active_balance}</span></>}
            </WalletContainer>
            <Content>
                <UtilContainer>
                    <RewardUtility />
                </UtilContainer>
            <span className="explore-heading">Explore</span>
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
            </Content>
        </Parent>
    )
}

export default Explore;

const Parent = styled.div`
    overflow: auto;
    height: 100%;
    width: 100%;
  @media (min-width: 700px) {
    padding-top: 5rem;
  }
  .explore-heading {
    font-weight: 700;
    font-size: 30px;
  }
    .heading {
        font-weight: 700;
        font-size: 20px;
        // text-align: center;
    }
`;

const CardsContainer = styled.div`
      //@media (max-width: 700px) {
      //  padding: 2rem 1rem 12rem 1rem;
      //}
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    gap: 20px;
`;

const WalletContainer = styled.div`
 background: linear-gradient(270.95deg, #888BF4 0%, #5151C6 100%);;
  height:  200px;
  width: 100%;
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .wording {
    color: #f1f1f1;
  }
  .balance {
    color: #ffffff;
    font-weight: 800;
    font-size: 50px;
    
  }
`;

const Content = styled.div`
    position: relative;
    top: -1rem;
    background: #f6f7f9;
    height: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;

const UtilContainer = styled.div`
  position: relative;
  top: -3rem;

`;