import styled from "styled-components";
import {Input} from "@nextui-org/react";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import MenuComponent from "~/components/MenuComponent";

interface SearchContainerProps {
    searchQuery: string;
    onChange: (val: string) => void;
    selectedMenu: number;
    onMenuChange: (val:{id: number, value: number, text: string} ) => void;

}

const SearchContainer = ({searchQuery, onChange, selectedMenu, onMenuChange}: SearchContainerProps) => {
    const MenuItems: {id: number, value: number, text: string}[] = [
        {
            id: 1,
            value: 50,
            text: '50+ KM'
        },
        {
            id: 2,
            value: 100,
            text: '100+ KM'
        },
        {
            id: 3,
            value: 500,
            text: '500+ KM'
        },
        {
            id: 4,
            value: 1000,
            text: '1000+ KM'
        },

    ]
    return (
        <SearchAndSort>
            <Input placeholder="search location or name" clearable
                   status='secondary'
                   contentLeft={<SearchIcon/>}
                   size='lg'
                   className='input'
                   fullWidth
                   value={searchQuery}
                   onChange={(event) => onChange(event.target.value)}

            />

            <MenuComponent
                targetElement={<IconButton><FilterListIcon className='sort' htmlColor='#7e33ca'/> </IconButton>}
                menuItems={MenuItems}
                selectedMenuItem={selectedMenu}
                onMenuClick={onMenuChange}
            />



        </SearchAndSort>
    );
}
export default SearchContainer;

const SearchAndSort = styled.div`
  @media (min-width: 700px) {
    position: fixed;
    top: 5rem;
  }
  max-width: 850px;
  display: flex;
  //height: 60px;
  padding: 1rem;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 10;
  gap: 5px;

  .input {
    height: 40px;
  }

  .sort {
  }
`;