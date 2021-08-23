import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Chat from '../components/Chat';
import Login from '../components/Login'
import styles from '../styles/Home.module.css'
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'

export default function Home({ user }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleChat = () => {
    setIsChatOpen(true);
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={handleChat}>Messagerie</button>
      {isChatOpen && (
        !user ? <Login /> : <Chat user={user} auth={auth} db={db} />
       
      )}
    </div>
  )
}
