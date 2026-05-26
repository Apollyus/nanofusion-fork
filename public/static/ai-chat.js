/* AI Nano-Assistant for NANOfusion */

document.addEventListener('DOMContentLoaded', () => {
    const chatConfig = {
        name: 'Nano-Asistent',
        tagline: 'Odborník na hloubkové čištění a ochranu',
        prices: {
            roof: 190, facade: 150, pavement: 120, pv: 80,
            graffiti: 250, industrial: 130, 'facade-paint': 200, 'roof-paint': 180,
            impregnation: 70, antislip: 120, ceramfloor: 250, antibac: 80,
            default: 150
        },
        markup: 1.10 // 10% premium for safe anchoring
    };

    // --- LIVE PRICE SYNC ---
    const syncPrices = async () => {
        try {
            const { supabase } = await import('./supabase-config.js');
            const { data, error } = await supabase.from('configurator_prices').select('item_key, price');
            if (!error && data) {
                data.forEach(item => {
                    if (chatConfig.prices[item.item_key] !== undefined) {
                        chatConfig.prices[item.item_key] = item.price;
                    }
                });
                console.log('Nanobot: Ceny synchronizovány');
            }
        } catch (e) {
            console.warn('Nanobot: Cloud Sync cen nedostupný');
        }
    };

    const syncKnowledge = async () => {
        try {
            const { supabase } = await import('./supabase-config.js');
            const { data, error } = await supabase.from('bot_knowledge').select('*').eq('is_active', true);
            if (!error && data) {
                // Predefined answers mapping
                data.filter(k => k.category === 'předdefinované').forEach(k => {
                    const key = k.title.toLowerCase().replace(/\s/g, '_');
                    knowledgeBase[key] = {
                        keywords: k.title.toLowerCase().split(',').map(s => s.trim()),
                        answer: k.content
                    };
                });
                
                // Greeting buttons if any
                const greetingEntry = data.find(k => k.title === 'GREETING_BUTTONS');
                if (greetingEntry) {
                    chatConfig.greetingButtons = greetingEntry.content.split(',').map(s => s.trim());
                }
                console.log('Nanobot: Znalostní báze synchronizována');
            }
        } catch (e) {
            console.warn('Nanobot: Cloud Sync znalostí nedostupný');
        }
    };
    
    syncPrices();
    syncKnowledge();

    let chatState = 'INIT';
    let currentContext = 'GENERAL';
    let chatHistory = []; // Pro sledování celého chatu
    let userData = {
        service: '',
        location: '',
        details: '',
        area: 0,
        contact: ''
    };

    // --- Dynamic Context Tracking ---
    const targetSections = ['sluzby', 'realizace', 'reference', 'proces'];
    const ctxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentContext = entry.target.id.toUpperCase();
                console.log(`AI Chat Context: ${currentContext}`);
            }
        });
    }, { threshold: 0.5 });

    targetSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) ctxObserver.observe(el);
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        const isMobile = window.innerWidth < 768;
        const welcome = isMobile ? 'Zdravím! Jsem váš Nano-asistent. 📱' : 'Dobrý den! Jsem váš Nano-asistent pro ochranu povrchů.';
        
        if (hour < 12) return welcome + ' Jak vám mohu dnes ráno pomoci?';
        if (hour < 18) return welcome + ' S čím vám mohu dnes pomoci?';
        return welcome + ' Přejete si probrat ochranu vašeho objektu?';
    };

    // --- Admin Safety Check ---
    const checkAdminState = () => {
        const launcher = document.getElementById('ai-chat-launcher');
        const widget = document.getElementById('ai-chat-window');
        if (window.location.hash === '#admin') {
            if (launcher) launcher.style.display = 'none';
            if (widget) widget.style.display = 'none';
            return true;
        }
        if (launcher) launcher.style.display = 'flex';
        return false;
    };

    if (checkAdminState()) {
        window.addEventListener('hashchange', checkAdminState);
        return;
    }
    window.addEventListener('hashchange', checkAdminState);

    // Create the UI HTML
    const launcher = document.createElement('div');
    launcher.className = 'ai-chat-launcher';
    launcher.id = 'ai-chat-launcher';
    launcher.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
    `;
    document.body.appendChild(launcher);

    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chat-window';
    chatWindow.id = 'ai-chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <img src="/static/logo.jpg" alt="Nano-Asistent">
            <div class="chat-header-info">
                <h4>${chatConfig.name}</h4>
                <p>${chatConfig.tagline}</p>
            </div>
            <button id="close-chat" style="margin-left: auto; background: none; border: none; color: white; cursor: pointer; font-size: 1.5rem;">&times;</button>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div id="typing" class="typing-indicator">Asistent píše...</div>
        </div>
        <div class="chat-footer">
            <input type="text" class="chat-input" id="chat-input" placeholder="Napište zprávu...">
            <button class="chat-send-btn" id="chat-send">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    const msgContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const typing = document.getElementById('typing');

    // --- Notification System v2 ---
    let audioContext = null;
    const initAudio = () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    };

    const playNotification = () => {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    };

    // Unlock audio on ANY interaction
    ['click', 'touchstart', 'scroll'].forEach(evt => {
        document.addEventListener(evt, initAudio, { once: true });
    });

    // Toggle Chat
    launcher.onclick = () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
        if (chatWindow.style.display === 'flex') {
            playNotification();
            if (chatState === 'INIT') startChat();
        }
    };

    document.getElementById('close-chat').onclick = () => {
        chatWindow.style.display = 'none';
    };

    const addMessage = (text, type = 'bot', quickReplies = []) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = text;
        msgContainer.appendChild(msgDiv);
        
        chatHistory.push({ 
            type: type === 'bot' ? 'Asistent' : 'Zákazník', 
            text: text, 
            time: new Date().toLocaleTimeString('cs-CZ'),
            role: type === 'bot' ? 'assistant' : 'user'
        });

        // --- REAL-TIME SYNC TO ADMIN ---
        if (!chatConfig.sessionId) {
            chatConfig.sessionId = 'chat_' + Math.random().toString(36).substring(2, 11);
        }

        import('./supabase-config.js').then(({ supabase }) => {
            supabase.from('chat_sessions').upsert({
                session_token: chatConfig.sessionId,
                user_identifier: userData.contact || userData.location || 'Návštěvník',
                messages: chatHistory,
                status: 'open',
                last_activity: new Date().toISOString()
            }, { onConflict: 'session_token' }).then(({ error }) => {
                if (error) console.error('Nanobot Sync Error:', error);
            });
        });

        if (quickReplies.length > 0) {
            const repliesDiv = document.createElement('div');
            repliesDiv.className = 'quick-replies';
            quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.innerText = reply;
                btn.onclick = () => {
                    // Special case for navigation buttons
                    if (reply.startsWith('🔗')) {
                        const target = reply.includes('Recenze') ? 'reference' : 
                                       reply.includes('Realizace') ? 'realizace' : 
                                       reply.includes('Služby') ? 'sluzby' : '';
                        if (target) {
                            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                            chatWindow.style.display = 'none';
                            return;
                        }
                    }
                    handleInput(reply);
                };
                repliesDiv.appendChild(btn);
            });
            msgContainer.appendChild(repliesDiv);
        }
        msgContainer.scrollTop = msgContainer.scrollHeight;
    };

    const botSay = (text, quickReplies = [], delay = 800) => {
        typing.style.display = 'block';
        msgContainer.scrollTop = msgContainer.scrollHeight;
        setTimeout(() => {
            typing.style.display = 'none';
            addMessage(text, 'bot', quickReplies);
        }, delay);
    };

    const startChat = () => {
        chatState = 'ASK_SERVICE';
        const buttons = chatConfig.greetingButtons || [
            'Čištění střechy/fasády',
            'Solární panely',
            'Nátěry střech/fasád',
            'Služby pro firmy'
        ];
        botSay(getGreeting(), buttons);
    };

    const handleInput = (input) => {
        if (!input.trim()) return;
        addMessage(input, 'user');
        chatInput.value = '';
        setTimeout(() => processLogic(input, input.toLowerCase()), 600);
    };

    // --- Nanobot Knowledge Base ---
    const knowledgeBase = {
        okapy: {
            keywords: ['okap', 'rýny', 'odtok'],
            answer: 'Ano, čištění a kontrola okapů je standardní součástí naší renovace střech. Chceme, aby váš dům po našem zásahu fungoval jako celek. Máte okapy hodně zanesené?'
        },
        zaruka: {
            keywords: ['záruk', 'garanc', 'jak dlouho vydrží'],
            answer: 'U naší nano-ochrany dáváme garanci až 10 let na funkčnost povrchu. Technologie NANOfusion zabraňuje hloubkovému usazování nečistot a růstu mechů.'
        },
        rychlost: {
            keywords: ['jak dlouho to trvá', 'termín', 'kdy začnete'],
            answer: 'Většinu rodinných domů stihneme kompletně vyčistit a ošetřit během 1 až 2 dnů. Aktuálně máme volné termíny v horizontu 14 dnů.'
        },
        cena: {
            keywords: ['cena', 'kolik to stojí', 'rozpočet', 'peněz'],
            answer: 'Cena je individuální a závisí na ploše a stavu povrchu. Abych vám mohl říct aspoň orientační rozmezí, potřeboval bych znát přibližnou plochu v m².'
        }
    };

    const processLogic = async (original, text) => {
        // First, check for general questions (FAQ)
        for (let key in knowledgeBase) {
            const entry = knowledgeBase[key];
            if (entry.keywords.some(k => text.includes(k))) {
                botSay(entry.answer);
                if (chatState !== 'FINISHED') {
                    setTimeout(() => botSay(`Vraťme se ale k vaší poptávce. **${getStateQuestion()}**`), 2500);
                }
                return;
            }
        }

        // If we are in the middle of lead generation, continue it
        if (['ASK_ADDRESS', 'ASK_AREA', 'ASK_CONTACT'].includes(chatState)) {
            handleLeadFlow(original, text);
            return;
        }

        // Otherwise, ask OpenAI (Edge Function)
        botSay('Půjdu se na to zeptat mého nano-mozku... 🧠', [], 400);
        
        try {
            const { supabase } = await import('./supabase-config.js');
            const session = await supabase.auth.getSession();
            
            // Format history for OpenAI
            const history = chatHistory.slice(-5).map(h => ({
                role: h.type === 'Asistent' ? 'assistant' : 'user',
                content: h.text
            }));

            const response = await fetch('https://mgmtkdwvhgrzefmyucvr.supabase.co/functions/v1/nano-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabase.supabaseKey}`
                },
                body: JSON.stringify({ messages: history })
            });

            const data = await response.json();
            if (data.reply) {
                let finalReply = data.reply;
                
                // If the bot extracted a LEAD, handle it and remove the tag from the UI
                const leadMatch = finalReply.match(/\[LEAD:\s*(.*?)\]/i);
                if (leadMatch) {
                    const leadData = leadMatch[1].split(',').map(s => s.trim());
                    const [name, phone, address, area] = leadData;
                    
                    console.log('Nanobot extracted a lead:', { name, phone, address, area });
                    
                    import('./supabase-config.js').then(({ supabase }) => {
                        supabase.from('inquiries').insert({
                            name: name || 'Zákazník z AI Chatu',
                            phone: phone || userData.contact || 'Neznámé',
                            address: address || userData.location || 'Neznámé',
                            service: userData.service || 'Konzultace z chatu',
                            message: `Poptávka vygenerovaná plně přes AI Chat.\nPlocha: ${area || 'Neznámé'}\nJméno: ${name || 'Neznámé'}`,
                            source: 'chat',
                            status: 'new'
                        }).then(({ error }) => {
                            if (error) console.error('AI Inquiry Save Error:', error);
                        });

                        supabase.from('chat_sessions').update({
                            user_identifier: phone || name || 'Zákazník',
                            status: 'closed'
                        }).eq('session_token', chatConfig.sessionId);
                    });

                    // Remove the tag from the text displayed to the user
                    finalReply = finalReply.replace(/\[LEAD:\s*(.*?)\]/i, '').trim();
                    chatState = 'FINISHED';
                }
                
                botSay(finalReply);
            } else {
                throw new Error('No reply');
            }
        } catch (e) {
            console.error('AI Error:', e);
            handleLeadFlow(original, text); // Fallback to lead flow
        }
    };

    const handleLeadFlow = (original, text) => {
        switch (chatState) {
            case 'ASK_SERVICE':
                userData.service = original;
                chatState = 'ASK_ADDRESS';
                botSay('Skvělá volba! Pro začátek mi napište **přesnou adresu realizace** (kvůli výpočtu dopravy). 📍');
                break;

            case 'ASK_ADDRESS':
                if (original.length < 5) {
                    botSay('Prosím zadejte celou adresu (ulice, město), abychom mohli spočítat dopravu. 🏠');
                    return;
                }
                userData.location = original;
                chatState = 'ASK_AREA';
                botSay(`Děkuji! Adresu **${userData.location}** jsem uložil. O jak **velkou plochu** (m²) se přibližně jedná?`);
                break;

            case 'ASK_AREA':
                const area = text.replace(/[^0-9]/g, '');
                if (!area || parseInt(area) < 1) {
                    botSay('Napište prosím přibližný počet m² (stačí číslo). 🔢');
                    return;
                }
                userData.area = area;
                chatState = 'ASK_CONTACT';
                botSay('Děkuji. Poslední krok - zanechte mi prosím vaše **telefonní číslo**, ať se vám můžeme ozvat s nabídkou. 📞');
                break;

            case 'ASK_CONTACT':
                const sanitizedPhone = original.replace(/\s/g, '');
                if (sanitizedPhone.length < 9) {
                    botSay('Zadejte prosím platné telefonní číslo (např. 777 123 456). 📱');
                    return;
                }
                userData.contact = original;
                chatState = 'FINISHED';
                
                botSay('Perfektní, vaše poptávka je v systému! ✨');
                botSay('**Rekapitulace:**\n• Služba: ' + userData.service + '\n• Adresa: ' + userData.location + '\n• Plocha: ' + userData.area + ' m²\n\n*Kolegové se vám ozvou s finální cenou včetně dopravy do 24 hodin.*');
                
                botSay('Co by vás zajímalo dál?', [
                    '🔗 Ukázat Recenze',
                    '🔗 Ukázat Realizace',
                    '🔗 Ostatní Služby'
                ]);
                
                // Final sync for inquiry
                import('./supabase-config.js').then(({ supabase }) => {
                    supabase.from('inquiries').insert({
                        name: 'Zákazník z Chatu',
                        phone: userData.contact,
                        address: userData.location,
                        service: userData.service,
                        message: `Poptávka z AI Chatu. Plocha: ${userData.area} m2.`,
                        source: 'chat',
                        status: 'new'
                    }).then(({ error }) => {
                        if (error) console.error('Inquiry Save Error:', error);
                    });

                    // Mark session as lead generated
                    supabase.from('chat_sessions').update({
                        user_identifier: userData.contact,
                        status: 'closed' // Optional: close it or keep open
                    }).eq('session_token', chatConfig.sessionId);
                });
                break;

            case 'FINISHED':
                botSay('Jsem připraven na vaše dotazy. Co vás konkrétně zajímá ohledně našich technologií nebo záruk?');
                break;

            default:
                botSay('Rozumím. S čím dalším vám mohu pomoci?');
        }
    };

    const getStateQuestion = () => {
        switch (chatState) {
            case 'ASK_SERVICE': return 'Jakou službu bychom pro vás měli zajistit?';
            case 'ASK_ADDRESS': return 'V jaké lokalitě se váš objekt nachází?';
            case 'ASK_AREA': return 'O jak velkou plochu (m²) se přibližně jedná?';
            case 'ASK_CONTACT': return 'Na jaké číslo vám můžeme zavolat s nabídkou?';
            default: return 'Zajímají vás další detaily?';
        }
    };

    sendBtn.onclick = () => handleInput(chatInput.value);
    chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleInput(chatInput.value); };

    // --- Auto-pop logic (Disabled for now) ---
    /*
    setTimeout(() => {
        // If chat isn't already open, open it
        if (chatWindow.style.display !== 'flex') {
            chatWindow.style.setProperty('display', 'flex', 'important');
            if (chatState === 'INIT') startChat();
            console.log('AI Chat: Auto-pop triggered');
        }
    }, 4000);
    */
});
