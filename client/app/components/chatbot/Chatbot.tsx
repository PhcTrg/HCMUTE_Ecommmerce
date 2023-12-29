// "use client";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

const Chatbot = () => {
  const [showchat, setShowchat] = useState(false);
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hi, I am chatbot",
      sender: "Chatbot",
    },
  ]);

  const handleSend = async (message) => {
    // new message
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatbot(newMessages);
  };

  async function processMessageToChatbot(chatMessages) {
    const api = async () => {
      const data = await fetch("http://127.0.0.1:8080/api/home", {
        method: "GET",
      });
      const jsonData = await data.json();

      setMessages([
        ...chatMessages,
        {
          message: jsonData.message,
          sender: "Chatbot",
        },
      ]);
    };

    api();

    setTyping(false);
  }

  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          id="open-chat"
          className="flex items-center rounded-md bg-blue-300 px-4 py-2 text-white transition duration-300 hover:bg-blue-500"
          onClick={() => setShowchat(!showchat)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          AI Chat
        </button>
      </div>

      {showchat && (
        <div className="fixed bottom-16 right-4">
          <div className="flex h-96 w-80 flex-col border bg-white shadow-md">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-200">
                  <button
                    className="inline-flex rounded-full p-2 hover:bg-indigo-50"
                    type="button"
                  >
                    <svg
                      className="h-6 w-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 18"
                    >
                      <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                  </button>
                </div>

                <div className="pl-2">
                  <div className="font-semibold">
                    <a className="hover:underline" href="#">
                      Chatbot
                    </a>
                  </div>
                  <div className="text-xs text-gray-600">Available</div>
                </div>
              </div>
              <div>
                <button
                  className="inline-flex rounded-full p-2 hover:bg-indigo-50"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <MainContainer>
              <ChatContainer>
                <MessageList
                  typingIndicator={
                    typing ? (
                      <TypingIndicator content="Generating answer..." />
                    ) : null
                  }
                >
                  {messages.map((message, i) => {
                    return <Message key={i} model={message} />;
                  })}
                </MessageList>
                <MessageInput
                  placeholder="Ask me something"
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
