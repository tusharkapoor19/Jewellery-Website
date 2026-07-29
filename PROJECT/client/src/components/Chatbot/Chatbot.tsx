import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import { chatbotData } from "./ChatbotData";
import aarohi from "../../assets/chatbot/aarohi.png";

interface Message {
  sender: "bot" | "user";
  text: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hello! I'm Aarohi. Welcome to HIRANYA. How may I help you today?"
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const getReply = (message: string) => {
    const msg = message.toLowerCase();

    if (msg.includes("time")) {
      return `🕒 Current Time: ${new Date().toLocaleTimeString()}`;
    }

    if (msg.includes("date") || msg.includes("today")) {
      return `📅 Today: ${new Date().toLocaleDateString()}`;
    }

    const matched = chatbotData.find((item) =>
      item.keywords.some((keyword) => msg.includes(keyword))
    );

    return (
      matched?.answer ??
      "😊 Sorry, I couldn't understand that. Please ask about jewellery, shipping, returns or contact."
    );
  };

  const sendMessage = (text?: string) => {
    const userText = text ?? input;

    if (!userText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText
      }
    ]);

    const reply = getReply(userText);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply
        }
      ]);
    }, 500);

    setInput("");
  };

  return (
    <>
  <button
    className="chat-toggle"
    onClick={() => setOpen(!open)}
  >
    <img
      src={aarohi}
      alt="Aarohi"
      className="chat-toggle-avatar"
    />
  </button>

  {open && (
    <div className="chat-window">

      <div className="chat-header">

        <div className="chat-header-left">

          <img
            src={aarohi}
            alt="Aarohi"
            className="chat-avatar"
          />

          <div className="chat-info">

            <h4>Aarohi</h4>

            <p>Luxury Jewellery Expert</p>

            <span className="chat-status">
              ● Online
            </span>

          </div>

        </div>

        <button
          className="chat-close"
          onClick={() => setOpen(false)}
        >
          <i className="bi bi-x-lg"></i>
        </button>

      </div>

      <div className="chat-body">

        <div className="quick-buttons">

          <button onClick={() => sendMessage("rings")}>
            💍 Rings
          </button>

          <button onClick={() => sendMessage("new arrivals")}>
            ✨ New
          </button>

          <button onClick={() => sendMessage("shipping")}>
            🚚 Shipping
          </button>

          <button onClick={() => sendMessage("contact")}>
            📞 Contact
          </button>

        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}

        <div ref={bottomRef}></div>

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask Aarohi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={() => sendMessage()}>
          <i className="bi bi-send-fill"></i>
        </button>

      </div>

    </div>
  )}
    </>
  );
};

export default Chatbot;