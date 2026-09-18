import * as XLSX from 'xlsx';
import Registration from '../models/Registration.js';

const columns = [
  'Registration ID', 'Registered At', 'Registration Type', 'Team / Participant', 'Contact Name',
  'Contact Email', 'Contact Mobile', 'College', 'Department', 'Study Year', 'Team Members',
  'Food Preferences', 'Technical Events', 'Non-Technical Events', 'Amount Paid', 'Verified At', 'Verified By',
];

export async function buildVerifiedRegistrationsWorkbook() {
  const registrations = await Registration.find({ 'payment.status': 'VERIFIED', registrationStatus: 'confirmed' })
    .sort({ 'payment.verifiedAt': -1 })
    .lean();

  const rows = registrations.map((registration) => {
    const technicalEvents = registration.selectedEvents.filter((event) => event.category === 'Technical').map((event) => event.eventName).join(', ');
    const nonTechnicalEvents = registration.selectedEvents.filter((event) => event.category === 'Non-Technical').map((event) => event.eventName).join(', ');
    return [
      registration.registrationId,
      registration.createdAt ? new Date(registration.createdAt).toISOString() : '',
      registration.registrationType,
      registration.teamName,
      registration.teamLeader,
      registration.email,
      registration.phone,
      registration.college,
      registration.department,
      registration.year,
      registration.participants?.map((participant) => participant.name).join(', ') || registration.teamLeader,
      registration.foodPreferences?.map((item) => `${item.name}: ${item.preference}`).join('; ') || registration.foodPreference || '',
      technicalEvents,
      nonTechnicalEvents,
      registration.totalAmount,
      registration.payment?.verifiedAt ? new Date(registration.payment.verifiedAt).toISOString() : '',
      registration.payment?.verifiedBy || '',
    ];
  });

  const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
  worksheet['!cols'] = [
    { wch: 20 }, { wch: 24 }, { wch: 18 }, { wch: 26 }, { wch: 24 }, { wch: 30 }, { wch: 16 },
    { wch: 32 }, { wch: 22 }, { wch: 12 }, { wch: 42 }, { wch: 48 }, { wch: 36 }, { wch: 36 },
    { wch: 14 }, { wch: 24 }, { wch: 22 },
  ];
  worksheet['!autofilter'] = { ref: `A1:Q${Math.max(rows.length + 1, 1)}` };

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Verified registrations');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer', compression: true });
}
