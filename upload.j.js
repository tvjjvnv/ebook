const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('academicFile');
const dropzone = document.getElementById('dropzone');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const statusMessage = document.getElementById('statusMessage');

const MAX_SIZE_MB = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];

// UI state handlers for File Selection
fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = 'Click or drag file here';
  }
});

// Drag and drop visual cues
['dragenter', 'dragover'].forEach(eventName => {
  dropzone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropzone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
  }, false);
});

// Validation and Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  statusMessage.className = 'msg';
  statusMessage.textContent = '';

  const file = fileInput.files[0];

  if (!file) {
    showError('Please choose a file to upload.');
    return;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    showError('Invalid format! Only PDF, DOC, and DOCX files are allowed.');
    return;
  }

  if (file.size > MAX_SIZE_BYTES) {
    const actualSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    showError(`File is too large (${actualSizeMB} MB). Maximum allowed size is ${MAX_SIZE_MB} MB.`);
    return;
  }

  showSuccess('Validation successful! Ready to upload.');
});

function showError(msg) {
  statusMessage.className = 'msg error';
  statusMessage.textContent = msg;
}

function showSuccess(msg) {
  statusMessage.className = 'msg success';
  statusMessage.textContent = msg;
}