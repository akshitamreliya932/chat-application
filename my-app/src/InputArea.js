// // InputArea.js
// import React from 'react';
// import './InputArea.css';

// function InputArea() {
//   return (
//     <div className="input-area">
//       <button className="emoji-button">😀</button>
//       <button className="attachment-button">📎</button>
//       <button className="camera-button">📷</button>
//       <input type="text" className="message-input" placeholder="Type a message" />
//       <button className="send-button">→</button>
//     </div>
//   );
// }

// export default InputArea;


// InputArea.js
import React, { useState ,useEffect} from 'react';
import './InputArea.css';
import './ChatArea.css';

function InputArea({ socket,userName,zoomId}) {
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);
  const [receiveMessages, setReceiveMessages] = useState([]);
  





  const handleSend =async() => {
    // if (input.trim()) {
    //   sendMessage(input);
    //   setInput('');
    // }
      if(input !== ""){
        const userData = {
          roomId : zoomId,
          userName:userName,
          message:input,
          time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
          type: 'received'
        }
        await socket.emit("sendMessage",userData)
        // setMessages((pre) => [...pre, userData])
        setInput("")
  
      }
  };

  console.log('messagesxxxx', messages)


  // useEffect(() => {
  //   socket.on('receiveMessage', (message) => {

  //     console.log('messageeee', message)
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   // return () => {
  //   //   socket.disconnect();
  //   // };

  //   // return () => {
  //   //   socket.off('receiveMessage', messages);
  //   // };

  // }, [socket,messages]);

  useEffect(() => {
    const receiveMessageHandler = (message) => {
      console.log('messageeee', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
  
    socket.on('receiveMessage', receiveMessageHandler);
  
    return () => {
      socket.off('receiveMessage', receiveMessageHandler);
    };
  }, [socket, messages]);
  
  


 

  return (
    <>
    <div className="chat-area">
    {messages.map((message, index) => (
      <div key={index} className={`message ${message.userName === userName ?   'sent' : 'received'}`}>
        <div className="message-text">{message.message
        }</div>
        <div className="message-time">{message.time}</div>
      </div>
    ))}
  </div>
    <div className="input-area">
      <button className="emoji-button">😀</button>
      <button className="attachment-button">📎</button>
      <button className="camera-button">📷</button>
      <input
        type="text"
        className="message-input"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="send-button" onClick={handleSend}>→</button>
    </div>
    </>
  );
}

export default InputArea;

