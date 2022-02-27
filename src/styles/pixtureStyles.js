import { StyleSheet } from 'aphrodite';

export const pixtureStyles = StyleSheet.create({
    container: {
        display: 'flex',
        padding:"20px",
        flexWrap: 'wrap',
    },
    previewImage:{
        width:"100%",
        height:"100%",
        flex:1
    },
    infoContainer:{
        flex:1,
        '@media (min-width: 480px)':{
            marginLeft:"20px",
        }
    },
    tag:{
        margin:"5px",
        border:"2px solid orange",
        fontWeight:"500",
        padding:"5px 10px",
        borderRadius:"10px",
        cursor:"pointer",
        color:"orange",
        transition:"all 0.2s ease-in-out",
        ":hover":{
            color:"white",
            backgroundColor:"orange"
        }
    }
})