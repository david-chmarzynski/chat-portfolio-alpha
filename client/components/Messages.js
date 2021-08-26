import { useEffect, useState } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'

export default function Messages({ user, auth, db, setIsChatOpen }) {
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot, loading, error] = useCollection(userChatRef);
    const [input, setInput] = useState("");
    console.log(db.collection('chats').doc().id)

    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const sendMessage = (e, input) => {
        e.preventDefault();
        
        // Update last seen
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // db.collection('chats').doc()
    }

    const chatAlreadyExist = (recipientEmail) => (
        !!chatsSnapshot?.docs.find(chat => 
        chat.data().users.find(user => user === recipientEmail)?.length > 0
      ));
    
      // CREATE A NEW CHAT IF
    const createChat = () => {
        const me = "david.chmarzynski@gmail.com";
        if(me !== user.email && !chatAlreadyExist(me)) {
            db.collection("chats").add({
            users: [user.email, me]
            });
        } else if(me !== user.email && chatAlreadyExist(me)) {
            setIsChatOpen(true);
        }
    };

    return (
        <div className="messages">
            <h3>Messages</h3>
            <button onClick={createChat}>Créer un chat</button>
            <h4>Conversation avec {user.email}</h4>
            <input type="text" onChange={handleInput}/>
            <button onClick={(e) => sendMessage(e, input)}>Envoyer</button>
        </div>
    )
}