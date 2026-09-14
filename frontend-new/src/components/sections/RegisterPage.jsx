import React, { useState } from 'react';
import { Check, QrCode, Camera, Users, Plus, Minus, Leaf, Drumstick, MessageCircle } from 'lucide-react';
import { events } from '../../data';
import { Button } from '../ui/Button';
import { api, apiUpload } from '../../api';

export function RegisterPage({ setPage, onRegistrationComplete }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('Individual');
  const [selected, setSelected] = useState([]);
  const [teamSize, setTeamSize] = useState(2);
  const [teamMembers, setTeamMembers] = useState([{ name: '' }, { name: '' }]);
  const [form, setForm] = useState({ college: '', department: '', year: '1', name: '', phone: '', email: '', food: 'Vegetarian', payment: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [draft, setDraft] = useState(null);

  const tech = selected.filter((s) => events.find((e) => e.slug === s)?.category === 'Technical').length;
  const non = selected.filter((s) => events.find((e) => e.slug === s)?.category === 'Non-Technical').length;
  
  const fee = type === 'Individual' 
    ? (tech > 2 || non > 2 ? 300 : 250)
    : teamSize === 2
      ? (tech > 2 || non > 2 ? 500 : 450)
      : (tech > 2 || non > 2 ? 800 : 750);

  const edit = (k, v) => setForm({ ...form, [k]: v });
  const toggle = (slug) =>
    setSelected(selected.includes(slug) ? selected.filter((x) => x !== slug) : [...selected, slug]);

  const updateTeamSize = (size) => {
    const newSize = Math.max(2, Math.min(3, size));
    setTeamSize(newSize);
    setTeamMembers(prev => {
      if (newSize > prev.length) {
        return [...prev, ...Array(newSize - prev.length).fill({ name: '' })];
      }
      return prev.slice(0, newSize);
    });
  };

  const updateTeamMember = (index, name) => {
    setTeamMembers(prev => prev.map((m, i) => i === index ? { name } : m));
  };

  const validate = () => {
    let e = {};
    if (step === 1) {
      if (!form.college) e.college = 'College name is required.';
      if (!form.department) e.department = 'Department is required.';
      if (type === 'Individual') {
        if (!form.name) e.name = 'Participant name is required.';
      } else {
        if (!form.name) e.name = 'Team name is required.';
        teamMembers.forEach((member, index) => {
          if (!member.name) e[`member${index}`] = `Member ${index + 1} name is required.`;
        });
      }
      if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit Indian phone number.';
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.';
    }
    if (step === 2 && !selected.length) e.events = 'Choose at least one event.';
    if (step === 3) {
      if (!form.food) e.food = 'Choose a food preference.';
      if (!form.payment) e.payment = 'Upload your payment screenshot to continue.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const buildPayload = () => ({
    teamName: form.name,
    teamLeader: form.name,
    email: form.email,
    phone: form.phone,
    college: form.college,
    department: form.department,
    year: Number(form.year),
    registrationType: type,
    selectedEvents: selected,
    workshops: [],
    foodPreference: form.food,
    participants: type === 'Team' ? teamMembers.map((member) => ({
      name: member.name,
      email: form.email,
      phone: form.phone,
      year: Number(form.year),
    })) : [],
  });

  const next = async () => {
    if (!validate()) return;
    if (step < 3) {
      if (step === 2) {
        setSubmitting(true);
        setErrors({});
        try {
          const result = await api('/registrations', { method: 'POST', body: JSON.stringify(buildPayload()) });
          setDraft(result.data);
          setStep(3);
        } catch (error) {
          setErrors(error.message === 'Registration already exists for this email' ? {} : { submit: error.message });
        } finally {
          setSubmitting(false);
        }
      } else {
        setStep(step + 1);
      }
    } else {
      setSubmitting(true);
      setErrors({});
      try {
        const upload = new FormData();
        upload.append('screenshot', form.payment);
        await apiUpload(`/registrations/${draft.registrationId}/payment-screenshot`, upload);
        setRegistrationId(draft.registrationId);
        setDone(true);
        onRegistrationComplete?.();
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const returnHome = () => {
    setDone(false);
    setPage('home');
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  };

  if (done) {
    return (
      <main className="confirmation">
        <div className="success-mark"><Check size={48} /></div>
        <p className="eyebrow">YOU'RE IN</p>
        <h1>Registration<br /><span>successful.</span></h1>
        <p>You're officially part of FENIX'26. See you on October 07.</p>
        <div className="confirmation-card">
          <span>Registration ID</span>
          <strong>{registrationId}</strong>
          <span>{type} · {selected.length} event{selected.length !== 1 ? 's' : ''} · ₹{fee}</span>
        </div>
        <Button className="confirmation-home" onClick={returnHome}>Back to home</Button>
      </main>
    );
  }

  return (
    <main className="register">
      <section className="register-intro">
        <button className="back" type="button" onClick={() => setPage('home')}>← Back to FENIX'26</button>
        <p className="eyebrow">THE FIRST MOVE</p>
        <h1>Secure your<br /><span>spot.</span></h1>
        <p>Complete the three-step form. Pay once. Shine all day.</p>
        <div className="steps">
          <div className={'step' + (step === 1 ? ' active' : '')}>01 Details</div>
          <div className={'step' + (step === 2 ? ' active' : '')}>02 Events</div>
          <div className={'step' + (step === 3 ? ' active' : '')}>03 Payment</div>
        </div>
      </section>

      <section className="register-form" id="register-form">
        {step === 1 && (
          <div className="form-card">
            <h2>Your details</h2>
            <label>Registration type</label>
            <div className="type-toggle">
              <button className={type === 'Individual' ? 'active' : ''} onClick={() => setType('Individual')}>
                <Users size={16} style={{marginRight: 8, verticalAlign: 'middle'}} /> Individual
              </button>
              <button className={type === 'Team' ? 'active' : ''} onClick={() => setType('Team')}>
                <Users size={16} style={{marginRight: 8, verticalAlign: 'middle'}} /> Team
              </button>
            </div>
            <label>College name</label>
            <input value={form.college} onChange={(e) => edit('college', e.target.value)} placeholder="Your college name" />
            {errors.college && <span className="error">{errors.college}</span>}
            <label>Department</label>
            <input value={form.department} onChange={(e) => edit('department', e.target.value)} placeholder="Your department" />
            {errors.department && <span className="error">{errors.department}</span>}
            <label>Year of study</label>
            <select value={form.year} onChange={(e) => edit('year', e.target.value)}>
              {[1, 2, 3, 4, 5].map((year) => <option value={year} key={year}>Year {year}</option>)}
            </select>
            
            {type === 'Individual' ? (
              <>
                <label>Participant name</label>
                <input value={form.name} onChange={(e) => edit('name', e.target.value)} placeholder="Your full name" />
                {errors.name && <span className="error">{errors.name}</span>}
              </>
            ) : (
              <>
                <label>Team name</label>
                <input value={form.name} onChange={(e) => edit('name', e.target.value)} placeholder="Your team name" />
                {errors.name && <span className="error">{errors.name}</span>}
                
                <label>Team size</label>
                <div className="team-size-selector">
                  <button disabled={teamSize <= 2} onClick={() => updateTeamSize(teamSize - 1)} aria-label="Decrease team size"><Minus size={18} /></button>
                  <span className="team-size-value">{teamSize}</span>
                  <button disabled={teamSize >= 3} onClick={() => updateTeamSize(teamSize + 1)} aria-label="Increase team size"><Plus size={18} /></button>
                </div>
                
                <div className="team-members">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="member-input">
                      <label>Member {index + 1} name</label>
                      <input 
                        value={member.name} 
                        onChange={(e) => updateTeamMember(index, e.target.value)} 
                        placeholder={`Member ${index + 1} full name`} 
                      />
                      {errors[`member${index}`] && <span className="error">{errors[`member${index}`]}</span>}
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <label>Phone number</label>
            <input value={form.phone} onChange={(e) => edit('phone', e.target.value)} placeholder="10-digit Indian phone" />
            {errors.phone && <span className="error">{errors.phone}</span>}
            <label>Email address</label>
            <input value={form.email} onChange={(e) => edit('email', e.target.value)} placeholder="you@college.edu" />
            {errors.email && <span className="error">{errors.email}</span>}
            <div className="form-actions">
              <Button secondary onClick={() => setPage('home')}>Back</Button>
              <Button onClick={next}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-card">
            <h2>Pick your events</h2>
            <p className="hint">Choose at least one event. <strong>Individual:</strong> ₹250 (≤2 tech + ≤2 non-tech) or ₹300 (more). <strong>Team (2):</strong> ₹450 (≤2 tech + ≤2 non-tech) or ₹500 (more). <strong>Team (3):</strong> ₹750 (≤2 tech + ≤2 non-tech) or ₹800 (more).</p>
            <div className="event-summary">
              <span>Technical: {tech}/2+</span>
              <span>Non-Technical: {non}/2+</span>
              <span className="fee-preview">Estimated: ₹{fee}</span>
            </div>
            <div className="event-select-grid">
              {events.map((e) => (
                <button
                  className={'event-select' + (selected.includes(e.slug) ? ' chosen' : '')}
                  key={e.slug}
                  onClick={() => toggle(e.slug)}
                >
                  <span className="badge">{e.category}</span>
                  <strong>{e.name}</strong>
                  <small>{e.icon}</small>
                </button>
              ))}
            </div>
            {errors.events && <span className="error">{errors.events}</span>}
            <div className="form-actions">
              <Button secondary onClick={() => setStep(1)}>Back</Button>
              <Button onClick={next}>Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-card">
            <h2>Payment & confirm</h2>
            <div className="fee-box">
              <span>{type} registration</span>
              <strong>₹{fee}</strong>
              <small>{selected.length} event{selected.length !== 1 ? 's' : ''}</small>
            </div>
            
            <label>Food preference</label>
            <div className="radio-group food-options">
              <label className="radio-option food-option">
                <input 
                  type="radio" 
                  name="food" 
                  value="Vegetarian" 
                  checked={form.food === 'Vegetarian'} 
                  onChange={(e) => edit('food', e.target.value)} 
                />
                <span className="food-option-icon" aria-hidden="true"><Leaf size={20} /></span>
                <span className="food-option-copy">
                  <strong>Vegetarian</strong>
                  <small>Plant-based meal</small>
                </span>
                <span className="radio-custom" aria-hidden="true"></span>
              </label>
              <label className="radio-option food-option">
                <input 
                  type="radio" 
                  name="food" 
                  value="Non-vegetarian" 
                  checked={form.food === 'Non-vegetarian'} 
                  onChange={(e) => edit('food', e.target.value)} 
                />
                <span className="food-option-icon" aria-hidden="true"><Drumstick size={20} /></span>
                <span className="food-option-copy">
                  <strong>Non-vegetarian</strong>
                  <small>Includes meat</small>
                </span>
                <span className="radio-custom" aria-hidden="true"></span>
              </label>
            </div>
            {errors.food && <span className="error">{errors.food}</span>}
            
            <label>Payment method</label>
            <div className="qr-payment">
              <div className="qr-placeholder">
                {draft?.payment?.qrCode ? <img src={draft.payment.qrCode} alt={`Payment QR for ${draft.totalAmount || fee}`} /> : <QrCode size={64} />}
                <p>Scan QR to pay ₹{draft?.totalAmount || fee}</p>
                <small>Complete payment, then upload the screenshot above</small>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => edit('payment', e.target.files[0] || '')} 
                style={{display: 'none'}} 
                id="qr-upload"
                required
              />
              <label htmlFor="qr-upload" className="btn secondary" style={{marginTop: '12px', cursor: 'pointer'}}>
                <Camera size={16} style={{marginRight: 8}} /> Upload payment screenshot <span aria-hidden="true">*</span>
              </label>
              {form.payment && <p className="payment-success">✓ {form.payment.name} selected</p>}
              {errors.payment && <span className="error">{errors.payment}</span>}
            </div>
            <a className="whatsapp-community" href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> Join our WhatsApp community — get notified
            </a>

            <div className="form-actions">
              <Button secondary onClick={() => setStep(2)}>Back</Button>
              {errors.submit && <span className="error">{errors.submit}</span>}
              <Button onClick={next} disabled={submitting}>{submitting ? 'Submitting...' : <><Check size={16} /> Complete registration</>}</Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
