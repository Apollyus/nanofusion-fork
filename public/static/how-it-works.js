// --- Jak to funguje Dynamic Sync ---
// Tento skript přepisuje statickou sekci "Jak to funguje" daty z Admin panelu

const syncHowItWorks = async () => {
  try {
    const { supabase } = await import('./supabase-config.js');
    
    // Načti hlavičku a kroky paralelně
    const [sectionRes, stepsRes] = await Promise.all([
      supabase.from('site_sections').select('*').eq('section_key', 'how_it_works').single(),
      supabase.from('how_it_works_steps').select('*').order('order_index', { ascending: true })
    ]);

    const section = document.getElementById('proces');
    if (!section) return;

    // 1. Aktualizace hlavičky (pokud existuje v DB)
    if (!sectionRes.error && sectionRes.data) {
      const headerSpan = section.querySelector('span.text-primary');
      const headerH2 = section.querySelector('h2');
      if (headerSpan) headerSpan.innerText = sectionRes.data.title;
      if (headerH2) headerH2.innerText = sectionRes.data.subtitle;
    }

    // 2. Aktualizace kroků (pokud existují v DB)
    if (!stepsRes.error && stepsRes.data && stepsRes.data.length > 0) {
      const stepsContainer = section.querySelector('.grid');
      if (stepsContainer) {
        stepsContainer.innerHTML = ''; // Vyčistit původní kroky
        
        stepsRes.data.forEach((step, idx) => {
          const stepElement = document.createElement('div');
          stepElement.className = 'relative text-center animate-fade-in';
          
          // Ikona mapování (zjednodušené SVG pro nejčastější případy)
          let iconSvg = '';
          if (step.icon.toLowerCase().includes('phone')) {
            iconSvg = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
          } else if (step.icon.toLowerCase().includes('check')) {
            iconSvg = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="m9 14 2 2 4-4"></path></svg>';
          } else if (step.icon.toLowerCase().includes('shield')) {
            iconSvg = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>';
          } else {
            // Default arrow
            iconSvg = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
          }

          const isNotLast = idx < stepsRes.data.length - 1;
          
          stepElement.innerHTML = `
            ${isNotLast ? '<div class="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30"></div>' : ''}
            <div class="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-primary/10 mb-6 relative">
              <div class="text-primary">${iconSvg}</div>
              <span class="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">${step.step_number}</span>
            </div>
            <h3 class="font-heading text-xl font-bold text-foreground">${step.title}</h3>
            <div class="mt-3 text-muted-foreground leading-relaxed">${step.description}</div>
          `;
          stepsContainer.appendChild(stepElement);
        });
      }
    }
  } catch (e) {
    console.warn('HowItWorks Sync: Cloud data nedostupná.');
  }
};

// Spustit ihned jakmile se sekce objeví v DOM pro bleskovou rychlost
const runInit = () => {
  if (document.getElementById('proces')) {
    syncHowItWorks();
    return;
  }
  const observer = new MutationObserver(() => {
    if (document.getElementById('proces')) {
      observer.disconnect();
      syncHowItWorks();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

runInit();
