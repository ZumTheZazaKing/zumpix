import { css } from 'aphrodite';
import { dashboardStyles } from '../styles/dashboardStyles';
import { useNavigate } from 'react-router-dom';

export default function GalleryImage(props){

    const image = props.image;
    const id = props.id;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/pixture/${id}`);
    }

    return (
        <div onClick={handleClick}>
            <img 
            className={css(dashboardStyles.galleryImage)}
            src={image.data().url} alt={image.data().name}/>
        </div>
    )
}