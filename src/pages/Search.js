import { useParams } from 'react-router-dom';
import SearchSearchbar from '../components/search_components/SearchSearchbar';
import SearchGallery from '../components/search_components/SearchGallery';
import { Helmet } from 'react-helmet';

export const Search = () => {

    const { query } = useParams();

    return (
        <div>
            <Helmet>
                <title>ZumPix | {query}</title>
            </Helmet>
            <SearchSearchbar query={query}/>
            <SearchGallery query={query}/>
        </div>
    )
}