import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function ProfileMenu(props){

    const signIn = () => {
        signInWithPopup(auth, provider)
        .catch(err => {return})
    }

    return (
            <Menu
                id="guest-menu"
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {props.handleClose(); signIn()}}>
                    <ListItemIcon><LoginIcon fontSize="small"/></ListItemIcon>
                    Sign In
                </MenuItem>
            </Menu>
    )
}