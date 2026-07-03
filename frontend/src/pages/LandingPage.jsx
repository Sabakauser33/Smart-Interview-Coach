import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import "../styles/LandingPage.scss";

const metrics = [
  { value: "12K+", label: "interviews planned" },
  { value: "+28%", label: "average confidence gain" },
  { value: "4.9/5", label: "user satisfaction" },
];

const features = [
  {
    icon: "🤖",
    title: "AI Interview Coach",
    description: "Receive tailored practice prompts, score feedback, and structured answer guidance.",
  },
  {
    icon: "📊",
    title: "Actionable Insights",
    description: "Identify strengths and weaknesses with instant AI-driven suggestions.",
  },
  {
    icon: "📁",
    title: "Professional Reports",
    description: "Review each session with clear progress tracking and next-step recommendations.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your profile",
    description: "Sign up and tell us the role you are preparing for.",
  },
  {
    number: "02",
    title: "Share your job brief",
    description: "Paste the job description or upload your resume in seconds.",
  },
  {
    number: "03",
    title: "Practice and improve",
    description: "Run mock interviews, review feedback, and grow your interview readiness.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // If the user is already authenticated, send them to the app home page
  useEffect(() => {
    if (!loading && user) {
      navigate("/home", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className={`landing-page ${visible ? "visible" : ""}`}>
      <header className="landing-navbar" role="banner">
        <div className="landing-brand">Smart Interview Coach</div>
        <nav className="nav-links" aria-label="Main navigation">
          <button className="nav-link nav-link--ghost" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-link nav-link--primary" onClick={() => navigate("/register")}>Register</button>
        </nav>
      </header>

      <main className="landing-hero" role="main">
        <div className="hero-inner">
          <section className="hero-copy" aria-labelledby="hero-title">
            <span className="hero-badge">AI-Powered Interview Readiness</span>
            <h1 id="hero-title">Prepare smarter, answer stronger, interview with confidence.</h1>
            <p className="hero-sub">Build a winning interview strategy with personalized coaching, mock practice, and feedback tailored to your role.</p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate("/register")}>Get Started — Free</button>
              <button className="btn btn-secondary" onClick={() => navigate("/login")}>See Demo</button>
            </div>
          </section>

          <aside className="hero-visual" aria-hidden="true">
            <div className="hero-card">
              <p className="panel-label">Trusted by professionals</p>
              <h3>Fast, modern interview prep for experienced candidates.</h3>
              <p className="muted">Use AI to sharpen answers, map skill gaps, and move from uncertainty to clarity.</p>

              <div className="hero-stats" aria-hidden>
                {metrics.map((m) => (
                  <div key={m.label} className="stat">
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <section className="landing-section feature-section" aria-labelledby="features-title">
        <div className="section-heading">
          <p className="section-label">Core benefits</p>
          <h2 id="features-title">Everything you need for a professional interview flow.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon" aria-hidden>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section steps-section" aria-labelledby="steps-title">
        <div className="section-heading">
          <p className="section-label">How it works</p>
          <h2 id="steps-title">Get interview ready in three simple steps.</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing-footer" role="contentinfo">
        <p>Smart Interview Coach — build your best interview performance.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
