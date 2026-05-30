/**
 * Build a Google Calendar event-creation URL with the SRM ECO TECH details pre-filled.
 * Opens the user's calendar so they can pick a time and confirm.
 *
 * Docs: https://support.google.com/calendar/answer/41207
 */
export function googleCalendarUrl({
  title = 'Intro call · SRM ECO TECH',
  details = "Initial discovery call with the SRM ECO TECH team.\n\nWe'll spend 30 minutes understanding your context — software, data or GPS — and outline how we can help.",
  guests = ['info@srmecotech.com'],
  location = 'Google Meet (link to be added)',
  startISO,            // optional ISO start
  durationMinutes = 30,
} = {}) {
  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', title);
  params.set('details', details);
  params.set('location', location);
  if (guests?.length) params.set('add', guests.join(','));

  if (startISO) {
    const start = new Date(startISO);
    const end = new Date(start.getTime() + durationMinutes * 60_000);
    params.set('dates', `${fmt(start)}/${fmt(end)}`);
  }

  return `https://calendar.google.com/calendar/u/0/r/eventedit?${params.toString()}`;
}

function fmt(d) {
  // YYYYMMDDTHHmmSSZ
  return d.toISOString().replace(/[-:]|\.\d{3}/g, '');
}
