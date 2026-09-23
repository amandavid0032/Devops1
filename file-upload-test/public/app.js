const form = document.querySelector('#upload-form');
const status = document.querySelector('#status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = 'Uploading…';
  const response = await fetch('/api/uploads', { method: 'POST', body: new FormData(form) });
  const body = await response.json();
  status.textContent = response.ok
    ? `Done. Saved to: ${body.upload.storage.location}`
    : `Error: ${body.error || 'Upload failed.'}`;
  if (response.ok) form.reset();
});
