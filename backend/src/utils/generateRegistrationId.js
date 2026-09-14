let counter = 0;

export function generateRegistrationId() {
  const year = new Date().getFullYear();
  counter += 1;
  const padded = String(counter).padStart(6, '0');
  return `F26-${year}-${padded}`;
}
