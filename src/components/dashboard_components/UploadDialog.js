import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';
import { storage, auth, db } from '../../firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function UploadDialog(props){

    const [imageToUpload, setImageToUpload] = useState("");

    const uploadImage = async e => {
        if(!e.target.files[0])return;

        const storageRef = ref(storage,`/${auth.currentUser.uid}Images/Pictures/${e.target.files[0].name}`);

        await uploadBytes(storageRef, e.target.files[0])
        .catch(() => console.log("Unable to retrieve image"));

        await getDownloadURL(ref(storage,`/${auth.currentUser.uid}Images/Pictures/${e.target.files[0].name}`))
        .then(url => {setImageToUpload(url);})
        .catch(() => console.log("Unable to get image reference"));
    }

    const postImage = async e => {
        e.preventDefault();
        if(!e.target.title.value)return console.log("Please enter a title");
        if(!e.target.image.value)return console.log("Please upload an image");
        if(!e.target.tags.value)return console.log("Please enter at least one tag");

        await addDoc(collection(db,"pixtures"), {
            title:e.target.title.value,
            url:imageToUpload,
            createdAt:serverTimestamp(),
            illustrator_id:auth.currentUser.uid,
            tags:e.target.tags.value.split(",")
        }).then(() => {console.log("Image uploaded successfully"); setImageToUpload("");})
        .catch(() => {console.log("Image upload failed")});

        props.handleClose();
    }

    return (
        <Dialog 
        open={props.open} 
        onClose={props.handleClose}
        >
            <DialogTitle><b>Upload Image</b></DialogTitle>
                <form onSubmit={postImage}>
                    <DialogContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <TextField name='image' 
                            type="file" 
                            id="imageInput" 
                            sx={{display:"none"}}
                            accept="image/*"
                            onChange={e => uploadImage(e)}
                        />
                        <label htmlFor='imageInput'>
                            {imageToUpload && imageToUpload != "" ? 
                            <img src={imageToUpload} alt="Uploaded Image" width="100%" height="100%" sx={{cursor:"pointer"}}/>
                            : <AddAPhotoIcon sx={{color:"grey",fontSize:"40px",cursor:"pointer"}}/>}
                        </label>
                        <br/>
                        <TextField
                            label="Title"
                            type="text"
                            variant='standard'
                            inputProps={{maxLength:200}}
                            autoComplete="off"
                            fullWidth
                            name='title'
                        />
                        <TextField
                            label="Tags (separate by commas)"
                            type="text"
                            variant='standard'
                            inputProps={{maxLength:200}}
                            autoComplete="off"
                            fullWidth
                            name='tags'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose}><b>Cancel</b></Button>
                        <Button type="submit" variant='contained'><b>Upload</b></Button>
                    </DialogActions>
                </form>
            </Dialog>
    )
}