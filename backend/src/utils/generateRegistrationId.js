let counter = 0;

export function generateRegistrationId() {
  const year = new Date().getFullYear();
  counter += 1;
  const padded = String(counter).padStart(6, '0');
  return `F26-${year}-${padded}`;
}

export async function initRegistrationIdCounter(RegistrationModel) {
  const count = await RegistrationModel.countDocuments();
  counter = count;
}
