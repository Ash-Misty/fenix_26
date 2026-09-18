import React, { useState } from 'react';
import { Camera, Check, Drumstick, Leaf, MessageCircle, Minus, Plus, QrCode, Users } from 'lucide-react';
import { events } from '../../data';
import { Button } from '../ui/Button';
import { api, apiUpload } from '../../api';

const whatsappCommunityUrl = import.meta.env.VITE_WHATSAPP_COMMUNITY_URL || 'https://www.whatsapp.com/';
const REGISTRATION_FEES = Object.freeze({ Individual: 300, Team2: 550, Team3: 800 });

export function RegisterPage({ setPage, onRegistrationComplete }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('Individual');
  const [selected, setSelected] = useState([]);
  const [teamSize, setTeamSize] = useState(2);
  const [teamMembers, setTeamMembers] = useState([{ name: '', foodPreference: 'Vegetarian' }, { name: '', foodPreference: 'Vegetarian' }]);
  const [form, setForm] = useState({ college: '', department: '', year: '1', name: '', teamName: '', phone: '', email: '', foodPreference: 'Vegetarian', payment: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [draft, setDraft] = useState(null);
  const [done, setDone] = useState(false);

  const tech = selected.filter((slug) => events.find((event) => event.slug === slug)?.category === 'Technical').length;
  const nonTech = selected.filter((slug) => events.find((event) => event.slug === slug)?.category === 'Non-Technical').length;
  const fee = type === 'Individual' ? REGISTRATION_FEES.Individual : teamSize === 2 ? REGISTRATION_FEES.Team2 : REGISTRATION_FEES.Team3;
  const participants = type === 'Individual' ? [{ name: form.name, preference: form.foodPreference }] : teamMembers.map((member) => ({ name: member.name, preference: member.foodPreference }));
  const edit = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const setRegistrationType = (value) => { setType(value); setDraft(null); setErrors({}); };
  const updateTeamSize = (size) => {
    const nextSize = Math.min(3, Math.max(2, size));
    setTeamSize(nextSize);
    setTeamMembers((current) => nextSize > current.length ? [...current, ...Array.from({ length: nextSize - current.length }, () => ({ name: '', foodPreference: 'Vegetarian' }))] : current.slice(0, nextSize));
    setDraft(null);
  };
  const updateMember = (index, key, value) => { setTeamMembers((current) => current.map((member, memberIndex) => memberIndex === index ? { ...member, [key]: value } : member)); setDraft(null); };
  const toggle = (slug) => {
    if (selected.includes(slug)) return setSelected((current) => current.filter((value) => value !== slug));
    const event = events.find((item) => item.slug === slug);
    const categoryTotal = event.category === 'Technical' ? tech : nonTech;
    if (categoryTotal >= 2) return setErrors((current) => ({ ...current, selectionLimit: `You can select a maximum of 2 ${event.category} events.` }));
    setSelected((current) => [...current, slug]);
    setErrors((current) => ({ ...current, selectionLimit: '' }));
  };
  const validateDetails = () => {
    const nextErrors = {};
    if (!form.college.trim()) nextErrors.college = 'College name is required.';
    if (!form.department.trim()) nextErrors.department = 'Department is required.';
    if (type === 'Individual' && !form.name.trim()) nextErrors.name = 'Participant name is required.';
    if (type === 'Team') {
      if (!form.teamName.trim()) nextErrors.teamName = 'Team name is required.';
      teamMembers.forEach((member, index) => { if (!member.name.trim()) nextErrors[`member${index}`] = `Member ${index + 1} name is required.`; });
    }
    if (!/^\d{10}$/.test(form.phone)) nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors); return Object.keys(nextErrors).length === 0;
  };
  const validateEvents = () => {
    const nextErrors = {};
    if (!selected.length) nextErrors.events = 'Choose at least one event.';
    setErrors(nextErrors); return Object.keys(nextErrors).length === 0;
  };
  const buildPayload = () => ({
    teamName: type === 'Individual' ? form.name.trim() : form.teamName.trim(), teamLeader: type === 'Individual' ? form.name.trim() : teamMembers[0].name.trim(),
    email: form.email.trim(), phone: form.phone.trim(), college: form.college.trim(), department: form.department.trim(), year: Number(form.year), registrationType: type,
    selectedEvents: selected, workshops: [], foodPreference: form.foodPreference,
    participants: type === 'Team' ? teamMembers.map((member) => ({ name: member.name.trim(), foodPreference: member.foodPreference })) : [],
    foodPreferences: participants.map((participant) => ({ name: participant.name.trim(), preference: participant.preference })),
  });
  const generateQr = async () => {
    if (participants.some((participant) => !participant.preference)) return setErrors({ food: 'Choose food preference for every participant.' });
    setSubmitting(true); setErrors({});
    try { const response = await api('/registrations', { method: 'POST', body: JSON.stringify(buildPayload()) }); setDraft(response.data); }
    catch (error) { setErrors({ submit: error.message }); } finally { setSubmitting(false); }
  };
  const submitPayment = async () => {
    if (!form.payment) return setErrors({ payment: 'Upload your payment screenshot to continue.' });
    setSubmitting(true); setErrors({});
    try { const upload = new FormData(); upload.append('screenshot', form.payment); await apiUpload(`/registrations/${draft.registrationId}/payment-screenshot`, upload); setRegistrationId(draft.registrationId); setDone(true); onRegistrationComplete?.(); }
    catch (error) { setErrors({ submit: error.message }); } finally { setSubmitting(false); }
  };
  const foodOptions = (value, onChange, id) => <div className="radio-group food-options"><label className="radio-option food-option"><input type="radio" name={id} checked={value === 'Vegetarian'} onChange={() => onChange('Vegetarian')} /><span className="food-option-icon"><Leaf size={18} /></span><span className="food-option-copy"><strong>Vegetarian</strong></span><span className="radio-custom" /></label><label className="radio-option food-option"><input type="radio" name={id} checked={value === 'Non-vegetarian'} onChange={() => onChange('Non-vegetarian')} /><span className="food-option-icon"><Drumstick size={18} /></span><span className="food-option-copy"><strong>Non-vegetarian</strong></span><span className="radio-custom" /></label></div>;

  if (done) return <main className="confirmation"><div className="success-mark"><Check size={48} /></div><p className="eyebrow">PAYMENT SUBMITTED</p><h1>Registration<br /><span>under verification.</span></h1><p>We received your payment screenshot. Our team will verify it and contact you by email.</p><div className="confirmation-card"><span>Registration ID</span><strong>{registrationId}</strong><span>{type} · ₹{fee}</span></div><a className="whatsapp-community" href={whatsappCommunityUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Join our WhatsApp community for future updates</a><Button className="confirmation-home" onClick={() => setPage('home')}>Back to home</Button></main>;

  return <main className="register"><section className="register-intro"><button className="back" type="button" onClick={() => setPage('home')}>← Back to FENIX'26</button><p className="eyebrow">THE FIRST MOVE</p><h1>Secure your<br /><span>spot.</span></h1><p>Complete your details, select events, and submit payment for verification.</p><div className="steps"><div className={'step' + (step === 1 ? ' active' : '')}>01 Details</div><div className={'step' + (step === 2 ? ' active' : '')}>02 Events</div><div className={'step' + (step === 3 ? ' active' : '')}>03 Payment</div></div></section><section className="register-form" id="register-form">
    {step === 1 && <div className="form-card"><h2>Participant details</h2><label>College name</label><input value={form.college} onChange={(event) => edit('college', event.target.value)} placeholder="Your college name" />{errors.college && <span className="error">{errors.college}</span>}<label>Department</label><input value={form.department} onChange={(event) => edit('department', event.target.value)} placeholder="Your department" />{errors.department && <span className="error">{errors.department}</span>}<label>Year of study</label><select value={form.year} onChange={(event) => edit('year', event.target.value)}>{[1, 2, 3, 4, 5].map((year) => <option value={year} key={year}>Year {year}</option>)}</select><label>Participation type</label><div className="type-toggle"><button className={type === 'Individual' ? 'active' : ''} onClick={() => setRegistrationType('Individual')}><Users size={16} /> Individual</button><button className={type === 'Team' ? 'active' : ''} onClick={() => setRegistrationType('Team')}><Users size={16} /> Team</button></div>{type === 'Individual' ? <><label>Participant name</label><input value={form.name} onChange={(event) => edit('name', event.target.value)} placeholder="Your full name" />{errors.name && <span className="error">{errors.name}</span>}</> : <><label>Team size</label><div className="team-size-selector"><button type="button" disabled={teamSize === 2} onClick={() => updateTeamSize(teamSize - 1)}><Minus size={18} /></button><span className="team-size-value">{teamSize} members</span><button type="button" disabled={teamSize === 3} onClick={() => updateTeamSize(teamSize + 1)}><Plus size={18} /></button></div><label>Team name</label><input value={form.teamName} onChange={(event) => edit('teamName', event.target.value)} placeholder="Your team name" />{errors.teamName && <span className="error">{errors.teamName}</span>}<div className="team-members">{teamMembers.map((member, index) => <div key={index} className="member-input"><label>Member {index + 1} name</label><input value={member.name} onChange={(event) => updateMember(index, 'name', event.target.value)} placeholder={`Member ${index + 1} full name`} />{errors[`member${index}`] && <span className="error">{errors[`member${index}`]}</span>}</div>)}</div></>}<label>Contact mobile number</label><input value={form.phone} onChange={(event) => edit('phone', event.target.value)} placeholder="10-digit mobile number" />{errors.phone && <span className="error">{errors.phone}</span>}<label>Contact email address</label><input value={form.email} onChange={(event) => edit('email', event.target.value)} placeholder="you@college.edu" />{errors.email && <span className="error">{errors.email}</span>}<div className="form-actions"><Button secondary onClick={() => setPage('home')}>Back</Button><Button onClick={() => validateDetails() && setStep(2)}>Continue</Button></div></div>}
    {step === 2 && <div className="form-card"><h2>Pick your events</h2><p className="hint">Choose up to <strong>2 Technical and 2 Non-Technical</strong> events. Fees: Individual ₹300, 2-member team ₹550, 3-member team ₹800.</p><div className="event-summary"><span>Technical: {tech}/2</span><span>Non-Technical: {nonTech}/2</span><span className="fee-preview">Registration fee: ₹{fee}</span></div><div className="event-select-grid">{events.map((event) => { const selectedEvent = selected.includes(event.slug); const limitReached = event.category === 'Technical' ? tech >= 2 : nonTech >= 2; return <button className={`event-select event-color-${event.color} ${event.category === 'Technical' ? 'event-select-tech' : 'event-select-nontech'}${selectedEvent ? ' chosen' : ''}${limitReached && !selectedEvent ? ' is-limit-reached' : ''}`} key={event.slug} onClick={() => toggle(event.slug)} disabled={limitReached && !selectedEvent}><span className="badge">{event.category}</span><strong>{event.name}</strong><small>{event.icon}</small></button>; })}</div>{errors.events && <span className="error">{errors.events}</span>}{errors.selectionLimit && <span className="error">{errors.selectionLimit}</span>}<div className="form-actions"><Button secondary onClick={() => setStep(1)}>Back</Button><Button onClick={() => validateEvents() && setStep(3)}>Continue</Button></div></div>}
    {step === 3 && <div className="form-card"><h2>Food, payment &amp; confirm</h2><div className="fee-box"><span>{type} registration</span><strong>₹{draft?.totalAmount || fee}</strong><small>{selected.length} event{selected.length !== 1 ? 's' : ''}</small></div>{!draft && <><h3>Food preference for each participant</h3>{type === 'Individual' ? <div className="member-input"><label>{form.name || 'Participant'}</label>{foodOptions(form.foodPreference, (value) => edit('foodPreference', value), 'individual-food')}</div> : teamMembers.map((member, index) => <div className="member-input" key={index}><label>{member.name || `Member ${index + 1}`}</label>{foodOptions(member.foodPreference, (value) => updateMember(index, 'foodPreference', value), `member-food-${index}`)}</div>)}{errors.food && <span className="error">{errors.food}</span>}<div className="form-actions"><Button secondary onClick={() => setStep(2)}>Back</Button><Button onClick={generateQr} disabled={submitting}>{submitting ? 'Generating...' : 'Generate payment QR'}</Button></div></>}{draft && <><div className="qr-payment"><div className="qr-placeholder">{draft.payment?.qrCode ? <img src={draft.payment.qrCode} alt={`Payment QR for ₹${draft.totalAmount}`} /> : <QrCode size={64} />}<p>Scan QR to pay ₹{draft.totalAmount}</p><small>Upload the completed payment screenshot to submit your registration.</small></div><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => edit('payment', event.target.files[0] || '')} style={{ display: 'none' }} id="qr-upload" /><label htmlFor="qr-upload" className="btn secondary" style={{ marginTop: '12px', cursor: 'pointer' }}><Camera size={16} /> Upload payment screenshot <span aria-hidden="true">*</span></label>{form.payment && <p className="payment-success">✓ {form.payment.name} selected</p>}{errors.payment && <span className="error">{errors.payment}</span>}</div><div className="form-actions"><Button secondary onClick={() => { setDraft(null); setForm((current) => ({ ...current, payment: '' })); }}>Edit food preference</Button><Button onClick={submitPayment} disabled={submitting}>{submitting ? 'Submitting...' : <><Check size={16} /> Submit for verification</>}</Button></div></>}{errors.submit && <span className="error">{errors.submit}</span>}</div>}
  </section></main>;
}
