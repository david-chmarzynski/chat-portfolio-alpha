import Messages from "./Messages";

export default function Chat({ user, auth, db, setIsChatOpen}) {
    const me = "david.chmarzynski@gmail.com";

      // SIGNOUT FUNCTION, PUT "ISONLINE" TO FALSE
    const signout = () => {
        auth.signOut();
        db.collection('users').doc(user.uid).update({
        isOnline: false
      });
    };
    

    return (
        <div className="chat">
            <h1>Chat</h1>
            {user.email !== me ? <Messages user={user} auth={auth} db={db} setIsChatOpen={setIsChatOpen} /> : null}
            <button onClick={signout}>Se Déconnecter</button>
        </div>
    )
}