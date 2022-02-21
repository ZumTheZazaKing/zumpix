import { css } from 'aphrodite';
import { dashboardStyles } from "../styles/dashboardStyles";
import { db, auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import UploadDialog from '../components/dashboard_components/UploadDialog';
import DashboardGallery from '../components/dashboard_components/DashboardGallery';

export const Dashboard = () => {

    const [userData, setUserData] = useState(null);
    const { userId } = useParams();
    const [uploadOpen, setUploadOpen] = useState(false);
    const handleUploadOpen = () => setUploadOpen(true);
    const handleUploadClose = () => setUploadOpen(false);

    useEffect(() => {
        getUserData();
    },[])

    const getUserData = async () => {
        const userDocRef = doc(db,"users",userId);
        const retrievedUserData = await getDoc(userDocRef);
        setUserData(retrievedUserData.data());
    }

    return ( userData ?
        <div className={css(dashboardStyles.container)}>
            <div className={css(dashboardStyles.header)}>
                <img className={css(dashboardStyles.headerImage)} src={userData.avatar} alt={userData.name}/>
                <div className={css(dashboardStyles.rightHeader)}>
                    <h2>{userData.name}</h2>
                    <p className={css(dashboardStyles.accountDescription)}>{userData.description}</p>
                </div>
            </div>
            <br/>
            <div className={css(dashboardStyles.galleryContainer)}>
                {userId === auth.currentUser.uid ? 
                    <Button 
                    onClick={handleUploadOpen} 
                    startIcon={<AddAPhotoIcon/>} 
                    variant="contained" 
                    sx={{padding:"5px 10px", 
                    backgroundColor:"orange"}}>
                        <b>Upload Image</b>
                    </Button>
                : null}
                <br/>
                <UploadDialog open={uploadOpen} handleClose={handleUploadClose}/>
                <DashboardGallery userId={userId}/>
            </div>
        </div> :
        <div className="nighLoading"><CircularProgress disableShrink size={60} thickness={5}/></div>
    )
}