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
    const openRouterKey = Deno.env.get('OPENROUTER_API_KEY')
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 2. FETCH ALL DATA IN PARALLEL
    const [pricesRes, knowledgeRes, faqsRes, servicesRes, articlesRes] = await Promise.all([
      supabase.from('configurator_prices').select('item_key, label, price, unit'),
      supabase.from('bot_knowledge').select('title, content, category').eq('is_active', true),
      supabase.from('faqs').select('question, answer').eq('is_active', true),
      supabase.from('services').select('slug, name, description').eq('is_active', true),
      supabase.from('articles').select('title, slug, content').eq('is_published', true)
    ])

    const prices = pricesRes.data
    const knowledge = knowledgeRes.data
    const faqs = faqsRes.data
    const services = servicesRes.data
    const articles = articlesRes.data

    // Format prices for the prompt
    const priceList = prices?.map(p => `- ${p.label}: ${p.price} Kč/${p.unit || 'm2'}`).join('\n') || 
      'Ceny jsou k dispozici na vyžádání.';
    
    // Format knowledge base
    const knowledgeContext = knowledge?.map(k => `### ${k.title} (${k.category})\n${k.content}`).join('\n\n') || 
      'Zatím nemáme doplňující informace.';

    // Format FAQs
    const faqContext = faqs?.map(f => `Otázka: ${f.question}\nOdpověď: ${f.answer}`).join('\n\n') || 
      'Žádné FAQ.';

    // Format services
    const servicesContext = services?.map(s => `---\n${s.name} (slug: ${s.slug})\n${s.description}`).join('\n\n') || 
      'Žádné služby.';

    // Format articles
    const articlesContext = articles?.map(a => `---\n${a.title}\n${a.content}`).join('\n\n') || 
      'Žádné články.';

    const systemPrompt = `
      Jsi profesionální AI asistent pro firmu NANOfusion s.r.o., experta na hloubkové čištění a nano-ochranu povrchů.
      Tvá role je fungovat jako špičkový technický a obchodní konzultant.
      
      --- SLUŽBY ---
      ${servicesContext}
      
      --- ČASTÉ DOTAZY ---
      ${faqContext}
      
      --- ČLÁNKY A INFORMACE ---
      ${articlesContext}
      
      --- ZNALOSTNÍ BÁZE ---
      ${knowledgeContext}
      
      CENÍK (Kč/m2 nebo jednotku):
      ${priceList}
      
      KLÍČOVÉ INFORMACE:
      - Záruka na nano-ochranu: až 10 let
      - Termíny realizace: obvykle do 14 dnů
      - Zaměření a konzultace: ZDARMA po celé ČR
      - Sídlo: Blučina (jižní Morava), působíme po celé ČR
      
      TVÉ CÍLE:
      1. ODPovídát na technické dotazy přesně na základě výše uvedených dat
      2. POMOCI S KALKULACÍ (vždy počítej s cenou z ceníku výše)
      3. ZÍSKAT KONTAKT (Jméno, Telefon, Adresa, Plocha)
      
      PRAVIDLA:
      - Buď profesionální, stručný a přátelský
      - Odpovídej POUZE na základě poskytnutých dat — nikdy si nevymýšlej ceny, technologie nebo postupy
      - Pokud neznáš odpověď, řekni: "Tento specifický detail s vámi rád probere náš hlavní technik. Mohu vás s ním spojit?"
      - Piš stručně (max 2-3 věty na odstavec), používej odrážky pro čitelnost
      
      SKRYTÁ ZNAČKA PRO LEAD:
      Pokud získáš kontaktní údaje, přidej na ÚPLNÝ KONEC zprávy:
      [LEAD: Jméno, Telefon, Adresa, Plocha]
      (Nevyplněné údaje nahraď slovem "Neznámé")
    `;

    // 3. Call OpenRouter (compatible with OpenAI API format)
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nanofusion.cz',
        'X-Title': 'NANOFusion Chat',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
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
