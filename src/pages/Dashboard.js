import { db, auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Dashboard = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();
    },[])

    const getUserData = async () => {
        const userDocRef = doc(db,"users",auth.currentUser.uid);
        const retrievedUserData = await getDoc(userDocRef);
        setUserData(retrievedUserData.data());
    }

    return ( userData ?
        <div>
            <h1>{userData.name}</h1>
            <img src={userData.avatar} alt={userData.name}/>
            <p>{userData.description}</p>
        </div> :
        <div className="nighLoading"><CircularProgress disableShrink size={60} thickness={5}/></div>
    )
}