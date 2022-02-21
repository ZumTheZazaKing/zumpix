import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu(props){

    const navigate = useNavigate();

    const signOut = () => {
        auth.signOut()
        .catch(err => {return})
    }

    const goToDashboard = () => {navigate(`/dashboard/${auth.currentUser.uid}`)}

    return (
        <Menu
            id="profile-menu"
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => {props.handleClose(); goToDashboard()}}>
                <ListItemIcon>
                    <AccountBoxIcon fontSize="small"/>
                </ListItemIcon>
                Dashboard
            </MenuItem>
            <MenuItem onClick={() => {props.handleClose(); signOut()}}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small"/>
                </ListItemIcon>
                Sign Out
            </MenuItem>
        </Menu>
    )
}