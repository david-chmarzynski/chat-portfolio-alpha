import { useEffect } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Messages({ user, auth, db }) {
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot, loading, error] = useCollection(userChatRef);

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
            setIsOpen(true);
        }
    };

    useEffect(() => {
        console.log("useEffect");
        createChat();
    }, [user])
    return (
        <div className="messages">
            <h3>Messages</h3>
            <h4>Conversation avec {user.email}</h4>
        </div>
    )
}