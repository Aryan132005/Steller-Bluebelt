import { useState } from 'react';

interface Props {
  onClose: () => void;
}

/**
 * GOOGLE FORM SCHEMA FOR LEVEL 5 SUBMISSION:
 * 
 * Create a Google Form with the following fields:
 * 1. Wallet Address (Type: Short Answer, Required: Yes)
 * 2. Email Address (Type: Short Answer, Required: No)
 * 3. Full Name / GitHub Username (Type: Short Answer, Required: No)
 * 4. Product Feedback Rating (Type: Linear Scale 1-5, Required: Yes)
 * 5. Detailed Comments / Suggestions (Type: Paragraph, Required: No)
 * 
 * Once created, paste the form URL into the placeholder below.
 */

// TODO: Paste your actual Google Form URL here
const GOOGLE_FORM_URL = 'https://forms.gle/GrantPulseFeedbackL5';

export function FeedbackWidget({ onClose }: Props) {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating before submitting.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // Simulate network request to mock backend API
      await new Promise((resolve) => setTimeout(resolve, 800));

      const payload = {
        rating,
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };

      // Persist to local storage to simulate backend database storage
      const existing = JSON.parse(localStorage.getItem('grantpulse_feedback') || '[]');
      existing.push(payload);
      localStorage.setItem('grantpulse_feedback', JSON.stringify(existing));

      // Mock event tracking
      if ((window as any).plausible) {
        (window as any).plausible('FeedbackSubmitted', { props: { rating } });
      }

      setSubmitted(true);
    } catch {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card feedback-card success animated-fade-in">
        <div className="feedback-header">
          <span>💖 Thank you!</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '8px 0 0', lineHeight: 1.4 }}>
          Your quick rating has been saved! If you haven't already, please fill out our detailed{' '}
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', fontWeight: 'bold' }}>
            Official Feedback Form
          </a>{' '}
          to help us improve.
        </p>
      </div>
    );
  }

  return (
    <div className="card feedback-card animated-slide-up">
      <div className="feedback-header">
        <span>💬 Help Us Improve GrantPulse!</span>
        <button className="close-btn" onClick={onClose} aria-label="Close form">
          ✕
        </button>
      </div>
      
      <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
        <p className="feedback-subtitle" style={{ margin: '0 0 12px', fontSize: '13px', lineHeight: '1.4' }}>
          🎉 Thank you for participating in governance! We'd appreciate it if you could fill out our official feedback form:
        </p>
        <a 
          href={GOOGLE_FORM_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          style={{ 
            display: 'block', 
            textDecoration: 'none', 
            textAlign: 'center', 
            fontSize: '13px', 
            fontWeight: '600',
            padding: '10px 14px'
          }}
          onClick={() => {
            if ((window as any).plausible) {
              (window as any).plausible('GoogleFormClicked');
            }
          }}
        >
          📋 Open Official Google Form
        </a>
      </div>

      <p className="feedback-subtitle" style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 10px' }}>
        Or submit a quick 1-to-5 star rating directly:
      </p>

      <form onSubmit={handleSubmit}>
        <div className="rating-selector" style={{ marginBottom: '10px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-btn ${star <= rating ? 'active' : ''}`}
              onClick={() => setRating(star)}
              disabled={isSubmitting}
              title={`${star} Star${star > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="What did you like? What can be improved?"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
          maxLength={300}
        />

        <div className="feedback-actions" style={{ marginTop: '10px' }}>
          {error && <span className="feedback-error-inline">{error}</span>}
          <button type="submit" className="btn btn-outline btn-sm" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Rating'}
          </button>
        </div>
      </form>
    </div>
  );
}
