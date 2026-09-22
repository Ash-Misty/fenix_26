import * as XLSX from 'xlsx';
import WorkshopRegistration from '../models/WorkshopRegistration.js';

export async function buildVerifiedWorkshopRegistrationsWorkbook() {
  const registrations = await WorkshopRegistration.find({ registrationStatus: 'confirmed', 'payment.status': 'VERIFIED' }).sort({ 'payment.verifiedAt': -1 }).lean();
  const columns = ['Registration ID', 'Name', 'Email', 'College', 'Study Year', 'Food Preference', 'Workshop', 'Amount', 'Verified At', 'Verified By'];
  const rows = registrations.map((item) => [item.registrationId, item.name, item.email, item.college, item.year, item.foodPreference, item.workshopName, item.totalAmount, item.payment?.verifiedAt?.toISOString?.() || '', item.payment?.verifiedBy || '']);
  const sheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
  sheet['!cols'] = [{ wch: 18 }, { wch: 28 }, { wch: 32 }, { wch: 36 }, { wch: 13 }, { wch: 20 }, { wch: 38 }, { wch: 12 }, { wch: 24 }, { wch: 24 }];
  sheet['!autofilter'] = { ref: `A1:J${Math.max(rows.length + 1, 1)}` };
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Confirmed workshops');
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer', compression: true });
}
