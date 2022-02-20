import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { css } from "aphrodite";
import { topbarStyles } from "../../styles/topbarStyles";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import GuestMenu from "./GuestMenu";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';

export default function Topbar(){

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [guestAnchorEl, setGuestAnchorEl] = useState(null);
    const profileOpen = Boolean(profileAnchorEl);
    const guestOpen = Boolean(guestAnchorEl);
    const profileHandleClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const profileHandleClose = () => {
        setProfileAnchorEl(null);
    };
    const guestHandleClick = (event) => {
        setGuestAnchorEl(event.currentTarget);
    };
    const guestHandleClose = () => {
        setGuestAnchorEl(null);
    };
    const goToHome = () => {navigate("/")}

    return (
        <div className={css(topbarStyles.container)}>
            <h2 className={css(topbarStyles.title)} onClick={goToHome}>ZumPix</h2>
            <div className={css(topbarStyles.avatar)}>
                {user ? <Avatar alt="Z" src={auth.currentUser.photoURL} onClick={profileHandleClick}/> 
                : <Avatar alt="Z" onClick={guestHandleClick}>G</Avatar>}
            </div>
            <GuestMenu 
            open={guestOpen} 
            anchorEl={guestAnchorEl} 
            handleClose={guestHandleClose}/>
            <ProfileMenu 
            anchorEl={profileAnchorEl} 
            open={profileOpen} 
            handleClose={profileHandleClose}/>
        </div>
    )
}