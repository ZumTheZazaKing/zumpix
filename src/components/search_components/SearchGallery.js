import { db } from '../../firebase.js';
import { collection, orderBy, getDocs, limit, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { css } from 'aphrodite';
import { dashboardStyles } from '../../styles/dashboardStyles';
import GalleryImage from '../GalleryImage';

export default function SearchGallery(props){

    const searchQuery = props.query;
    const [searchImages, setSearchImages] = useState([]);
    const pixturesRef = collection(db,"pixtures");

    useEffect(() => {
        getSearchImages();
    },[searchQuery])

    const getSearchImages = async () => {
        const firstBatch = query(pixturesRef, where("tags","array-contains",searchQuery), orderBy("createdAt", "desc"), limit(10));
        getDocs(firstBatch).then(snapshots => {
            setSearchImages(snapshots.docs);
        })
    }

    return (
        <div className={css(dashboardStyles.gallery)} style={{padding:"20px"}}>
            {searchImages && searchImages.length > 0 ? 
            <div className={css(dashboardStyles.galleryImages)}>
            {searchImages.map((image,i) => {
                return <GalleryImage key={i} image={image} id={image.id}/>
            })}
        </div> : 
        <div><h3 style={{lineHeight:1.5}}>No images available for this search（─.─||）</h3></div>}
        </div>
    )
}