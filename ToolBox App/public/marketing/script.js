// Sandbox WhatsApp number + join word — update JOIN_CODE once the real Twilio sandbox keyword is known.
const CONFIG = {
  WHATSAPP_NUMBER: '14155238886',
  JOIN_CODE: 'join <your-sandbox-code>'
};

const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const formError = document.getElementById('formError');
const thankYou = document.getElementById('thankYou');
const whatsappLink = document.getElementById('whatsappLink');

whatsappLink.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.JOIN_CODE)}`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.hidden = true;

  const data = new FormData(form);

  // Honeypot: bots tend to fill hidden fields. Pretend success, submit nothing.
  if (data.get('website')) {
    showThankYou();
    return;
  }

  const payload = {
    contact_name: data.get('contact_name'),
    role: data.get('role'),
    phone: data.get('phone'),
    address: data.get('address'),
    units: data.get('units'),
    has_management: data.get('has_management'),
    pain_points: data.getAll('pain_points'),
    notes: data.get('notes')
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'שולח...';

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('request_failed');
    showThankYou();
  } catch (err) {
    formError.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'שלחו לי פרטים על הפיילוט';
  }
});

function showThankYou() {
  form.hidden = true;
  thankYou.hidden = false;
  thankYou.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
