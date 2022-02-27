import { db } from '../../firebase.js';
import { collection, orderBy, getDocs, limit, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { css } from 'aphrodite';
import { dashboardStyles } from '../../styles/dashboardStyles';
import CircularProgress from '@mui/material/CircularProgress';
import GalleryImage from '../GalleryImage';

export default function HomeGallery(){

    const [recentImages, setRecentImages] = useState([]);
    const pixturesRef = collection(db,"pixtures");

    useEffect(() => {
        getLatestImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getLatestImages = async () => {
        const firstBatch = query(pixturesRef, orderBy("createdAt", "desc"), limit(10));
        getDocs(firstBatch).then(snapshots => {
            setRecentImages(snapshots.docs);
        })
    }

    return (
        <div className={css(dashboardStyles.gallery)} style={{padding:"20px"}}>
            <h2>Recently Added</h2>
            <br/>
            {recentImages && recentImages.length > 0 ? 
            <div className={css(dashboardStyles.galleryImages)}>
            {recentImages.map((image,i) => {
                return <GalleryImage key={i} image={image} id={image.id}/>
            })}
        </div> : 
        <div><CircularProgress disableShrink size={60} thickness={5}/></div>}
        </div>
    )
}