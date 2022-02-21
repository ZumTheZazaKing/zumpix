import { css } from 'aphrodite';
import { homeStyles } from '../../styles/homeStyles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Searchbar(){

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const search = e => {
        e.preventDefault();
        if(!searchQuery)return;
        navigate(`/search/${searchQuery}`);
    }

    return (
        <div className={css(homeStyles.searchContainer)}>
            <p className={css(homeStyles.title)}>ZumPix</p>
            <p className={css(homeStyles.description)}>Search and grab the pix you want for free</p>
            <br/>
            <form onSubmit={e => search(e)}>
                <TextField 
                    placeholder="Search..." 
                    variant="standard"
                    name="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon/>
                          </InputAdornment>
                        ),
                    }}
                />
            </form>
        </div>
    )
}