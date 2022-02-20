import { StyleSheet } from 'aphrodite';

export const topbarStyles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        padding:"10px",
        backgroundColor: 'orange',
        alignItems: 'center',
    },
    title:{
        color:"white",
        cursor:"pointer",
    },
    avatar:{
        cursor: 'pointer',
    }
})