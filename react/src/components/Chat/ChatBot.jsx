import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response from bot." }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 justify-center items-center p-4">
      <div className="flex flex-col bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-lg font-semibold text-white">💬 Gemini ChatBot</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] p-3 rounded-lg shadow-md whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-gray-100 text-gray-900 self-start"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className={`${className} bg-gray-300 px-1 rounded`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}
          {loading && (
            <p className="text-gray-400 italic">Bot is typing...</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-gray-700 bg-gray-800 px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}


// import React, { useState } from "react";

// const ChatBot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();
//       setMessages([...newMessages, { role: "assistant", content: data.reply }]);
//     } catch (err) {
//       console.error(err);
//       setMessages([
//         ...newMessages,
//         { role: "assistant", content: "Error: Unable to get a response." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
// <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 justify-center items-center">
//   <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] overflow-hidden">

//     {/* Header */}
//     <div className="px-6 py-4 border-b border-gray-700 bg-white/10 backdrop-blur-md">
//       <h2 className="text-lg font-semibold text-white">Gemini ChatBot</h2>
//     </div>

//     {/* Messages */}
//     <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
//       {messages.map((msg, i) => (
//         <div
//           key={i}
//           className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${
//             msg.role === "user"
//               ? "bg-blue-500 text-white self-end ml-auto"
//               : "bg-gray-200 text-gray-900 self-start"
//           }`}
//         >
//           {msg.content}
//         </div>
//       ))}
//       {loading && <p className="text-gray-400 italic">Bot is typing...</p>}
//     </div>

//     {/* Input */}
//     <form
//       onSubmit={handleSubmit}
//       className="flex items-center gap-2 border-t border-gray-700 bg-white/10 backdrop-blur-md px-4 py-3"
//     >
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         type="text"
//         placeholder="Type your message..."
//         className="flex-1 bg-white/20 text-white rounded-lg px-4 py-2 outline-none placeholder-gray-300"
//       />
//       <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition">
//         Send
//       </button>
//     </form>
//   </div>
// </div>


//   );
// };

// export default ChatBot;
