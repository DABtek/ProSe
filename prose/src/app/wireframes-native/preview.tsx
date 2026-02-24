"use client";

import { useMemo, useState } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./wireframes.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const presetSizes = [
  { id: "auto", label: "Auto" },
  { id: "iphone", label: "iPhone 17 Pro Max", width: 390 },
  { id: "ipad", label: "iPad Pro 11", width: 834 },
  { id: "mac", label: "MacBook Pro 16", width: 1280 },
];

export default function WireframesPreview() {
  const [size, setSize] = useState("auto");

  const containerStyle = useMemo(() => {
    const preset = presetSizes.find((item) => item.id === size);
    if (!preset || !preset.width) {
      return { width: "100%" };
    }
    return { width: preset.width, maxWidth: "100%" };
  }, [size]);

  return (
    <div className={`wireframes ${dmSans.className}`}>
      <div className="page-title">
        <h1 className={playfair.className}>⚖️ ProSe — Responsive Wireframes</h1>
        <p>
          9 Screens · iPhone 17 Pro Max · iPad Pro 11&quot; · MacBook Pro 16&quot; · Family
          Court · UX Final Project
        </p>
      </div>

      <div className="device-section">
        <div className="device-section-label">Preview Size</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {presetSizes.map((preset) => (
            <button
              key={preset.id}
              className="btn-sm"
              style={{
                background: size === preset.id ? "var(--gold)" : "transparent",
                color: size === preset.id ? "var(--navy)" : "var(--navy)",
                border:
                  size === preset.id
                    ? "1px solid var(--gold)"
                    : "1px solid var(--navy)",
              }}
              onClick={() => setSize(preset.id)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 auto" }}>
        <div style={containerStyle}>
          <PhoneSection playfair={playfair.className} />
          <TabletSection playfair={playfair.className} />
          <DesktopSection playfair={playfair.className} />
        </div>
      </div>
    </div>
  );
}

type SectionProps = { playfair: string };

function PhoneSection({ playfair }: SectionProps) {
  return (
    <div className="device-section">
      <div className="device-section-label">📱 iPhone 17 Pro Max — 390pt wide</div>
      <div className="phone-row">
        <div className="phone-wrap phone">
          <div className="phone-screen-label">1 / 3 — Onboarding</div>
          <div className="phone-frame">
            <div className="sb">
              <span>9:41</span>
              <div className="notch" />
              <span>●●● ⚡</span>
            </div>
            <div className="sh">
              <div className="logo">⚖️ ProSe</div>
              <h2>
                Let&apos;s set up
                <br />
                your case
              </h2>
              <p>
                Tell us about your situation so we can build your personalized
                legal roadmap.
              </p>
              <div className="prog-wrap">
                <div className="prog-fill" style={{ width: "33%" }} />
              </div>
              <div className="prog-label">Step 1 of 3</div>
            </div>
            <div className="sc">
              <div className="section-title">Your Role in This Case</div>
              <div className="role-grid-2">
                <div className="role-card selected">
                  <div className="rc-icon">🙋</div>
                  <div className="rc-name">Petitioner</div>
                  <div className="rc-desc">I filed the case</div>
                </div>
                <div className="role-card">
                  <div className="rc-icon">🛡️</div>
                  <div className="rc-name">Respondent</div>
                  <div className="rc-desc">I was served</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Case Type</label>
                <select className="form-select">
                  <option>Custody &amp; Parenting Plan</option>
                </select>
              </div>
              <button className="btn-primary">Continue →</button>
            </div>
            <div className="bnav">
              <div className="bnav-item active">
                <div className="bnav-icon">🏠</div>Home
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">📄</div>Docs
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">📅</div>Timeline
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">👤</div>Profile
              </div>
            </div>
          </div>
        </div>

        <div className="phone-wrap phone">
          <div className="phone-screen-label">2 / 3 — Document Upload</div>
          <div className="phone-frame">
            <div className="sb">
              <span>9:41</span>
              <div className="notch" />
              <span>●●● ⚡</span>
            </div>
            <div className="sh">
              <div className="logo">⚖️ ProSe</div>
              <h2>My Documents</h2>
              <p>
                Upload court orders, motions &amp; correspondence for instant AI
                analysis.
              </p>
            </div>
            <div className="sc">
              <div className="upload-zone">
                <div className="uz-icon">📎</div>
                <div className="uz-title">Upload a Document</div>
                <div className="uz-sub">Tap to choose a file or take a photo</div>
                <div className="uz-types">PDF · DOCX · JPG · PNG</div>
              </div>
              <div className="section-title">AI Analysis</div>
              <div className="analysis-card">
                <div className="ac-label">⚡ Key Findings</div>
                <div className="ac-text">
                  3 clauses flagged that may conflict with RCW 26.09.187.
                </div>
                <div className="ac-point">
                  Holiday schedule leaves 4 major holidays unaddressed.
                </div>
              </div>
              <button className="btn-primary">Ask ProSe About This</button>
            </div>
            <div className="bnav">
              <div className="bnav-item">
                <div className="bnav-icon">🏠</div>Home
              </div>
              <div className="bnav-item active">
                <div className="bnav-icon">📄</div>Docs
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">📅</div>Timeline
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">👤</div>Profile
              </div>
            </div>
          </div>
        </div>

        <div className="phone-wrap phone">
          <div className="phone-screen-label">3 / 3 — Timeline</div>
          <div className="phone-frame">
            <div className="sb">
              <span>9:41</span>
              <div className="notch" />
              <span>●●● ⚡</span>
            </div>
            <div className="sh">
              <div className="logo">⚖️ ProSe</div>
              <h2>Case Timeline</h2>
              <p>Pierce County · #24-3-00412-4</p>
            </div>
            <div className="sc">
              <div className="tl-summary">
                <div className="tl-stat">
                  <div className={`tl-num ${playfair}`}>12</div>
                  <div className="tl-lbl">Days to Hearing</div>
                </div>
                <div className="tl-stat">
                  <div className={`tl-num ${playfair}`}>3</div>
                  <div className="tl-lbl">Deadlines</div>
                </div>
                <div className="tl-stat">
                  <div className={`tl-num ${playfair}`}>7</div>
                  <div className="tl-lbl">Docs Filed</div>
                </div>
              </div>
              <div className="section-title">Events &amp; Deadlines</div>
              <div className="tl-track">
                <div className="tl-event">
                  <div className="tl-dot done" />
                  <div className="tl-card">
                    <div className="tl-date">Jan 15, 2025</div>
                    <div className="tl-title">Petition Filed</div>
                  </div>
                </div>
                <div className="tl-event">
                  <div className="tl-dot alert" />
                  <div className="tl-card alert-card">
                    <div className="tl-date">⚠️ Feb 27 — 5 Days Away</div>
                    <div className="tl-title">Deadline: File Response</div>
                  </div>
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 14 }}>
                + Add Event or Deadline
              </button>
            </div>
            <div className="bnav">
              <div className="bnav-item">
                <div className="bnav-icon">🏠</div>Home
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">📄</div>Docs
              </div>
              <div className="bnav-item active">
                <div className="bnav-icon">📅</div>Timeline
              </div>
              <div className="bnav-item">
                <div className="bnav-icon">👤</div>Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletSection({ playfair }: SectionProps) {
  return (
    <div className="device-section">
      <div className="device-section-label">📟 iPad Pro 11&quot; — 834pt wide</div>
      <div className="tablet-row">
        <div className="tablet-wrap">
          <div className="tablet-screen-label">1 / 3 — Onboarding</div>
          <div className="tablet-frame">
            <div className="tab-sb">
              <span>9:41 AM</span>
              <span className={playfair} style={{ color: "var(--gold)" }}>
                ⚖️ ProSe
              </span>
              <span>●●● Wi-Fi ⚡</span>
            </div>
            <div className="tab-nav">
              <div className="tab-logo">⚖️ ProSe</div>
              <div className="tab-nav-item active">Setup</div>
              <div className="tab-nav-item">Documents</div>
              <div className="tab-nav-item">Timeline</div>
              <div className="tab-nav-item">Profile</div>
            </div>
            <div className="tab-body">
              <div className="tab-sidebar">
                <div className="tab-sh">
                  <h2>Case Setup</h2>
                  <p>Fill in your details to personalize your legal coaching.</p>
                  <div className="prog-wrap">
                    <div className="prog-fill" style={{ width: "33%" }} />
                  </div>
                  <div className="prog-label">Step 1 of 3</div>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-panel-title">Your Role in This Case</div>
                <div className="tab-three-col" style={{ marginBottom: 20 }}>
                  <div className="tab-role-card selected">
                    <div className="rc-icon">🙋</div>
                    <div className="rc-name">Petitioner</div>
                    <div className="rc-desc">I filed the case</div>
                  </div>
                  <div className="tab-role-card">
                    <div className="rc-icon">🛡️</div>
                    <div className="rc-name">Respondent</div>
                    <div className="rc-desc">I was served</div>
                  </div>
                  <div className="tab-role-card">
                    <div className="rc-icon">❓</div>
                    <div className="rc-name">Not Sure</div>
                    <div className="rc-desc">Help me identify</div>
                  </div>
                </div>
                <button className="btn-primary" style={{ maxWidth: 260 }}>
                  Continue to Step 2 →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="tablet-wrap">
          <div className="tablet-screen-label">2 / 3 — Document Upload</div>
          <div className="tablet-frame">
            <div className="tab-sb">
              <span>9:41 AM</span>
              <span className={playfair} style={{ color: "var(--gold)" }}>
                ⚖️ ProSe
              </span>
              <span>●●● Wi-Fi ⚡</span>
            </div>
            <div className="tab-nav">
              <div className="tab-logo">⚖️ ProSe</div>
              <div className="tab-nav-item">Setup</div>
              <div className="tab-nav-item active">Documents</div>
              <div className="tab-nav-item">Timeline</div>
              <div className="tab-nav-item">Profile</div>
            </div>
            <div className="tab-body">
              <div className="tab-sidebar">
                <div className="upload-zone" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.2)" }}>
                  <div className="uz-icon">📎</div>
                  <div className="uz-title" style={{ color: "white" }}>Upload Document</div>
                  <div className="uz-sub">Tap or drag &amp; drop</div>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-panel-title">AI Analysis — Parenting Plan</div>
                <div className="analysis-card">
                  <div className="ac-label">⚡ Key Findings</div>
                  <div className="ac-text">
                    3 clauses flagged that may conflict with RCW 26.09.187.
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button className="btn-primary" style={{ maxWidth: 220 }}>
                    Ask ProSe
                  </button>
                  <button className="btn-secondary" style={{ maxWidth: 180, marginTop: 0 }}>
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tablet-wrap">
          <div className="tablet-screen-label">3 / 3 — Timeline</div>
          <div className="tablet-frame">
            <div className="tab-sb">
              <span>9:41 AM</span>
              <span className={playfair} style={{ color: "var(--gold)" }}>
                ⚖️ ProSe
              </span>
              <span>●●● Wi-Fi ⚡</span>
            </div>
            <div className="tab-nav">
              <div className="tab-logo">⚖️ ProSe</div>
              <div className="tab-nav-item">Setup</div>
              <div className="tab-nav-item">Documents</div>
              <div className="tab-nav-item active">Timeline</div>
              <div className="tab-nav-item">Profile</div>
            </div>
            <div className="tab-body">
              <div className="tab-sidebar">
                <div className="tab-sh">
                  <h2>Case Timeline</h2>
                  <p>Pierce County · #24-3-00412-4</p>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-panel-title">Events &amp; Deadlines</div>
                <div className="tab-tl-track">
                  <div className="tab-tl-event">
                    <div className="tab-tl-dot done" />
                    <div className="tl-card">
                      <div className="tl-date">Jan 15, 2025</div>
                      <div className="tl-title">Petition Filed</div>
                    </div>
                  </div>
                  <div className="tab-tl-event">
                    <div className="tab-tl-dot alert" />
                    <div className="tl-card alert-card">
                      <div className="tl-date">⚠️ Feb 27, 2025 — 5 Days Away</div>
                      <div className="tl-title">Deadline: File Response</div>
                    </div>
                  </div>
                </div>
                <button className="btn-secondary" style={{ maxWidth: 220, marginTop: 16 }}>
                  Export Timeline as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSection({ playfair }: SectionProps) {
  return (
    <div className="device-section">
      <div className="device-section-label">💻 MacBook Pro 16&quot; — Full-width canvas</div>
      <div className="desktop-row">
        <div className="desktop-wrap">
          <div className="desktop-screen-label">1 / 3 — Onboarding</div>
          <div className="desktop-frame">
            <div className="dt-bar">
              <div className="dt-logo">⚖️ ProSe</div>
              <div className="dt-nav-links">
                <div className="dt-nav-link active">Case Setup</div>
                <div className="dt-nav-link">Documents</div>
                <div className="dt-nav-link">Timeline</div>
                <div className="dt-nav-link">Coaching</div>
              </div>
              <div className="dt-nav-right">
                <div className="dt-case-badge">No active case</div>
                <div className="dt-avatar">JD</div>
              </div>
            </div>
            <div className="dt-body">
              <div className="dt-sidebar">
                <div className={playfair} style={{ fontSize: "1.1rem", color: "white", marginBottom: 4 }}>
                  New Case Setup
                </div>
                <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 20 }}>
                  Complete each step to activate your personalized ProSe.
                </p>
                <div className="dt-stepper" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div className="dt-step-dot active" style={{ width: 28, height: 28, fontSize: "0.72rem" }}>1</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--gold)" }}>Case Details</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Role, type, jurisdiction</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dt-main">
                <div className="dt-main-header">
                  <div>
                    <h2>Your Role &amp; Case Details</h2>
                    <p>Step 1 of 3 — Tell us about your situation</p>
                  </div>
                  <div style={{ background: "var(--cream-dk)", borderRadius: 8, padding: "6px 14px", fontSize: "0.78rem", color: "var(--muted)" }}>
                    Step 1 of 3
                  </div>
                </div>
                <div className="dt-main-body">
                  <div className="dt-card" style={{ marginBottom: 18 }}>
                    <div className="dt-card-title">Your Role in This Case</div>
                    <div className="dt-three-col">
                      <div className="role-card selected">
                        <div className="rc-icon">🙋</div>
                        <div className="rc-name">Petitioner</div>
                        <div className="rc-desc">I filed the original case</div>
                      </div>
                      <div className="role-card">
                        <div className="rc-icon">🛡️</div>
                        <div className="rc-name">Respondent</div>
                        <div className="rc-desc">I was served papers</div>
                      </div>
                      <div className="role-card">
                        <div className="rc-icon">❓</div>
                        <div className="rc-name">Not Sure</div>
                        <div className="rc-desc">Help me identify my role</div>
                      </div>
                    </div>
                  </div>
                  <div className="dt-two-col" style={{ marginBottom: 18 }}>
                    <div className="dt-card">
                      <div className="dt-card-title">Case Information</div>
                      <div className="dt-form-two">
                        <div className="form-group">
                          <label className="form-label">Case Type</label>
                          <select className="form-select">
                            <option>Custody &amp; Parenting Plan</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Case Number</label>
                          <div className="form-input ph">e.g. 24-3-00412-4</div>
                        </div>
                      </div>
                    </div>
                    <div className="dt-card">
                      <div className="dt-card-title">Family Information</div>
                      <div className="dt-form-two">
                        <div className="form-group">
                          <label className="form-label">Children Involved?</label>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            <div className="role-card selected" style={{ padding: 9 }}>
                              <div className="rc-name">Yes</div>
                            </div>
                            <div className="role-card" style={{ padding: 9 }}>
                              <div className="rc-name">No</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button className="btn-primary" style={{ maxWidth: 220 }}>
                      Continue to Step 2 →
                    </button>
                    <button className="btn-secondary" style={{ maxWidth: 160, marginTop: 0 }}>
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desktop-wrap">
          <div className="desktop-screen-label">2 / 3 — Document Upload</div>
          <div className="desktop-frame">
            <div className="dt-bar">
              <div className="dt-logo">⚖️ ProSe</div>
              <div className="dt-nav-links">
                <div className="dt-nav-link">Case Setup</div>
                <div className="dt-nav-link active">Documents</div>
                <div className="dt-nav-link">Timeline</div>
                <div className="dt-nav-link">Coaching</div>
              </div>
              <div className="dt-nav-right">
                <div className="dt-case-badge">#24-3-00412-4</div>
                <div className="dt-avatar">JD</div>
              </div>
            </div>
            <div className="dt-body">
              <div className="dt-sidebar">
                <div className="dt-sidebar-section">Navigation</div>
                <div className="dt-sidebar-item active">
                  <span className="dt-sidebar-icon">📄</span> My Documents
                </div>
                <div className="dt-sidebar-section">Documents</div>
                <div className="dt-sidebar-item" style={{ color: "rgba(255,255,255,0.7)", background: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.2)" }}>
                  <span className="dt-sidebar-icon">📋</span>
                  <span>Parenting Plan v2 <span className="chip chip-green" style={{ fontSize: "0.58rem", padding: "2px 6px" }}>✓</span></span>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn-sm" style={{ width: "100%", justifyContent: "center", padding: 9 }}>
                    + Upload Document
                  </button>
                </div>
              </div>
              <div className="dt-main">
                <div className="dt-main-header">
                  <div>
                    <h2>Parenting Plan — Draft v2</h2>
                    <p>Uploaded Feb 18, 2025 · 4.2 MB · PDF</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-ghost">⬇ Download</button>
                    <button className="btn-sm">Ask ProSe</button>
                  </div>
                </div>
                <div className="dt-main-body">
                  <div className="dt-doc-panel">
                    <div>
                      <div className="dt-card-title">Document Overview</div>
                      <div className="dt-analysis-card">
                        <div className="dt-analysis-title">⚡ AI Analysis Report</div>
                        <div className="dt-analysis-point">
                          Holiday schedule leaves 4 major holidays unaddressed — creates future dispute risk.
                        </div>
                        <div className="dt-analysis-point">
                          Medical decision-making section lacks a required tie-breaking mechanism.
                        </div>
                      </div>
                      <div style={{ marginTop: 14 }}>
                        <button className="btn-primary">Ask ProSe About This</button>
                        <button className="btn-secondary">Download Full Analysis PDF</button>
                      </div>
                    </div>
                    <div>
                      <div className="dt-card-title">Add More Documents</div>
                      <div className="upload-zone" style={{ marginBottom: 14 }}>
                        <div className="uz-icon">📎</div>
                        <div className="uz-title">Drag &amp; Drop Files Here</div>
                        <div className="uz-sub">or click to browse your computer</div>
                        <div className="uz-types">PDF · DOCX · JPG · PNG · up to 50MB</div>
                      </div>
                      <div className="dt-card">
                        <div className="dt-card-title">Document Checklist</div>
                        <div className="dt-checklist-item"><span className="dt-check">✅</span> Parenting Plan Draft</div>
                        <div className="dt-checklist-item"><span className="dt-check">⏳</span> Financial Declaration</div>
                        <div className="dt-checklist-item"><span className="dt-check">⬜</span> Proposed Order</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desktop-wrap">
          <div className="desktop-screen-label">3 / 3 — Timeline</div>
          <div className="desktop-frame">
            <div className="dt-bar">
              <div className="dt-logo">⚖️ ProSe</div>
              <div className="dt-nav-links">
                <div className="dt-nav-link">Case Setup</div>
                <div className="dt-nav-link">Documents</div>
                <div className="dt-nav-link active">Timeline</div>
                <div className="dt-nav-link">Coaching</div>
              </div>
              <div className="dt-nav-right">
                <div className="dt-case-badge">#24-3-00412-4</div>
                <div className="dt-avatar">JD</div>
              </div>
            </div>
            <div className="dt-body">
              <div className="dt-sidebar">
                <div className="dt-sidebar-section">Filters</div>
                <div className="dt-sidebar-item active" style={{ fontSize: "0.78rem" }}>📋 All Events</div>
                <div className="dt-sidebar-item" style={{ fontSize: "0.78rem" }}>⚠️ Deadlines Only</div>
                <div className="dt-sidebar-item" style={{ fontSize: "0.78rem" }}>✅ Completed</div>
              </div>
              <div className="dt-main">
                <div className="dt-main-header">
                  <div>
                    <h2>Case Timeline</h2>
                    <p>Pierce County Superior Court · Case #24-3-00412-4</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-ghost">⬇ Export</button>
                    <button className="btn-sm">+ Add Event</button>
                  </div>
                </div>
                <div className="dt-main-body">
                  <div className="dt-tl-main">
                    <div>
                      <div className="dt-three-col" style={{ marginBottom: 22 }}>
                        <div className="tl-stat">
                          <div className="tl-num">12</div>
                          <div className="tl-lbl">Days to Final Hearing</div>
                        </div>
                        <div className="tl-stat" style={{ borderColor: "var(--danger)", background: "#FFF5F5" }}>
                          <div className="tl-num" style={{ color: "var(--danger)" }}>3</div>
                          <div className="tl-lbl">Urgent Deadlines</div>
                        </div>
                        <div className="tl-stat">
                          <div className="tl-num">7</div>
                          <div className="tl-lbl">Documents Filed</div>
                        </div>
                      </div>
                      <div className="dt-tl-track">
                        <div className="dt-tl-event">
                          <div className="dt-tl-dot done" />
                          <div className="tl-card">
                            <div className="tl-date">Jan 15, 2025</div>
                            <div className="tl-title">Petition Filed</div>
                          </div>
                        </div>
                        <div className="dt-tl-event">
                          <div className="dt-tl-dot alert" />
                          <div className="tl-card alert-card">
                            <div className="tl-date">⚠️ Feb 27, 2025 — 5 Days Away</div>
                            <div className="tl-title">Deadline: File Response</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dt-right-panel">
                      <div className="dt-rp-card">
                        <div className="dt-rp-title">⚠️ Urgent: 5 Days</div>
                        <p style={{ fontSize: "0.78rem", color: "var(--danger)", fontWeight: 600, marginBottom: 8 }}>
                          Response to Motion to Modify
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          You must file your written response by Feb 27 at 4:00 PM.
                        </p>
                        <button className="btn-primary" style={{ marginTop: 12, fontSize: "0.8rem", padding: 10 }}>
                          View Prep Checklist
                        </button>
                      </div>
                      <div className="dt-rp-card">
                        <div className="dt-rp-title">Case Progress</div>
                        <div className="dt-rp-stat-row">
                          <div className="dt-rp-stat">
                            <div className="dt-rp-stat-num">40%</div>
                            <div className="dt-rp-stat-lbl">Complete</div>
                          </div>
                          <div className="dt-rp-stat">
                            <div className="dt-rp-stat-num">91</div>
                            <div className="dt-rp-stat-lbl">Days Active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
