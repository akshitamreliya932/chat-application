// // ChatArea.js
// import React from 'react';
// import './ChatArea.css';

// function ChatArea() {
//   return (
//     <div className="chat-area">
//       <div className="message received">
//         <div className="message-text">Hello!</div>
//         <div className="message-time">3:01 PM</div>
//       </div>
//       <div className="message sent">
//         <div className="message-text">Hi there!</div>
//         <div className="message-time">3:02 PM</div>
//       </div>
//       <div className="message received">
//         <div className="message-text">How are you?</div>
//         <div className="message-time">3:03 PM</div>
//       </div>
//       <div className="message sent">
//         <div className="message-text">I'm good, thanks!</div>
//         <div className="message-time">3:04 PM</div>
//       </div>
//     </div>
//   );
// }

// export default ChatArea;


// ChatArea.js
import React from 'react';
import './ChatArea.css';

function ChatArea({ messages }) {

  console.log('messagesqqqqqqq', messages)
  return (
    <div className="chat-area">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type === 'sent' ? 'sent' : 'received'}`}>
          <div className="message-text">{message.message
          }</div>
          <div className="message-time">{message.time}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatArea;

