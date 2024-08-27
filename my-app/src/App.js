// // App.js
// import React from 'react';
// import './App.css';
// import Header from './Header';
// import ChatArea from './ChatArea';
// import InputArea from './InputArea';

// function App() {
//   return (
//     <div className="app">
//       <Header />
//       <ChatArea />
//       <InputArea />
//     </div>
//   );
// }

// export default App;
// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Header from './Header';
import ChatArea from './ChatArea';
import InputArea from './InputArea';
import styled from 'styled-components';

const socket = io('http://localhost:4000');

function App() {
  const [zoomId, setZoomId] = useState()
  const [userName, setUserName] = useState()
  const [roomShow, setRoomShow] = useState(true)


  const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

  const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

  const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

  const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #333;
`;

  const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

  const zoinMeeting = () => {

    console.log('zoomId', zoomId)
    if (userName !== "" && zoomId !== "") {
      socket.emit("join_room", zoomId)
      setRoomShow(false)
    }
  }

  // useEffect(() => {
  //   socket.on('receiveMessage', (message) => {

  //     console.log('messageeee', message)
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   // return () => {
  //   //   socket.disconnect();
  //   // };

  //   return () => {
  //     socket.off('receiveMessage', messages);
  //   };

  // }, []);

  // const sendMessage = (message) => {
  //   socket.emit('sendMessage', message);
  //   setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
  // };

  
  async function forgotPassword(email) {
    const response = await fetch('https://cd47-2405-201-2017-407a-9142-9cd4-118d-39b.ngrok-free.app/v1/auth/forgotPasswordEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Origin': 'frontend'  
      },
      body: JSON.stringify({ email: email })
    });
  
    const data = await response.json();
    console.log(data);
  }
  forgotPassword("sahil@outrightsolutions.net")


  
  return (
    <>
         <div className="app">
         <button onClick={forgotPassword}>
      send
    </button>
      {roomShow ? (
        <Container>
          <Form>
            <Title>Join Zoom Meeting</Title>

            <Input type="text" placeholder="Zoom ID" value={zoomId} onChange={(e) => setZoomId(e.target.value)} />
            <Input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Button onClick ={zoinMeeting}>Join Room</Button>
          </Form>
        </Container>
      ) : (
        <>
          <Header />
          <InputArea socket={socket} userName={userName} zoomId={zoomId} />
        </>
      )}
    </div>
    </>
  );
}

export default App;
