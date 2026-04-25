struktiva v11 - Monetarisierung

1. STRIPE EINRICHTEN:
- Gehe zu stripe.com → Produkt anlegen
- Preis 1: 2,99€ monatlich → kopiere price_id
- Preis 2: 19,99€ jährlich → kopiere price_id
- In index.html ersetze startCheckout() mit echtem Stripe-Link

2. PAYWALL TRIGGER:
- Aktuell: nach 1 Medikament
- Nach 3 Tagen Nutzung
- Bei Klick auf "Familien-Modus"

3. TESTEN:
- Demo: Klick auf "Pro starten" → confirm → Pro wird freigeschaltet
- Echt: Stripe Checkout einbinden

Umsatz-Prognose:
100 Nutzer → 10% zahlen → 10 × 2,99€ = 29,90€/Monat
1.000 Nutzer → 299€/Monat
