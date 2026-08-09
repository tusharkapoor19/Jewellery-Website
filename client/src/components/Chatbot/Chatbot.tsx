import { useEffect, useRef, useState } from "react";

import {
  X,
  Send,
  Hand,
  Gem,
  Sparkles,
  Truck,
  Phone,
  Clock,
  CalendarDays,
  type LucideIcon
} from "lucide-react";

import "./Chatbot.css";
import { chatbotData } from "./ChatbotData";
import aarohi from "../../assets/chatbot/aarohi.png";

interface Message {
  sender: "bot" | "user";
  text: string;
  icon?: LucideIcon;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "Hello! I'm Aarohi. Welcome to HIRANYA. How may I help you today?",
      icon: Hand
    }
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* =========================================
     AUTO SCROLL
  ========================================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  /* =========================================
     GREETING POPUP
  ========================================= */

  useEffect(() => {
    if (open) {
      setShowGreeting(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [open]);

  /* =========================================
     OPEN / CLOSE
  ========================================= */

  const handleChatToggle = () => {
    if (!open) {
      setOpen(true);
      setShowGreeting(false);
    } else {
      setOpen(false);

      setTimeout(() => {
        setShowGreeting(true);
      }, 3000);
    }
  };

  /* =========================================
     HOVER
  ========================================= */

  const handleMouseEnter = () => {
    if (!open) {
      setShowGreeting(true);
    }
  };

  /* =========================================
     NORMALIZE MESSAGE
  ========================================= */

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s'-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =========================================
     GET REPLY
  ========================================= */

  const getReply = (
    message: string
  ): {
    text: string;
    icon: LucideIcon;
  } => {
    const msg = normalizeText(message);

    /* Time */

    if (
      msg.includes("time") ||
      msg.includes("what time")
    ) {
      return {
        text: `Current Time: ${new Date().toLocaleTimeString()}`,
        icon: Clock
      };
    }

    /* Date */

    if (
      msg.includes("date") ||
      msg.includes("today") ||
      msg.includes("todays date")
    ) {
      return {
        text: `Today: ${new Date().toLocaleDateString()}`,
        icon: CalendarDays
      };
    }

    /*
      Score every response instead of simply
      selecting the first keyword.
    */


let bestMatch:
  | {
      answer: string;
      icon: LucideIcon;
    }
  | null = null;

let highestScore = 0;

for (const item of chatbotData) {
  let score = 0;

  for (const keyword of item.keywords) {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      continue;
    }

    if (msg === normalizedKeyword) {
      score += 100;
    } else if (msg.includes(normalizedKeyword)) {
      score += 10 + normalizedKeyword.length;
    }
  }

  if (score > highestScore) {
    highestScore = score;

    bestMatch = {
      answer: item.answer,
      icon: item.icon
    };
  }
}

if (bestMatch !== null) {
  return {
    text: bestMatch.answer,
    icon: bestMatch.icon
  };
}


    /* Fallback */

    return {
      text:
        "I'm here to help with HIRANYA. You can ask me about jewellery, collections, metals, prices, offers, coupons, cart, wishlist, checkout, payments, shipping, orders, returns, warranty, custom designs, stores or customer support.",
      icon: Sparkles
    };
  };

  /* =========================================
     SEND MESSAGE
  ========================================= */

  const sendMessage = (text?: string) => {
    const userText = text ?? input;

    if (!userText.trim()) {
      return;
    }

    /* User message */

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText.trim()
      }
    ]);

    /* Bot response */

    const reply = getReply(userText);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply.text,
          icon: reply.icon
        }
      ]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* =====================================
          FLOATING GREETING
      ====================================== */}

      {showGreeting && !open && (
        <div className="chat-greeting">

          <div className="chat-greeting-content">

            <strong>
              <Hand
                size={15}
                strokeWidth={1.8}
              />

              Hi, I'm Aarohi
            </strong>

            <span>
              Your HIRANYA Jewellery Concierge
            </span>

            <small>
              How may I assist you today?
            </small>

          </div>

          <div className="chat-greeting-arrow"></div>

        </div>
      )}

      {/* =====================================
          FLOATING BUTTON
      ====================================== */}

      {!open && (
        <button
          className="chat-toggle"
          onClick={handleChatToggle}
          onMouseEnter={handleMouseEnter}
          aria-label="Open Aarohi Chatbot"
        >

          <img
            src={aarohi}
            alt="Aarohi"
            className="chat-toggle-avatar"
          />

        </button>
      )}

      {/* =====================================
          CHAT WINDOW
      ====================================== */}

      {open && (
        <div className="chat-window">

          {/* Header */}

          <div className="chat-header">

            <div className="chat-header-left">

              <img
                src={aarohi}
                alt="Aarohi"
                className="chat-avatar"
              />

              <div className="chat-info">

                <h4>
                  Aarohi
                </h4>

                <p>
                  Luxury Jewellery Expert
                </p>

                <span className="chat-status">
                  ● Online
                </span>

              </div>

            </div>

            <button
              className="chat-close"
              onClick={handleChatToggle}
              aria-label="Close chatbot"
            >

              <X
                size={20}
                strokeWidth={1.8}
              />

            </button>

          </div>

          {/* =================================
              CHAT BODY
          ================================== */}

          <div className="chat-body">

            {/* Quick Buttons */}

            <div className="quick-buttons">

              <button
                onClick={() =>
                  sendMessage("rings")
                }
              >
                <Gem size={15} />
                Rings
              </button>

              <button
                onClick={() =>
                  sendMessage("new arrivals")
                }
              >
                <Sparkles size={15} />
                New
              </button>

              <button
                onClick={() =>
                  sendMessage("shipping")
                }
              >
                <Truck size={15} />
                Shipping
              </button>

              <button
                onClick={() =>
                  sendMessage("contact")
                }
              >
                <Phone size={15} />
                Contact
              </button>

            </div>

            {/* Messages */}

            {messages.map((msg, index) => {

              const Icon = msg.icon;

              return (
                <div
                  key={index}
                  className={`message ${msg.sender}`}
                >

                  {msg.sender === "bot" &&
                    Icon && (
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        className="message-icon"
                      />
                    )}

                  <span>
                    {msg.text}
                  </span>

                </div>
              );
            })}

            <div ref={bottomRef}></div>

          </div>

          {/* =================================
              INPUT
          ================================== */}

          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask Aarohi..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  sendMessage();
                }

              }}
            />

            <button
              onClick={() =>
                sendMessage()
              }
              aria-label="Send message"
            >

              <Send
                size={20}
                strokeWidth={1.8}
              />

            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default Chatbot;