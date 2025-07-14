import React, { useState } from 'react';
import { Button } from '../components/Button/Button';

export const ButtonStories: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="story-container">
      <h2>Button Component</h2>
      
      <div className="story-section">
        <h3>Variants</h3>
        <div className="story-grid">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div className="story-section">
        <h3>Sizes</h3>
        <div className="story-grid">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </div>

      <div className="story-section">
        <h3>States</h3>
        <div className="story-grid">
          <Button disabled>Disabled</Button>
          <Button loading={loading} onClick={handleLoadingClick}>
            {loading ? 'Loading...' : 'Click for Loading'}
          </Button>
        </div>
      </div>

      <div className="story-section">
        <h3>Interactive Examples</h3>
        <div className="story-grid">
          <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
          <Button variant="danger" onClick={() => confirm('Are you sure?')}>
            Confirm Action
          </Button>
        </div>
      </div>
    </div>
  );
};