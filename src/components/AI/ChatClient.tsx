"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatClient({
  initialModels,
  initialModel,
}: {
  initialModels: string[];
  initialModel: string;
}) {
  const [models] = useState<string[]>(initialModels);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<Message[]>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Autoresize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 160;
    const h = Math.min(el.scrollHeight, max);
    el.style.height = `${h}px`;
    el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
  }, [input]);

  // Scroll bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (userMessage: Message, history: Message[]) => {
      try {
        // Sisällytä myös uusin viesti payloadiin
        const payloadMessages = [...history, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AI_API_URL}/v1/chat/completions`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "X-Shared-Secret":
                process.env.NEXT_PUBLIC_AI_API_SECRET_KEY || "",
            },
            body: JSON.stringify({
              model: selectedModel,
              messages: payloadMessages,
              max_tokens: 512,
            }),
          }
        );

        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(`API ${res.status} ${detail}`);
        }

        const data = await res.json();
        const reply =
          data?.choices?.[0]?.message?.content ||
          data?.choices?.[0]?.text ||
          "(no reply)";

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: reply,
            timestamp: new Date(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Error fetching response. Try again.",
            timestamp: new Date(),
          },
        ]);
      }
    },
    [selectedModel]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: input.trim(),
        timestamp: new Date(),
      };

      setMessages((p) => [...p, userMessage]);
      setInput("");
      setIsLoading(true);

      // Viedään historia (ilman uutta) + funktio lisää sen payloadiin
      await sendMessage(userMessage, messagesRef.current);

      setIsLoading(false);
    },
    [input, isLoading, sendMessage]
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div
          className="max-w-7xl mx-auto p-4 space-y-4"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 0 && (
            <div className="py-14 text-center space-y-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow">
                  <Bot className="w-7 h-7 text-black" />
                </div>
                <h1
                  className="text-2xl font-semibold text-white font-geist"
                  role="heading"
                  aria-label="Ask something to begin"
                >
                  Ask something to begin
                </h1>
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-4">
              {m.role === "assistant" && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
              )}
              <div
                className={[
                  "w-full sm:max-w-[65ch] rounded-2xl px-4 py-3 leading-relaxed break-words",
                  m.role === "user"
                    ? "bg-gray-300 text-black ml-auto"
                    : "bg-gray-800 text-white mr-auto",
                ].join(" ")}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div className="bg-gray-800 rounded-lg px-4 py-3 mr-12">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="text-gray-300">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 inset-x-0 bg-gradient-to-t from-main via-main/95 to-transparent pt-4">
        <div className="max-w-5xl mx-auto px-4 pb-6">
          <div className="rounded-xl border border-white/10 bg-[#1f1f1f] shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 p-3"
              aria-label="Message input"
            >
              <div className="flex-1 min-w-0">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Boggo AI…"
                  rows={1}
                  className="w-full resize-none bg-transparent text-white placeholder-gray-400 focus:outline-none leading-relaxed max-h-40 p-2"
                  aria-label="Type your message"
                />

                <div className="flex items-center justify-between px-1 pb-1">
                  <p className="text-xs text-gray-400">
                    Enter to send • Shift+Enter newline
                  </p>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="inline-model"
                      className="text-xs text-gray-500"
                    >
                      Model
                    </label>
                    <select
                      id="inline-model"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="text-xs bg-transparent border border-white/10 rounded px-1 py-0.5 text-gray-300 focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      {models.map((m) => (
                        <option
                          key={m}
                          value={m}
                          className="bg-[#1f1f1f] text-gray-200"
                        >
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white text-black px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
          <p className="mt-2 text-center text-[11px] text-gray-500">
            Boggo AI is intended for use by partners and staff only. We do not
            take responsibility for artificial intelligence or the answers it
            provides.
          </p>
        </div>
      </div>
    </>
  );
}
