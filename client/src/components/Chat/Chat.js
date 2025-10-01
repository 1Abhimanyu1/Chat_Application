// import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
// import io from "socket.io-client";

// // import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// // import Input from '../Input/Input.js/Input';
//  import Input from '../Input/Input';


// // import React, { useState, useEffect } from "react";
// // import { useLocation } from "react-router-dom"; // 1. IMPORT THE HOOK
// // import queryString from 'query-string';
// // import io from "socket.io-client";

// import './Chat.css';

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

// let socket;

// const Chat = ({ location }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const { name, room } = queryString.parse(location.search);

//     socket = io(ENDPOINT);

//     setRoom(room);
//     setName(name)

//     socket.emit('join', { name, room }, (error) => {
//       if(error) {
//         alert(error);
//       }
//     });
//   }, [ENDPOINT, location.search]);
  
//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(messages => [ ...messages, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
// }, []);

//   const sendMessage = (event) => {
//     event.preventDefault();

//     if(message) {
//       socket.emit('sendMessage', message, () => setMessage(''));
//     }
//   }

//   return (
//     <div className="outerContainer">
//       <div className="container">
//           <InfoBar room={room} />
//           <Messages messages={messages} name={name} />
//           <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
//       </div>
//       {/* <TextContainer users={users}/> */}
//     </div>
//   );
// }



// // export default Chat;
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom"; // CHANGED: Imported useLocation
// import queryString from 'query-string';
// import io from "socket.io-client";

// //import TextContainer from '../TextContainer/TextContainer'; // CHANGED: Uncommented this import
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

// import './Chat.css';

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

// let socket;

// // CHANGED: Removed { location } from props
// const Chat = () => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   const location = useLocation(); // CHANGED: Added this line to get location

//   useEffect(() => {
//     const { name, room } = queryString.parse(location.search);

//     socket = io(ENDPOINT);

//     setRoom(room);
//     setName(name);

//     socket.emit('join', { name, room }, (error) => {
//       if(error) {
//         alert(error);
//       }
//     });

//     // CHANGED: Added a proper cleanup function for when the component unmounts
//     return () => {
//       socket.disconnect();
//       socket.off();
//     };
//   }, [location.search]); // CHANGED: Removed ENDPOINT from dependencies
  
//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(messages => [ ...messages, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
//   }, []);

//   const sendMessage = (event) => {
//     event.preventDefault();

//     if(message) {
//       socket.emit('sendMessage', message, () => setMessage(''));
//     }
//   }

//   return (
//     <div className="outerContainer">
//       <div className="container">
//           <InfoBar room={room} />
//           <Messages messages={messages} name={name} />
//           <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
//       </div>
//       {/* <TextContainer users={users}/> */}
//     </div>
//   );
// }

// export default Chat;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
let socket; // You can keep this here or move it inside

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  // ******** THE FIX IS HERE ********
  // We have combined the two useEffect hooks into one.
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    // These listeners are now inside the same hook, so socket is guaranteed to exist.
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    // Cleanup function runs when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [location.search]);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      { <TextContainer users={users}/> }
    </div>
  );
}

export default Chat;