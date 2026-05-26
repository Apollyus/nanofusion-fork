import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    // Supabase Database Webhook posílá: { type, table, record, old_record }
    const record = payload.record ?? payload

    const name = record.name || 'Neznámý'
    const email = record.email || '—'
    const phone = record.phone || '—'
    const service = record.service || '—'
    const message = record.message || '—'
    const source = record.source || 'Web'
    const createdAt = record.created_at
      ? new Date(record.created_at).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
      : new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })

    const resendKey = Deno.env.get('RESEND_API_KEY')
    const notifyEmail = Deno.env.get('NOTIFICATION_EMAIL') ?? 'info@nano-fusion.cz'

    if (!resendKey) {
      console.warn('RESEND_API_KEY není nastaven — email přeskočen')
      return new Response(JSON.stringify({ ok: false, reason: 'no key' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const html = `
<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; padding: 0; margin: 0;">
  <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 800;">🔔 Nová poptávka</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 0.9rem;">${createdAt} · ${source}</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; width: 120px;">Jméno</td>
          <td style="padding: 12px 0; color: #1e293b; font-weight: 700; font-size: 1rem;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Email</td>
          <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #F59E0B; font-weight: 700;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Telefon</td>
          <td style="padding: 12px 0;"><a href="tel:${phone}" style="color: #F59E0B; font-weight: 700;">${phone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Služba</td>
          <td style="padding: 12px 0; color: #1e293b; font-weight: 600;">${service}</td>
        </tr>
        ${message && message !== '—' ? `
        <tr>
          <td style="padding: 12px 0; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; vertical-align: top;">Zpráva</td>
          <td style="padding: 12px 0; color: #475569; line-height: 1.6;">${message}</td>
        </tr>` : ''}
      </table>
      <div style="margin-top: 28px; text-align: center;">
        <a href="https://nanofusion-admin.vercel.app/admin/inquiries"
           style="display: inline-block; background: #F59E0B; color: white; padding: 14px 32px; border-radius: 12px; font-weight: 800; text-decoration: none; font-size: 0.9rem;">
          Otevřít v admin panelu →
        </a>
      </div>
    </div>
    <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
      <p style="margin: 0; color: #94a3b8; font-size: 0.75rem;">NANOfusion s.r.o. · Automatická notifikace · Neodpovídejte na tento email</p>
    </div>
  </div>
</body>
</html>`

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NANOfusion Notifikace <noreply@nano-fusion.cz>',
        to: [notifyEmail],
        subject: `🔔 Nová poptávka: ${name} — ${service !== '—' ? service : source}`,
        html,
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      console.error('Resend error:', errText)
      return new Response(JSON.stringify({ ok: false, error: errText }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log(`✅ Email odeslán: Poptávka od ${name} (${email})`)
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    console.error('notify-inquiry error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
