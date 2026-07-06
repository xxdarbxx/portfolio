const CONTACT_EMAIL = 'renzmaturino28@gmail.com';

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = document.getElementById('contact-submit');
  const statusEl = document.getElementById('contact-status');
  const submitBtnHTML = submitBtn.innerHTML;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (contactForm.querySelector('[name="_honey"]').value) return; // spam bot caught by honeypot

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    statusEl.textContent = '';
    statusEl.style.color = '';

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        statusEl.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        statusEl.style.color = 'var(--ok)';
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      statusEl.textContent = `Couldn't send right now — please email ${CONTACT_EMAIL} directly.`;
      statusEl.style.color = '#ff6b6b';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitBtnHTML;
    }
  });
}
