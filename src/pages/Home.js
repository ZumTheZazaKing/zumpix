import HomeGallery from '../components/home_components/HomeGallery';
import HomeSearchbar from '../components/home_components/HomeSearchbar';
import { Helmet } from 'react-helmet';

export const Home = () => {

    return (
        <div>
            <Helmet>
                <title>ZumPix</title>
            </Helmet>
            <HomeSearchbar/>
            <HomeGallery/>
        </div>
    )
}