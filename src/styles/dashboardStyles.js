import { StyleSheet } from 'aphrodite';

export const dashboardStyles = StyleSheet.create({
    container: {
        padding:"20px"
    },
    header: {
        display: 'flex',
    },
    headerImage:{
        backgroundColor:"white"
    },
    rightHeader:{
        marginLeft:"10px"
    },
    accountDescription:{
        fontWeight:"600"
    },
    galleryContainer:{
        display: 'flex',
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    gallery:{
        width:"100%"
    },
    galleryTitle:{
        textAlign:"center"
    },
    galleryImages:{
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'stretch',
        flexWrap:"wrap",
        width:"100%",
    },
    galleryImage:{
        width:"100%",
        height:"100%",
        maxWidth:"40vw",
        maxHeight:"40vh",
        cursor:"pointer",
        ":hover":{
            transform:"scale(1.05)"
        },
        transition:"transform 0.2s ease-in-out"
    }
})