import { css } from 'aphrodite';
import { dashboardStyles } from '../styles/dashboardStyles';

export default function GalleryImage(props){
    return (
        <div>
                <img 
                className={css(dashboardStyles.galleryImage)}
                src={props.image.data().url} alt={props.image.data().name}/>
        </div>
    )
}