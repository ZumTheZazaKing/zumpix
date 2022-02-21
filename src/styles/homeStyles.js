import { StyleSheet } from "aphrodite";

export const homeStyles = StyleSheet.create({
    searchContainer:{
        height:"90vh",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"skyblue",
        flexDirection:"column"
    },
    title:{
        fontSize:"48px",
        fontWeight:"bold"
    },
    description:{
        fontWeight:"600"
    },
    form:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})