import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    // TODO: upload file and get job ID from API
    const mockJobId = 'demo-job-001';
    navigate(`/dashboard/processing/${mockJobId}`);
  }

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Upload Document</h1>
        <p>Supported formats: PDF, Word (.docx), plain text</p>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <div
          className={`upload-zone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {file ? (
            <>
              <div className="upload-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="20" cy="20" r="18" fill="rgba(144,174,173,0.2)" stroke="#90AEAD" strokeWidth="2" />
                  <path d="M13 20.5 L18 25.5 L27 15" stroke="#244855" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="upload-filename">{file.name}</div>
              <div className="upload-hint">Click to choose a different file</div>
            </>
          ) : (
            <>
              <div className="upload-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="10" y="6" width="20" height="28" rx="3" fill="rgba(36,72,85,0.12)" stroke="#244855" strokeWidth="1.5" />
                  <path d="M15 14 h10M15 19 h10M15 24 h6" stroke="#244855" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 30 v6M17 33 l3-3 3 3" stroke="#E64833" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="upload-label">Drop your document here</div>
              <div className="upload-hint">or click to browse</div>
            </>
          )}
        </div>

        <button type="submit" className="btn-primary large" disabled={!file}>
          Generate Story
        </button>
      </form>
    </div>
  );
}
