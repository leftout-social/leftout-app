import styled from "styled-components";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import ShareIcon from '@mui/icons-material/Share';
import {useState} from "react";
import {BottomDrawer} from "~/components/BottomDrawer";

const RewardUtility = () => {
    const [bottomDrawer, setBottomDrawer] = useState<{
        open: boolean,
        id: number
    }>({
        open: false,
        id: 0
    });
    const utilArr: {id: number, icon: JSX.Element, label: string}[] = [
        {
            id: 1,
            icon: <AccountBalanceWalletIcon />,
            label: 'Top up credits'
        },
        {
            id: 2,
            icon: <ShareIcon />,
            label: 'Refer'
        },
        {
            id: 3,
            icon: <HistoryIcon />,
            label: 'History'
        }
    ]
    const onItemClick = (id: number) => {
        console.log(id);
        setBottomDrawer({open: true, id});
    }
    return (
        <Parent>
                {utilArr.map(({id, icon, label}) => (
                    <Util key={id} onClick={() => onItemClick(id)}>
                        {icon}
                        <span>{label}</span>
                    </Util>
                ))}
            <BottomDrawer id='rewards' open={bottomDrawer.open} onClose={() => setBottomDrawer({open: false, id: 0})}>
                <div>
                hello from drawer {bottomDrawer.id}
                </div>
            </BottomDrawer>
        </Parent>
    )
}
export default RewardUtility;


const Parent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 2px;
  background: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 1rem;
  width: 100%;
  
`;

const Util = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;