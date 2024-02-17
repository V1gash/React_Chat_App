import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const defaultPhotoURL = "URL_TO_YOUR_DEFAULT_PHOTO";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesRef = collection(db, "messages");

  const handleSubmit = async () => {
    const date = new Date();
    await addDoc(messagesRef, {
      text,
      email: 'vigashvijay2003@gmail.com',
      logo: user.photoURL || defaultPhotoURL, 
      name: user.displayName,
      date,
    });
    setText("");
    setTimeout(
      () =>
        document
          .querySelector("#copyright")
          .scrollIntoView({ behavior: "smooth" }),
      0.5
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const newMessages = querySnapshot.docs
        .map((doc) => doc.data())
        .sort((a, b) => a.date - b.date);
      setMessages(newMessages);
      setTimeout(
        () =>
          document
            .querySelector("#copyright")
            .scrollIntoView({ behavior: "smooth" }),
        0.5
      );
    });
    return () => unsubscribe();
  }, [messagesRef]);

  return (
    <div>
      <div className="justify-content-center">
        <h2 className="text-primary">Chat App</h2>
      </div>
      <div className="row mt-4">
        <div className="col-xl4 col-lg-4 col-sm-3 col-2"></div>
        <div className="col-xl-4 col-lg-4 col-sm-6 col-8 chat-message">
          {messages.map((message) => (
            <ChatMessage key={message.date.toMillis()} {...message} user={user} />
          ))}
          <div className="d-flex mt-2">
            <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="btn btn-secondary ms-3" onClick={handleSubmit}>Send</button>
          </div>
          <div id='copyright' className="mt-3">
            Copyrights Reserved Mosses
          </div>
        </div>
      </div>
    </div>
  );
}
