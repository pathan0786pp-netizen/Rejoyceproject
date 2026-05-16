# Rejoyce React Website

Complete React website for Rejoyce, a home-visit doctor and medical services brand.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Update Rejoyce Details

- WhatsApp number: edit `WHATSAPP_NUMBER` in `src/main.jsx`.
- Call number: edit `PHONE_NUMBER` in `src/main.jsx`.
- Address and map: update the `Location` component in `src/main.jsx`.
- Doctors, services, machineries, partners, and gallery: edit the arrays near the top of `src/main.jsx`.
- Brand colors: edit CSS variables in `src/styles.css`.

## WhatsApp Booking

The booking form builds a pre-filled WhatsApp message with:

- Full name
- Age
- Phone number
- Address
- Preferred doctor selected by the user
- Doctor type
- Symptoms/message

On submission, the user sees a confirmation message and WhatsApp opens with the appointment details. The message goes to the admin WhatsApp number configured in `WHATSAPP_NUMBER`; the admin can then allot or confirm the doctor.
