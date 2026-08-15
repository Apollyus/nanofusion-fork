"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type Message = {
  type: "bot" | "user";
  text: string;
  quickReplies?: string[];
};

type ChatState = "INIT" | "ASK_SERVICE" | "ASK_ADDRESS" | "ASK_AREA" | "ASK_CONTACT" | "FINISHED";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotEnabled, setIsBotEnabled] = useState(true); // NATVRDO ZAPNUTO
  const [chatState, setChatState] = useState<ChatState>("INIT");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [sessionId, setSessionId] = useState("");
  const [botKnowledge, setBotKnowledge] = useState<Record<string, { keywords: string[]; answer: string }>>({});
  const [greetingButtons, setGreetingButtons] = useState<string[]>([]);
  
  const [userData, setUserData] = useState({
    service: "",
    location: "",
    area: "",
    contact: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Získá aktuální hodinu pro správný pozdrav
  const getGreeting = () => {
    const hour = new Date().getHours();
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const welcome = isMobile
      ? "Zdravím! Jsem váš Nano-asistent. 📱"
      : "Dobrý den! Jsem váš Nano-asistent pro ochranu povrchů.";

    if (hour < 12) return welcome + " Jak vám mohu dnes ráno pomoci?";
    if (hour < 18) return welcome + " S čím vám mohu dnes pomoci?";
    return welcome + " Přejete si probrat ochranu vašeho objektu?";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const initBot = async () => {
      // Check if bot is enabled
      // ZAPNUTO NATVRDO PRO TESTOVÁNÍ (původní podmínka zakomentována)
      // if (configData && configData.value === "true") {
        setIsBotEnabled(true);
        // Generování session ID
        setSessionId("chat_" + Math.random().toString(36).substring(2, 11));

        // Auto pop-up
        setTimeout(() => {
          if (!isOpen && window.location.hash !== "#admin") {
            setIsOpen(true);
          }
        }, 1200);
      // }

      // Load bot knowledge
      const { data: knowledgeData } = await supabase
        .from("bot_knowledge")
        .select("*")
        .eq("is_active", true);

      if (knowledgeData) {
        const kb: Record<string, { keywords: string[]; answer: string }> = {};
        knowledgeData
          .filter((k) => k.category === "předdefinované")
          .forEach((k) => {
            const key = k.title.toLowerCase().replace(/\s/g, "_");
            kb[key] = {
              keywords: k.title.toLowerCase().split(",").map((s: string) => s.trim()),
              answer: k.content,
            };
          });
        
        // Znalosti jako fallback
        const hardcodedKb = {
          okapy: { keywords: ['okap', 'rýny', 'odtok'], answer: 'Ano, čištění a kontrola okapů je standardní součástí naší renovace střech. Chceme, aby váš dům po našem zásahu fungoval jako celek. Máte okapy hodně zanesené?' },
          zaruka: { keywords: ['záruk', 'garanc', 'jak dlouho vydrží'], answer: 'U naší nano-ochrany dáváme garanci až 10 let na funkčnost povrchu. Technologie NANOfusion zabraňuje hloubkovému usazování nečistot a růstu mechů.' },
          rychlost: { keywords: ['jak dlouho to trvá', 'termín', 'kdy začnete'], answer: 'Většinu rodinných domů stihneme kompletně vyčistit a ošetřit během 1 až 2 dnů. Aktuálně máme volné termíny v horizontu 14 dnů.' },
          cena: { keywords: ['cena', 'kolik to stojí', 'rozpočet', 'peněz'], answer: 'Cena je individuální a závisí na ploše a stavu povrchu. Abych vám mohl říct aspoň orientační rozmezí, potřeboval bych znát přibližnou plochu v m².' }
        };
        
        setBotKnowledge(Object.keys(kb).length > 0 ? kb : hardcodedKb);

        const greetingEntry = knowledgeData.find((k) => k.title === "GREETING_BUTTONS");
        if (greetingEntry) {
          setGreetingButtons(greetingEntry.content.split(",").map((s: string) => s.trim()));
        } else {
          setGreetingButtons([
            "Čištění střechy/fasády",
            "Solární panely",
            "Nátěry střech/fasád",
            "Služby pro firmy",
          ]);
        }
      }
    };

    initBot();
  }, []);

  // Sync to supabase when messages change
  useEffect(() => {
    if (!sessionId || messages.length === 0) return;

    const chatHistoryToSave = messages.map((m) => ({
      type: m.type === "bot" ? "Asistent" : "Zákazník",
      text: m.text,
      time: new Date().toLocaleTimeString("cs-CZ"),
      role: m.type === "bot" ? "assistant" : "user",
    }));

    supabase.from("chat_sessions").upsert(
      {
        session_token: sessionId,
        user_identifier: userData.contact || userData.location || "Návštěvník",
        messages: chatHistoryToSave,
        status: "open",
        last_activity: new Date().toISOString(),
      },
      { onConflict: "session_token" }
    ).then(({ error }) => {
      if (error) console.error("Chat sync error:", error);
    });
  }, [messages, sessionId, userData.contact, userData.location]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && chatState === "INIT") {
      setTimeout(() => {
        setChatState("ASK_SERVICE");
        setMessages([
          {
            type: "bot",
            text: getGreeting(),
            quickReplies: greetingButtons.length > 0 ? greetingButtons : [
              "Čištění střechy/fasády",
              "Solární panely",
              "Nátěry střech/fasád",
              "Služby pro firmy",
            ],
          },
        ]);
      }, 500);
    }
  }, [isOpen, chatState, greetingButtons]);

  const getStateQuestion = (state: ChatState) => {
    switch (state) {
      case "ASK_SERVICE": return "Jakou službu bychom pro vás měli zajistit?";
      case "ASK_ADDRESS": return "V jaké lokalitě se váš objekt nachází?";
      case "ASK_AREA": return "O jak velkou plochu (m²) se přibližně jedná?";
      case "ASK_CONTACT": return "Na jaké číslo vám můžeme zavolat s nabídkou?";
      default: return "Zajímají vás další detaily?";
    }
  };

  const handleLeadFlow = (original: string, state: ChatState) => {
    switch (state) {
      case "ASK_SERVICE":
        setUserData((prev) => ({ ...prev, service: original }));
        setChatState("ASK_ADDRESS");
        botSay("Skvělá volba! Pro začátek mi napište **přesnou adresu realizace** (kvůli výpočtu dopravy). 📍");
        break;

      case "ASK_ADDRESS":
        const locLetters = original.replace(/[^a-zA-Zá-žÁ-Ž]/g, "");
        if (original.trim().length < 2 || locLetters.length < 2 || /^\d+$/.test(original.trim())) {
          botSay("Napište prosím platné město nebo obec, kde se objekt nachází. 📍");
          return;
        }
        setUserData((prev) => ({ ...prev, location: original }));
        setChatState("ASK_AREA");
        botSay(`Děkuji! Lokaci **${original}** jsem uložil. O jak **velkou plochu** (m²) se přibližně jedná?`);
        break;

      case "ASK_AREA":
        const area = original.replace(/[^0-9]/g, "");
        if (!area || parseInt(area) < 1) {
          botSay("Napište prosím přibližný počet m² (stačí číslo). 🔢");
          return;
        }
        setUserData((prev) => ({ ...prev, area }));
        setChatState("ASK_CONTACT");
        botSay("Děkuji. Poslední krok - zanechte mi prosím vaše **telefonní číslo**, ať se vám můžeme ozvat s nabídkou. 📞");
        break;

      case "ASK_CONTACT":
        const cleanPhone = original.replace(/[\s\-\(\)\+]/g, "");
        if (
          !/^\d{9,15}$/.test(cleanPhone) ||
          /^(\d)\1+$/.test(cleanPhone) ||
          cleanPhone === "123456789" ||
          cleanPhone === "987654321"
        ) {
          botSay("Zadejte prosím platné a reálné telefonní číslo (např. 774 509 409 nebo +420774509409). 📱");
          return;
        }
        setUserData((prev) => {
          const newData = { ...prev, contact: original };
          
          setChatState("FINISHED");
          botSay("Perfektní, vaše poptávka je v systému! ✨");
          botSay(
            `**Rekapitulace:**\n• Služba: ${newData.service}\n• Adresa: ${newData.location}\n• Plocha: ${newData.area} m²\n\n*Kolegové se vám ozvou s finální cenou včetně dopravy do 24 hodin.*`
          );
          botSay("Co by vás zajímalo dál?", [
            "🔗 Ukázat Recenze",
            "🔗 Ukázat Realizace",
            "🔗 Ostatní Služby",
          ]);

          // Uložení leadu
          supabase.from("inquiries").insert({
            name: "Zákazník z Chatu",
            phone: newData.contact,
            address: newData.location,
            service: newData.service,
            message: `Poptávka z AI Chatu. Plocha: ${newData.area} m2.`,
            source: "chat",
            status: "new",
          }).then(({ error }) => {
            if (error) console.error("Inquiry Save Error:", error);
          });

          return newData;
        });
        break;

      case "FINISHED":
        botSay("Jsem připraven na vaše dotazy. Co vás konkrétně zajímá ohledně našich technologií nebo záruk?");
        break;
        
      default:
        botSay("Rozumím. S čím dalším vám mohu pomoci?");
    }
  };

  const botSay = (text: string, quickReplies: string[] = [], delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text, quickReplies }]);
    }, delay);
  };

  const processInput = async (input: string) => {
    const lowerInput = input.toLowerCase();

    // 1. Znalostní báze
    for (const key in botKnowledge) {
      const entry = botKnowledge[key];
      if (entry.keywords.some((k: string) => lowerInput.includes(k))) {
        botSay(entry.answer);
        if (chatState !== "FINISHED") {
          setTimeout(() => {
            botSay(`Vraťme se ale k vaší poptávce. **${getStateQuestion(chatState)}**`);
          }, 2500);
        }
        return;
      }
    }

    // 2. Formulář (Lead flow)
    if (["ASK_ADDRESS", "ASK_AREA", "ASK_CONTACT"].includes(chatState)) {
      handleLeadFlow(input, chatState);
      return;
    }

    // 3. OpenAI Edge Function
    botSay("Půjdu se na to zeptat mého nano-mozku... 🧠", [], 400);

    try {
      await supabase.auth.getSession();
      
      const historyToSent = messages.slice(-5).map((h) => ({
        role: h.type === "bot" ? "assistant" : "user",
        content: h.text,
      }));

      // Přidat právě zadanou zprávu, pokud tam ještě není, history se updatuje asynchronně
      historyToSent.push({ role: "user", content: input });

      const response = await fetch("https://mgmtkdwvhgrzefmyucvr.supabase.co/functions/v1/nano-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Můžeme předat anon key pokud to API vyžaduje
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: historyToSent }),
      });

      const data = await response.json();
      if (data.reply) {
        let finalReply = data.reply;
        
        const leadMatch = finalReply.match(/\[LEAD:\s*(.*?)\]/i);
        if (leadMatch) {
          const leadData = leadMatch[1].split(",").map((s: string) => s.trim());
          const [name, phone, address, area] = leadData;

          supabase.from("inquiries").insert({
            name: name || "Zákazník z AI Chatu",
            phone: phone || userData.contact || "Neznámé",
            address: address || userData.location || "Neznámé",
            service: userData.service || "Konzultace z chatu",
            message: `Poptávka vygenerovaná plně přes AI Chat.\nPlocha: ${area || "Neznámé"}\nJméno: ${name || "Neznámé"}`,
            source: "chat",
            status: "new",
          });

          finalReply = finalReply.replace(/\[LEAD:\s*(.*?)\]/i, "").trim();
          setChatState("FINISHED");
        }
        
        botSay(finalReply);
      } else {
        throw new Error("No reply from AI");
      }
    } catch (e) {
      console.error("AI Error:", e);
      // Fallback
      handleLeadFlow(input, chatState);
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text }]);
    setInputValue("");
    processInput(text);
  };

  const renderText = (text: string) => {
    // Basic markdown for bold text (**text**) and linebreaks
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    }).reduce((prev: React.ReactNode[], curr: React.ReactNode, i: number) => {
      return prev === null ? [curr] : [...prev, <br key={`br-${i}`} />, curr];
    }, null as unknown as React.ReactNode[]);
  };

  if (!isBotEnabled) return null;

  return (
    <>
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
          aria-label="Otevřít chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-amber-500 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Nano-Asistent</h3>
                <p className="text-xs text-white/80">Odborník na hloubkové čištění</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    msg.type === "user"
                      ? "bg-amber-500 text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-sm"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {/* Simplistic bold text rendering, could be improved with marked/react-markdown */}
                  {msg.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {renderText(line)}
                    </React.Fragment>
                  ))}
                </div>
                
                {/* Quick Replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.quickReplies.map((reply, ridx) => (
                      <button
                        key={ridx}
                        onClick={() => {
                          if (reply.startsWith("🔗")) {
                            // Simple navigation fallback
                            const target = reply.includes("Recenze") ? "reference" : 
                                          reply.includes("Realizace") ? "realizace" : 
                                          reply.includes("Služby") ? "sluzby" : "";
                            if (target) {
                              const el = document.getElementById(`${target}-sec`);
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                                setIsOpen(false);
                              }
                            }
                          } else {
                            handleSend(reply);
                          }
                        }}
                        className="text-xs bg-white border border-amber-500 text-amber-600 px-3 py-1.5 rounded-full hover:bg-amber-50 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-gray-500 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-end">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(inputValue);
                }
              }}
              placeholder="Napište zprávu..."
              className="flex-1 max-h-32 min-h-[44px] resize-none px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              rows={1}
            />
            <Button
              onClick={() => handleSend(inputValue)}
              variant="primary"
              size="sm"
              className="h-[44px] w-[44px] rounded-xl p-0 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
