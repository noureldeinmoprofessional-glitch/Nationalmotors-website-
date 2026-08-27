"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";

export const CV_ACCEPT = ".pdf,.doc,.docx";
export const CV_MAX_MB = 10;

/* Reusable premium CV upload — drag/drop or browse, shows filename/size/type,
   allows remove/replace. Does not upload anywhere (no backend). */
export default function CVUpload({
  file,
  setFile,
  error,
  idPrefix = "cv",
}: {
  file: File | null;
  setFile: (f: File | null) => void;
  error?: string;
  idPrefix?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const labelId = `${idPrefix}-label`;
  const hintId = `${idPrefix}-hint`;

  const onFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (f) setFile(f);
  };

  return (
    <div className="nm-field nm-field--full">
      <span className="nm-cr-label" id={labelId}>Upload your CV / Resume</span>
      {file ? (
        <div className="nm-cv nm-cv--filled">
          <FileText strokeWidth={1.6} aria-hidden="true" />
          <div className="nm-cv__meta">
            <span className="nm-cv__name">{file.name}</span>
            <span className="nm-cv__sub">{(file.size / 1024 / 1024).toFixed(2)} MB · {file.type || "document"}</span>
          </div>
          <button type="button" className="nm-cv__remove" onClick={() => setFile(null)} aria-label="Remove file"><X strokeWidth={1.8} /></button>
        </div>
      ) : (
        <div
          className={`nm-cv${drag ? " is-drag" : ""}${error ? " has-error" : ""}`}
          role="button"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); onFiles(e.dataTransfer.files); }}
        >
          <UploadCloud strokeWidth={1.5} aria-hidden="true" />
          <span className="nm-cv__prompt">Drag &amp; drop or <span className="nm-cv__browse">browse</span></span>
          <span className="nm-cv__hint" id={hintId}>PDF, DOC or DOCX · up to {CV_MAX_MB} MB</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept={CV_ACCEPT} className="nm-sr-only" tabIndex={-1} aria-hidden="true" onChange={(e) => onFiles(e.target.files)} />
      {error && <span className="nm-field__error" role="alert">{error}</span>}
    </div>
  );
}

export function validateCv(cv: File | null): string | undefined {
  if (!cv) return "Please upload your CV.";
  if (!/\.(pdf|docx?)$/i.test(cv.name)) return "CV must be a PDF, DOC or DOCX file.";
  if (cv.size > CV_MAX_MB * 1024 * 1024) return `CV must be under ${CV_MAX_MB} MB.`;
  return undefined;
}
