import { auth } from "../../firebase";

export default function SignOut(){
    const signOut = () => {
        auth.signOut()
        .catch(err => {return})
    }

    return (
        <button onClick={signOut}>Sign out</button>
    )
}