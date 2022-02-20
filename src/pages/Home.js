import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from '../components/signing_components/SignIn';
import SignOut from '../components/signing_components/SignOut';

export const Home = () => {

    const [user] = useAuthState(auth);

    return (
        <div>
            <h1>Home</h1>
            {user ? <SignOut /> : <SignIn />}
        </div>
    )
}