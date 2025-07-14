import React, { useState } from 'react';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';

export const BadgeStories: React.FC = () => {
  const [count, setCount] = useState(5);

  return (
    <div className="story-container">
      <h2>Badge Component</h2>
      
      <div className="story-section">
        <h3>Variants</h3>
        <div className="story-grid">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div className="story-section">
        <h3>Sizes</h3>
        <div className="story-grid">
          <Badge size="small">Small</Badge>
          <Badge size="medium">Medium</Badge>
          <Badge size="large">Large</Badge>
        </div>
      </div>

      <div className="story-section">
        <h3>With Count</h3>
        <div className="story-grid">
          <Badge count={count}>
            <Button variant="secondary">Messages</Button>
          </Badge>
          <Badge count={99}>
            <Button variant="secondary">Notifications</Button>
          </Badge>
          <Badge count={150}>
            <Button variant="secondary">Updates</Button>
          </Badge>
        </div>
        <div className="story-controls">
          <Button size="small" onClick={() => setCount(count - 1)}>-</Button>
          <span>Count: {count}</span>
          <Button size="small" onClick={() => setCount(count + 1)}>+</Button>
        </div>
      </div>

      <div className="story-section">
        <h3>Dot Badge</h3>
        <div className="story-grid">
          <Badge dot>
            <Button variant="secondary">Default</Button>
          </Badge>
          <Badge dot variant="success">
            <Button variant="secondary">Online</Button>
          </Badge>
          <Badge dot variant="warning">
            <Button variant="secondary">Away</Button>
          </Badge>
          <Badge dot variant="danger">
            <Button variant="secondary">Offline</Button>
          </Badge>
        </div>
      </div>

      <div className="story-section">
        <h3>Standalone</h3>
        <div className="story-grid">
          <Badge>New</Badge>
          <Badge variant="success">Online</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Error</Badge>
        </div>
      </div>
    </div>
  );
};