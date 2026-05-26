/**
 * TASK 10: CSV export poptávek
 * Použití v client komponentě: importuj exportInquiriesCSV a zavolej při kliknutí na tlačítko
 */
export function exportInquiriesCSV(inquiries: any[]) {
  const headers = [
    'ID',
    'Datum',
    'Jméno',
    'Email',
    'Telefon',
    'Služba',
    'Zpráva',
    'Plocha (m²)',
    'Odhad ceny',
    'Stav',
    'Zdroj',
    'Poznámky',
  ]

  const statusMap: Record<string, string> = {
    new: 'Nová',
    in_progress: 'V řešení',
    resolved: 'Vyřešeno',
  }

  const rows = inquiries.map((r) => [
    r.id,
    new Date(r.created_at).toLocaleDateString('cs-CZ'),
    r.name || '',
    r.email || '',
    r.phone || '',
    r.service || '',
    `"${(r.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    r.area != null ? String(r.area) : '',
    r.total_price_est || '',
    statusMap[r.status] || r.status,
    r.source || '',
    `"${(r.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
  ])

  const csvContent = [headers, ...rows].map((row) => row.join(';')).join('\r\n')

  // BOM pro správné zobrazení v Microsoft Excel
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8',
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `poptavky-nanofusion-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
