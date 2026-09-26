import React, { useState } from 'react';
import { Camera, Check, ChevronLeft, Drumstick, Leaf, MessageCircle, QrCode } from 'lucide-react';
import { Button } from '../ui/Button';
import { api, apiUpload } from '../../api';

const whatsappCommunityUrl = 'https://chat.whatsapp.com/JU1BstVyeyO9UwWXlFrdfx';

export function WorkshopRegisterPage({ setPage }) {
  const [form, setForm] = useState({ name: '', college: '', email: '', year: '1', food: 'Vegetarian', screenshot: '' });
  const [step, setStep] = useState('details');
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  const [paymentUploadToken, setPaymentUploadToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const edit = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setErrors({}); };

  const openPayment = async () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Enter your name.';
    if (!form.college.trim()) nextErrors.college = 'Enter your college name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitting(true);
    try {
      const response = await api('/workshop-registrations/payment-quote', { method: 'POST', body: JSON.stringify({ name: form.name.trim(), college: form.college.trim(), email: form.email.trim(), year: Number(form.year), foodPreference: form.food }) });
      setDraft(response.data); setStep('payment');
    } catch (error) { setErrors({ submit: error.message }); } finally { setSubmitting(false); }
  };

  const submitScreenshot = async () => {
    if (!form.screenshot) return setErrors({ screenshot: 'Upload the payment screenshot before submitting.' });
    setSubmitting(true); setErrors({});
    try {
      let token = paymentUploadToken;
      if (!token) { const body = new FormData(); body.append('screenshot', form.screenshot); const uploaded = await apiUpload('/workshop-registrations/payment-screenshot', body); token = uploaded.data.paymentUploadToken; setPaymentUploadToken(token); }
      await api('/workshop-registrations', { method: 'POST', body: JSON.stringify({ name: form.name.trim(), college: form.college.trim(), email: form.email.trim(), year: Number(form.year), foodPreference: form.food, paymentUploadToken: token }) });
      setStep('done');
    }
    catch (error) { setErrors({ submit: error.message }); } finally { setSubmitting(false); }
  };

  if (step === 'done') return <main className="workshop-registration-page"><section className="workshop-confirmation"><div className="workshop-confirm-icon"><Check size={30} /></div><p className="eyebrow">WORKSHOP REGISTRATION</p><h1>Payment details<br /><span>submitted.</span></h1><p>Your registration is under review.</p><div className="workshop-confirm-id"><span>Workshop fee</span><strong>₹250</strong><small>Data Science with AI Technology</small></div><div className="confirmation-next-steps"><p>Check your inbox and spam folder for the verification email.</p><a className="whatsapp-community" href={whatsappCommunityUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Join the WhatsApp community</a></div><Button className="confirmation-home" onClick={() => setPage('home')}>Back to home</Button></section></main>;

  return <main className="workshop-registration-page"><section className="workshop-registration-shell"><button className="workshop-back" type="button" onClick={() => setPage('home')}><ChevronLeft size={16} /> Back to FENIX&apos;26</button><div className="workshop-registration-intro"><p className="eyebrow">FEATURED HANDS-ON WORKSHOP</p><h1>Data Science with<br /><span>AI Technology.</span></h1><p>Reserve your individual workshop seat and complete the ₹250 GPay payment.</p><div className="workshop-registration-meta"><span>Individual registration</span><b>₹250</b><span>Food included</span></div></div><section className="workshop-form-card"><div className="workshop-form-progress"><span className={step === 'details' ? 'active' : ''}>01 <b>Your details</b></span><i /><span className={step === 'payment' ? 'active' : ''}>02 <b>Payment</b></span></div>{step === 'details' ? <div className="workshop-form-fields"><h2>Reserve your seat</h2><p>Enter your details to generate the ₹250 GPay QR.</p><label>Full name<input value={form.name} onChange={(event) => edit('name', event.target.value)} placeholder="Your full name" /></label>{errors.name && <small className="error">{errors.name}</small>}<label>College name<input value={form.college} onChange={(event) => edit('college', event.target.value)} placeholder="Your college name" /></label>{errors.college && <small className="error">{errors.college}</small>}<div className="workshop-field-pair"><label>Email address<input type="email" value={form.email} onChange={(event) => edit('email', event.target.value)} placeholder="you@college.edu" /></label><label>Year of study<select value={form.year} onChange={(event) => edit('year', event.target.value)}>{[1, 2, 3, 4].map((year) => <option value={year} key={year}>Year {year}</option>)}</select></label></div>{errors.email && <small className="error">{errors.email}</small>}<fieldset><legend>Food preference</legend><div className="workshop-food-options"><label className={form.food === 'Vegetarian' ? 'selected' : ''}><input type="radio" name="workshop-food" checked={form.food === 'Vegetarian'} onChange={() => edit('food', 'Vegetarian')} /><Leaf size={18} /><span><b>Vegetarian</b><small>Veg meal</small></span></label><label className={form.food === 'Non-vegetarian' ? 'selected' : ''}><input type="radio" name="workshop-food" checked={form.food === 'Non-vegetarian'} onChange={() => edit('food', 'Non-vegetarian')} /><Drumstick size={18} /><span><b>Non-vegetarian</b><small>Non-veg meal</small></span></label></div></fieldset><Button onClick={openPayment} disabled={submitting}>{submitting ? 'Generating QR...' : 'Generate GPay QR · ₹250'}</Button>{errors.submit && <small className="error">{errors.submit}</small>}</div> : <div className="workshop-payment-step"><h2>Complete your payment</h2><p>Scan the GPay QR and upload the payment screenshot.</p><div className="workshop-payment-layout"><div className="gpay-qr-card"><div className="gpay-mark"><span>G</span> Pay</div><div className="gpay-qr">{draft?.payment?.qrCode ? <img src={draft.payment.qrCode} alt="GPay QR for ₹250 workshop fee" /> : <QrCode size={150} strokeWidth={1.8} />}</div><strong>₹250</strong><small>Workshop registration fee</small></div><div className="workshop-upload-copy"><p className="workshop-payment-note">After payment, upload the screenshot for admin verification.</p><input id="workshop-screenshot" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => edit('screenshot', event.target.files?.[0] || '')} /><label className="workshop-upload" htmlFor="workshop-screenshot"><Camera size={19} /><span>{form.screenshot ? form.screenshot.name : 'Upload payment screenshot'}</span><small>PNG, JPG or WEBP · max 10MB</small></label>{errors.screenshot && <small className="error">{errors.screenshot}</small>}</div></div><div className="workshop-payment-actions"><Button secondary onClick={() => setStep('details')}>Edit details</Button><Button onClick={submitScreenshot} disabled={submitting}>{submitting ? 'Submitting...' : <>Submit for verification <Check size={15} /></>}</Button></div>{errors.submit && <small className="error">{errors.submit}</small>}</div>}</section></section></main>;
}
