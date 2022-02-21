import { db, auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import UploadDialog from '../components/dashboard_components/UploadDialog';

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
        <div>
            <h1>{userData.name}</h1>
            <img src={userData.avatar} alt={userData.name}/>
            <p>{userData.description}</p>
            {userId === auth.currentUser.uid ? 
                <Button onClick={handleUploadOpen} startIcon={<AddAPhotoIcon/>} variant="contained" sx={{padding:"5px 10px"}}>
                    <b>Upload Image</b>
                </Button>
            : null}
            <UploadDialog open={uploadOpen} handleClose={handleUploadClose}/>
        </div> :
        <div className="nighLoading"><CircularProgress disableShrink size={60} thickness={5}/></div>
    )
}