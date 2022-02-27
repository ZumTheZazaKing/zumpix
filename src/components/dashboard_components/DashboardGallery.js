import { db } from '../../firebase.js';
import { collection, where, orderBy, getDocs, getDoc, limit, query, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { css } from 'aphrodite';
import { dashboardStyles } from '../../styles/dashboardStyles';
import CircularProgress from '@mui/material/CircularProgress';
import GalleryImage from '../GalleryImage';

export default function DashboardGallery(props){

    const userId = props.userId;
    const [username, setUsername] = useState("");
    const [images, setImages] = useState([]);
    const userDocRef = doc(db,"users",userId);
    const pixturesRef = collection(db,"pixtures");

    useEffect(() => {
        getUserData();
    },[])

    const getUserData = async () => {
        getDoc(userDocRef).then(snapshot => {
            setUsername(snapshot.data().name);
            const firstBatch = query(pixturesRef, where("illustrator_id", "==", userId), orderBy("createdAt", "desc"), limit(10));
            getDocs(firstBatch).then(snapshots => {
                setImages(snapshots.docs);
            })
        })
    }

    return (
        <div className={css(dashboardStyles.gallery)}>
            <h3 className={css(dashboardStyles.galleryTitle)}>{username}'s Gallery</h3>
            <br/>
            {images && images.length > 0 ? 
                <div className={css(dashboardStyles.galleryImages)}>
                {images.map((image,i) => {
                    return <GalleryImage key={i} image={image} id={image.id}/>
                })}
            </div> : 
            <div><CircularProgress disableShrink size={60} thickness={5}/></div>}
        </div>
    )
}