import { auth, provider } from '../firebase'

export default function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <div className="login">
            <h1>Connectez-vous</h1>
            <button onClick={signIn}>Google</button>
        </div>
    )
}