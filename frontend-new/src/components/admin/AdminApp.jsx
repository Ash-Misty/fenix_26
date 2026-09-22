import React from 'react';
import { api } from '../../api';
import { AdminLayout } from './AdminLayout';
import { Check, LoaderCircle, LogIn, Plus, RefreshCw, X } from 'lucide-react';

const formatStatus = (value = '') => value.replaceAll('_', ' ').toLowerCase();
const money = (value = 0) => `₹${Number(value).toLocaleString('en-IN')}`;
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

async function downloadVerifiedRegistrations() {
  const response = await fetch(`${API_BASE}/admin/registrations/export.xlsx`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
  if (!response.ok) throw new Error('Could not create the verified registrations spreadsheet.');
  const file = await response.blob();
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fenix26-verified-registrations.xlsx';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function downloadConfirmedWorkshops() {
  const response = await fetch(`${API_BASE}/workshop-registrations/admin/export.xlsx`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
  if (!response.ok) throw new Error('Could not create the confirmed workshops spreadsheet.');
  const url = URL.createObjectURL(await response.blob());
  const link = document.createElement('a'); link.href = url; link.download = 'fenix26-confirmed-workshops.xlsx'; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

function Notice({ error }) {
  return error ? <p className="admin-error">{error}</p> : null;
}

function ScreenshotModal({ url, onClose }) {
  React.useEffect(() => {
    if (!url) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [url, onClose]);
  if (!url) return null;
  return <div className="admin-screenshot-backdrop" role="presentation" onMouseDown={onClose}><div className="admin-screenshot-modal" role="dialog" aria-modal="true" aria-label="Payment screenshot" onMouseDown={(event) => event.stopPropagation()}><button className="admin-modal-close" type="button" onClick={onClose} aria-label="Close screenshot"><X size={20} /></button><img src={url} alt="Uploaded payment screenshot" /></div></div>;
}

function useRequest(loader, dependencies = []) {
  const [state, setState] = React.useState({ loading: true, error: '', data: null });
  const run = React.useCallback(async () => {
    setState({ loading: true, error: '', data: null });
    try {
      setState({ loading: false, error: '', data: await loader() });
    } catch (error) {
      setState({ loading: false, error: error.message, data: null });
    }
  }, dependencies);
  React.useEffect(() => { run(); }, [run]);
  return { ...state, reload: run };
}

function Loading() {
  return <div className="admin-empty"><LoaderCircle className="admin-spin" size={24} /> Loading data...</div>;
}

function Login({ onLogin }) {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api('/admin/login', { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('adminToken', result.data.token);
      localStorage.setItem('adminName', result.data.admin.name);
      onLogin();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <p className="admin-kicker">FENIX'26 / CONTROL ROOM</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">Manage registrations, payments, events, and enquiries.</p>
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
        <Notice error={error} />
        <button className="admin-primary" disabled={loading}>{loading ? 'Signing in...' : <><LogIn size={16} /> Sign in</>}</button>
        <button className="admin-back-home" type="button" onClick={() => { window.location.hash = ''; }}>Back to home</button>
      </form>
    </main>
  );
}

function Dashboard() {
  const request = useRequest(() => api('/admin/dashboard/stats'));
  if (request.loading) return <Loading />;
  if (request.error) return <><Notice error={request.error} /><button className="admin-secondary" onClick={request.reload}><RefreshCw size={15} /> Retry</button></>;
  const { registrations, payments, events, workshops, recentRegistrations } = request.data.data;
  const cards = [
    ['Registrations', registrations.total],
    ['Pending payments', payments.pending],
    ['Verified payments', payments.totalVerified],
    ['Revenue', money(payments.totalRevenue)],
    ['Events', events],
    ['Workshops', workshops],
  ];
  return <>
    <div className="admin-page-heading"><div><p className="admin-kicker">OVERVIEW</p><h2>Dashboard</h2></div><button className="admin-icon-button" title="Refresh dashboard" onClick={request.reload}><RefreshCw size={17} /></button></div>
    <div className="admin-stat-grid">{cards.map(([label, value]) => <div className="admin-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    <section className="admin-panel"><div className="admin-panel-heading"><h3>Recent registrations</h3><span>{registrations.byStatus.pending} pending review</span></div><RegistrationTable registrations={recentRegistrations} compact /></section>
  </>;
}

function RegistrationTable({ registrations = [], compact = false, onAction, onPreview }) {
  if (!registrations.length) return <div className="admin-empty">No registrations found.</div>;
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>ID</th><th>Team / leader</th><th>College</th><th>Amount</th><th>Status</th>{!compact && <th>Payment</th>}{onAction && <th>Action</th>}</tr></thead><tbody>{registrations.map((registration) => <tr key={registration._id || registration.registrationId}><td><strong>{registration.registrationId}</strong><small>{new Date(registration.createdAt).toLocaleDateString()}</small></td><td>{registration.teamName}<small>{registration.teamLeader} · {registration.email}</small></td><td>{registration.college}</td><td>{money(registration.totalAmount)}</td><td><span className={`admin-badge ${formatStatus(registration.registrationStatus).replaceAll(' ', '-')}`}>{formatStatus(registration.registrationStatus)}</span></td>{!compact && <td><span className={`admin-badge ${formatStatus(registration.payment?.status).replaceAll(' ', '-')}`}>{formatStatus(registration.payment?.status)}</span>{registration.payment?.screenshotUrl && <button className="admin-link" type="button" onClick={() => onPreview(registration.payment.screenshotUrl)}>View screenshot</button>}</td>}{onAction && <td><button className="admin-secondary" onClick={() => onAction(registration)}>{registration.payment?.status === 'PENDING_VERIFICATION' ? 'Review' : 'View'}</button></td>}</tr>)}</tbody></table></div>;
}

function Registrations({ paymentsOnly = false }) {
  const endpoint = paymentsOnly ? '/admin/registrations?status=payment_submitted&limit=100' : '/admin/registrations?limit=100';
  const request = useRequest(() => api(endpoint), [endpoint]);
  const [selected, setSelected] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [actionError, setActionError] = React.useState('');
  const [exportError, setExportError] = React.useState('');
  if (request.loading) return <Loading />;
  if (request.error) return <><Notice error={request.error} /><button className="admin-secondary" onClick={request.reload}><RefreshCw size={15} /> Retry</button></>;
  const registrations = request.data.data.registrations;
  const review = async (registration, rejectionReason) => {
    setActionError('');
    try {
      await api(`/payments/${registration.registrationId}/${rejectionReason ? 'reject-payment' : 'verify-payment'}`, { method: 'PATCH', body: JSON.stringify(rejectionReason ? { rejectionReason } : {}) });
      setSelected(null);
      request.reload();
    } catch (error) { setActionError(error.message); }
  };
  return <>
    <div className="admin-page-heading"><div><p className="admin-kicker">{paymentsOnly ? 'FINANCE' : 'PEOPLE'}</p><h2>{paymentsOnly ? 'Payment verification' : 'Registrations'}</h2></div><div className="admin-heading-actions">{!paymentsOnly && <button className="admin-secondary" onClick={async () => { setExportError(''); try { await downloadVerifiedRegistrations(); } catch (error) { setExportError(error.message); } }}>Download verified .xlsx</button>}<button className="admin-icon-button" title="Refresh" onClick={request.reload}><RefreshCw size={17} /></button></div></div>
    <Notice error={exportError} />
    <section className="admin-panel"><RegistrationTable registrations={registrations} onAction={setSelected} onPreview={setPreviewUrl} /></section>
    {selected && <div className="admin-modal-backdrop"><div className="admin-modal"><button className="admin-modal-close" onClick={() => setSelected(null)}><X size={18} /></button><p className="admin-kicker">{selected.registrationId}</p><h3>{selected.teamName}</h3><p>{selected.teamLeader} · {selected.email} · {selected.phone}</p><p>{selected.college} · {selected.department} · Year {selected.year}</p><h4>Participants</h4><p>{selected.participants?.map((participant) => participant.name).join(', ') || selected.teamLeader}</p><h4>Food preferences</h4><p>{selected.foodPreferences?.map((item) => `${item.name}: ${item.preference}`).join(' · ') || selected.foodPreference}</p><h4>Selected events</h4><ul>{selected.selectedEvents?.map((event) => <li key={event.eventId}>{event.eventName}</li>)}</ul>{selected.payment?.screenshotUrl && <button className="admin-link" type="button" onClick={() => setPreviewUrl(selected.payment.screenshotUrl)}>View payment screenshot</button>}<Notice error={actionError} />{selected.payment?.status === 'PENDING_VERIFICATION' && <div className="admin-modal-actions"><button className="admin-primary" onClick={() => review(selected)}><Check size={15} /> Verify payment</button><button className="admin-danger" onClick={() => { const reason = window.prompt('Reason for rejection:', 'Payment could not be verified'); if (reason) review(selected, reason); }}>Reject</button></div>}</div></div>}
    <ScreenshotModal url={previewUrl} onClose={() => setPreviewUrl('')} />
  </>;
}

function Workshops() {
  const request = useRequest(() => api('/admin/workshops'));
  const [error, setError] = React.useState('');
  const toggle = async (workshop) => { setError(''); try { await api(`/admin/workshops/${workshop.slug}`, { method: 'PUT', body: JSON.stringify({ isActive: !workshop.isActive }) }); request.reload(); } catch (requestError) { setError(requestError.message); } };
  if (request.loading) return <Loading />;
  return <><div className="admin-page-heading"><div><p className="admin-kicker">PROGRAMME</p><h2>Workshops</h2></div><button className="admin-icon-button" title="Refresh" onClick={request.reload}><RefreshCw size={17} /></button></div><Notice error={request.error || error} /><section className="admin-panel"><div className="admin-list">{request.data?.data.workshops?.map((workshop) => <div className="admin-list-row" key={workshop.slug}><div><strong>{workshop.name}</strong><small>{workshop.slug} · {money(workshop.price)}</small></div><button className={workshop.isActive ? 'admin-secondary' : 'admin-danger'} onClick={() => toggle(workshop)}>{workshop.isActive ? 'Active' : 'Inactive'}</button></div>)}</div></section></>;
}

function WorkshopRegistrations() {
  const request = useRequest(() => api('/workshop-registrations/admin/list'));
  const [error, setError] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState('');
  const approve = async (registration) => { setError(''); try { await api(`/workshop-registrations/admin/${registration.registrationId}/approve`, { method: 'PATCH' }); request.reload(); } catch (requestError) { setError(requestError.message); } };
  if (request.loading) return <Loading />;
  if (request.error) return <><Notice error={request.error} /><button className="admin-secondary" onClick={request.reload}>Retry</button></>;
  const registrations = request.data.data.registrations || [];
  return <><div className="admin-page-heading"><div><p className="admin-kicker">WORKSHOP</p><h2>Workshop payment review</h2></div><div className="admin-heading-actions"><button className="admin-secondary" onClick={async () => { try { await downloadConfirmedWorkshops(); } catch (downloadError) { setError(downloadError.message); } }}>Download confirmed .xlsx</button><button className="admin-icon-button" onClick={request.reload}><RefreshCw size={17} /></button></div></div><Notice error={error} /><section className="admin-panel"><div className="admin-list">{registrations.length ? registrations.map((registration) => <div className="admin-list-row" key={registration.registrationId}><div><strong>{registration.name}</strong><small>{registration.registrationId} · {registration.email}</small><p>{registration.college} · Year {registration.year} · {registration.foodPreference} · ₹{registration.totalAmount}</p>{registration.payment?.screenshotUrl && <button className="admin-link" type="button" onClick={() => setPreviewUrl(registration.payment.screenshotUrl)}>View payment screenshot</button>}</div><div><span className={`admin-badge ${formatStatus(registration.registrationStatus).replaceAll(' ', '-')}`}>{formatStatus(registration.registrationStatus)}</span>{registration.payment?.status === 'PENDING_VERIFICATION' && <button className="admin-primary" onClick={() => approve(registration)}><Check size={15} /> Approve</button>}</div></div>) : <div className="admin-empty">No workshop registrations found.</div>}</div></section><ScreenshotModal url={previewUrl} onClose={() => setPreviewUrl('')} /></>;
}

function Enquiries() {
  const request = useRequest(() => api('/admin/contacts?limit=100'));
  const update = async (contact, status) => { await api(`/admin/contacts/${contact._id}`, { method: 'PATCH', body: JSON.stringify({ status }) }); request.reload(); };
  if (request.loading) return <Loading />;
  if (request.error) return <Notice error={request.error} />;
  return <><div className="admin-page-heading"><div><p className="admin-kicker">INBOX</p><h2>Enquiries</h2></div><button className="admin-icon-button" title="Refresh" onClick={request.reload}><RefreshCw size={17} /></button></div><section className="admin-panel"><div className="admin-list">{request.data.data.contacts?.map((contact) => <div className="admin-list-row admin-enquiry" key={contact._id}><div><strong>{contact.subject}</strong><small>{contact.name} · {contact.email}</small><p>{contact.message}</p></div><select value={contact.status} onChange={(event) => update(contact, event.target.value)}><option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option></select></div>)}</div></section></>;
}

function Announcements() {
  const request = useRequest(() => api('/announcements'));
  const [form, setForm] = React.useState({ title: '', content: '' });
  const [error, setError] = React.useState('');
  const create = async (event) => { event.preventDefault(); setError(''); try { await api('/announcements', { method: 'POST', body: JSON.stringify(form) }); setForm({ title: '', content: '' }); request.reload(); } catch (requestError) { setError(requestError.message); } };
  if (request.loading) return <Loading />;
  return <><div className="admin-page-heading"><div><p className="admin-kicker">BROADCAST</p><h2>Announcements</h2></div><button className="admin-icon-button" title="Refresh" onClick={request.reload}><RefreshCw size={17} /></button></div><form className="admin-panel admin-form-row" onSubmit={create}><input placeholder="Announcement title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /><input placeholder="Message" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} required minLength="10" /><button className="admin-primary"><Plus size={15} /> Publish</button><Notice error={error} /></form><section className="admin-panel"><div className="admin-list">{request.data.data.announcements?.map((announcement) => <div className="admin-list-row" key={announcement._id}><div><strong>{announcement.title}</strong><small>{new Date(announcement.createdAt).toLocaleString()} · {announcement.author}</small><p>{announcement.content}</p></div><span className="admin-badge">Published</span></div>)}</div></section></>;
}

export function AdminApp() {
  const [path, setPath] = React.useState(window.location.hash.replace(/^#/, '') || '/admin');
  React.useEffect(() => { const sync = () => setPath(window.location.hash.replace(/^#/, '') || '/admin'); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  const loggedIn = Boolean(localStorage.getItem('adminToken'));
  if (path === '/admin/login' || !loggedIn) return <Login onLogin={() => { window.location.hash = '#/admin'; }} />;
  let content = <Dashboard />;
  if (path === '/admin/registrations') content = <Registrations />;
  if (path === '/admin/payments') content = <Registrations paymentsOnly />;
  if (path === '/admin/workshops') content = <Workshops />;
  if (path === '/admin/workshop-registrations') content = <WorkshopRegistrations />;
  if (path === '/admin/enquiries') content = <Enquiries />;
  if (path === '/admin/announcements') content = <Announcements />;
  return <AdminLayout>{content}</AdminLayout>;
}
