import styled from "styled-components";
import {TABS} from "~/modules/home/utils";
import {useRouter} from "next/router";

const Tabs = () => {
    const router = useRouter();
    return (
        <ParentContainer>
            <TabsContainer>
                {TABS.map((item) => {
                    return (
                        <TabButton key={item.id} onClick={() => router.push(item.path)} background={item.background} fontColor={item.fontColor}>
                            {item.icon}
                            <span>{item.title}</span>
                        </TabButton>
                    )
                })}
            </TabsContainer>
        </ParentContainer>
    )
}

export default Tabs;

const ParentContainer = styled.div`
  width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: #f5f5f5;
`

const TabButton = styled.div<{background: string, fontColor: string}>`
  display: flex;
  gap: 5px;
  align-items: center;
  border: 1px solid #f1f1f1;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  background: ${(props) => props.background};
  color: ${(props) => props.fontColor}

`;