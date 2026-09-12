import React, { useState } from 'react';
import { Check, ArrowRight, QrCode, Camera, Users, Plus, Minus } from 'lucide-react';
import { events } from '../../data';
import { Button } from '../ui/Button';

function RegistrationNewsTicker({ setPage }) {
  const goToRegistration = (clickEvent) => {
    clickEvent.preventDefault();
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToAbout = (clickEvent) => {
    clickEvent.preventDefault();
    setPage('home');
    window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 30);
  };

  const tickerContent = (
    <>
      <span>FENIX'26 registrations are open</span>
      <span className="ticker-separator">•</span>
      <span>About this event: one day of technical and creative challenges</span>
      <a href="#register-form" onClick={goToRegistration}>Register now <ArrowRight size={12} /></a>
      <a href="#about" onClick={goToAbout}>About this event</a>
    </>
  );

  return (
    <div className="news-ticker" aria-label="Registration updates">
      <div className="news-ticker-track">
        <div className="news-ticker-group">{tickerContent}</div>
        <div className="news-ticker-group" aria-hidden="true">{tickerContent}</div>
      </div>
    </div>
  );
}

export function RegisterPage({ setPage, onRegistrationComplete }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('Individual');
  const [selected, setSelected] = useState([]);
  const [teamSize, setTeamSize] = useState(2);
  const [teamMembers, setTeamMembers] = useState([{ name: '' }, { name: '' }]);
  const [form, setForm] = useState({ college: '', name: '', phone: '', email: '', food: 'Vegetarian', payment: 'QR' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const tech = selected.filter((s) => events.find((e) => e.slug === s)?.category === 'Technical').length;
  const non = selected.filter((s) => events.find((e) => e.slug === s)?.category === 'Non-Technical').length;
  
  const fee = type === 'Individual' 
    ? (tech > 2 || non > 2 ? 300 : 250)
    : (tech > 2 || non > 2 ? 500 : 450);

  const edit = (k, v) => setForm({ ...form, [k]: v });
  const toggle = (slug) =>
    setSelected(selected.includes(slug) ? selected.filter((x) => x !== slug) : [...selected, slug]);

  const updateTeamSize = (size) => {
    const newSize = Math.max(2, Math.min(5, size));
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
      if (!form.payment) e.payment = 'Payment method is required.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 3) {
      setStep(step + 1);
    } else {
      setDone(true);
      onRegistrationComplete?.();
    }
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
          <strong>F26-{Math.random().toString(36).slice(2, 8).toUpperCase()}</strong>
          <span>{type} · {selected.length} event{selected.length !== 1 ? 's' : ''} · ₹{fee}</span>
        </div>
        <Button onClick={() => setPage('home')}>Back to home</Button>
      </main>
    );
  }

  return (
    <main className="register">
      <RegistrationNewsTicker setPage={setPage} />
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
                  <button onClick={() => updateTeamSize(teamSize - 1)} aria-label="Decrease team size"><Minus size={18} /></button>
                  <span className="team-size-value">{teamSize}</span>
                  <button onClick={() => updateTeamSize(teamSize + 1)} aria-label="Increase team size"><Plus size={18} /></button>
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
            <Button onClick={next}>Continue <ArrowRight size={16} /></Button>
          </div>
        )}

        {step === 2 && (
          <div className="form-card">
            <h2>Pick your events</h2>
            <p className="hint">Choose at least one event. <strong>Individual:</strong> ₹250 (≤2 tech + ≤2 non-tech) or ₹300 (more). <strong>Team:</strong> ₹450 (≤2 tech + ≤2 non-tech) or ₹500 (more).</p>
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
              <Button onClick={next}>Continue <ArrowRight size={16} /></Button>
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
            <div className="radio-group">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="food" 
                  value="Vegetarian" 
                  checked={form.food === 'Vegetarian'} 
                  onChange={(e) => edit('food', e.target.value)} 
                />
                <span className="radio-custom"></span>
                <span className="radio-label">Vegetarian</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="food" 
                  value="Non-vegetarian" 
                  checked={form.food === 'Non-vegetarian'} 
                  onChange={(e) => edit('food', e.target.value)} 
                />
                <span className="radio-custom"></span>
                <span className="radio-label">Non-vegetarian</span>
              </label>
            </div>
            {errors.food && <span className="error">{errors.food}</span>}
            
            <label>Payment method</label>
            <div className="qr-payment">
              <div className="qr-placeholder">
                <QrCode size={64} />
                <p>Scan QR to pay ₹{fee}</p>
                <small>UPI ID: fenix26@upi / Scan the QR code above</small>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => edit('payment', e.target.files[0] ? 'QR' : '')} 
                style={{display: 'none'}} 
                id="qr-upload"
                ref={(el) => { if (el) el.required = true; }}
              />
              <label htmlFor="qr-upload" className="btn secondary" style={{marginTop: '12px', cursor: 'pointer'}}>
                <Camera size={16} style={{marginRight: 8}} /> Upload payment screenshot
              </label>
              {form.payment && <p className="payment-success">✓ Payment screenshot uploaded</p>}
              {errors.payment && <span className="error">{errors.payment}</span>}
            </div>
            
            <div className="form-actions">
              <Button secondary onClick={() => setStep(2)}>Back</Button>
              <Button onClick={next}><Check size={16} /> Complete registration</Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
