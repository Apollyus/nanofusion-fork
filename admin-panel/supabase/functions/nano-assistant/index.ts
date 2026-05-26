import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()
    
    // 1. Setup Supabase Client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ""
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ""
    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 2. FETCH LIVE PRICES & KNOWLEDGE FROM DB
    const [pricesRes, knowledgeRes] = await Promise.all([
      supabase.from('configurator_prices').select('item_key, label, price, unit'),
      supabase.from('bot_knowledge').select('title, content, category').eq('is_active', true)
    ])

    const prices = pricesRes.data
    const knowledge = knowledgeRes.data

    // Format data for the prompt
    const priceList = prices?.map(p => `- ${p.label}: ${p.price} Kč/${p.unit || 'm2'}`).join('\n') || 
      'Ceny jsou k dispozici na vyžádání.';
    
    const knowledgeContext = knowledge?.map(k => `### ${k.title} (${k.category})\n${k.content}`).join('\n\n') || 
      'Zatím nemáme doplňující informace.';

    const systemPrompt = `
      Jsi profesionální AI asistent pro firmu NANOfusion s.r.o., experta na hloubkové čištění a nano-ochranu povrchů.
      Tvá role je fungovat jako špičkový technický a obchodní konzultant.
      
      --- ZNALOSTNÍ BÁZE A CENÍK ---
      ${knowledgeContext}
      
      CENY (Kč/m2 nebo jednotku):
      ${priceList}
      
      KONSTANTY FIRMY:
      - Záruka: až 10 let
      - Termíny: realizace do 14 dnů
      - Zaměření a konzultace: ZDARMA po celé ČR
      - Sídlo: Blučina u Brna
      
      --- TVÉ CÍLE A PRAVIDLA ---
      1. ABSOLUTNÍ PŘESNOST: Při odpovídání vycházej POUZE z informací v sekci ZNALOSTNÍ BÁZE a CENÍK. Nikdy si nevymýšlej technologie, postupy ani ceny, které zde nejsou uvedeny.
      2. NEZNALOST JE OK: Pokud se klient ptá na detail, který v datech nemáš, neomlouvej se. Místo toho sebevědomě odvět: "Tento specifický detail s vámi rád probere náš hlavní technik. Mohu vás s ním spojit?"
      3. OBCHODNÍ CÍL (LEAD): Tvá hlavní priorita je získat od klienta poptávku (Jméno, Telefon, Adresa, přibližná velikost plochy). Plynule ho k tomu naveď.
      4. TÓN KOMUNIKACE: Piš stručně, sebevědomě, vysoce profesionálně a přátelsky. Využívej odrážky pro čitelnost. Mluv v krátkých odstavcích (max 2-3 věty).
      
      --- SYSTÉMOVÉ ZNAČKY ---
      Pokud ti klient v chatu poskytne kontaktní údaje (jméno, telefon atd.), přidej na ÚPLNÝ KONEC tvé zprávy tento skrytý tag:
      [LEAD: Jméno, Telefon, Adresa, Plocha]
      (Nevyplněné údaje nahraď slovem "Neznámé")
    `;

    // 3. Call OpenAI (using gpt-4o for maximum reasoning capabilities and lower temp for factuality)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.2,
      }),
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error.message);

    const botMessage = data.choices[0].message.content
    
    return new Response(JSON.stringify({ reply: botMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Function Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
