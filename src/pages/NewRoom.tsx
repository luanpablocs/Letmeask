import { FormEvent, useState, } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '..//assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { database } from '../services/firebase';

export function NewRoom() {

   const { user } = useAuth()
   const history = useHistory()

   const [newRoom, setNewRoom] = useState ('');

   async function handlecreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '')
        return;
   
   const roomRef = database.ref('rooms');

   const firebaseRoom = await roomRef.push({
       tittle: newRoom,
       authrorId: user?.id,
   })

   history.push(`/rooms/${firebaseRoom.key}`)
}
   
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                   <h2>Criar uma nova sala</h2>
                    <form onSubmit={handlecreateRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link>
                        </p>
                </div>
            </main>
        </div>
    )
}