import { useParams } from 'react-router-dom';
import { css } from 'aphrodite';
import SearchSearchbar from '../components/search_components/SearchSearchbar';

export const Search = () => {

    const { query } = useParams();

    return (
        <div>
            <SearchSearchbar query={query}/>
            <h1>{query}</h1>
        </div>
    )
}