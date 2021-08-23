import Messages from "./Messages";

export default function Chat({ user, auth, db}) {
      // SIGNOUT FUNCTION, PUT "ISONLINE" TO FALSE
    const signout = () => {
            auth.signOut();
            db.collection('users').doc(user.uid).update({
            isOnline: false
        });
    }
    console.log(user.email)
    const me = "david.chmarzynski@gmail.com";
    return (
        <div className="chat">
            <h1>Chat</h1>
            {user.email !== me ? <Messages /> : null}
            <button onClick={signout}>Se Déconnecter</button>
        </div>
    )
}