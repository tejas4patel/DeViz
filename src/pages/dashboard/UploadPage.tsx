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
              <div className="upload-icon">✅</div>
              <div className="upload-filename">{file.name}</div>
              <div className="upload-hint">Click to choose a different file</div>
            </>
          ) : (
            <>
              <div className="upload-icon">📄</div>
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
