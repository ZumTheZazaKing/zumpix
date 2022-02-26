import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function SearchSearchbar(props) {

    const [searchQuery, setSearchQuery] = useState(props.query);
    const navigate = useNavigate();

    const search = e => {
        e.preventDefault();
        if(!searchQuery)return;
        navigate(`/search/${searchQuery}`);
    }

    return (
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
                autoComplete='off'
            />
        </form>
    )
}