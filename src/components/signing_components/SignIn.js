import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function SignIn(){
    const signIn = () => {
        signInWithPopup(auth,provider)
        .catch(err => {return})
    }

    return (
        <button onClick={signIn}>Sign in</button>
    )
}