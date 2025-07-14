import React from 'react';

export const ComponentDocs: React.FC = () => {
  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>Component Library Documentation</h1>
        <p>A comprehensive guide to using our React component library</p>
      </div>

      <div className="docs-section">
        <h2>🚀 Getting Started</h2>
        <p>
          This component library provides a set of reusable React components with no external dependencies.
          Each component is self-contained with its own styling and doesn't require any additional configuration.
        </p>
        
        <div className="docs-code">
{`// Installation
npm install your-component-library

// Usage
import { Button, Avatar, Badge } from 'your-component-library';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Avatar src="/avatar.jpg" alt="User" />
      <Badge count={5}>Notifications</Badge>
    </div>
  );
}`}
        </div>
      </div>

      <div className="docs-section">
        <h2>🎨 Design Principles</h2>
        <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
          <li><strong>Zero Dependencies:</strong> No external libraries required</li>
          <li><strong>Self-Contained:</strong> Each component includes its own CSS</li>
          <li><strong>Accessible:</strong> Built with accessibility in mind</li>
          <li><strong>Customizable:</strong> Easy to theme and customize</li>
          <li><strong>Responsive:</strong> Works on all device sizes</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>📦 Components</h2>
        
        <h3>Button Component</h3>
        <p>A versatile button component with multiple variants and states.</p>
        
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="ui-button ui-button--primary ui-button--medium">Primary</button>
            <button className="ui-button ui-button--secondary ui-button--medium">Secondary</button>
            <button className="ui-button ui-button--danger ui-button--medium">Danger</button>
          </div>
        </div>

        <div className="docs-code">
{`<Button variant="primary" size="medium" onClick={handleClick}>
  Click me
</Button>`}
        </div>

        <h4>Props</h4>
        <table className="props-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>variant</td>
              <td><span className="type-badge">primary | secondary | danger | ghost</span></td>
              <td><span className="default-badge">primary</span></td>
              <td>Button style variant</td>
            </tr>
            <tr>
              <td>size</td>
              <td><span className="type-badge">small | medium | large</span></td>
              <td><span className="default-badge">medium</span></td>
              <td>Button size</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><span className="type-badge">boolean</span></td>
              <td><span className="default-badge">false</span></td>
              <td>Disable the button</td>
            </tr>
            <tr>
              <td>loading</td>
              <td><span className="type-badge">boolean</span></td>
              <td><span className="default-badge">false</span></td>
              <td>Show loading state</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td><span className="type-badge">function</span></td>
              <td><span className="default-badge">-</span></td>
              <td>Click handler</td>
            </tr>
          </tbody>
        </table>

        <h3>Avatar Component</h3>
        <p>Display user avatars with initials fallback and different shapes.</p>
        
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="ui-avatar ui-avatar--medium ui-avatar--circle">
              <span className="ui-avatar__text">JD</span>
            </div>
            <div className="ui-avatar ui-avatar--medium ui-avatar--square">
              <span className="ui-avatar__text">JS</span>
            </div>
            <div className="ui-avatar ui-avatar--large ui-avatar--circle">
              <span className="ui-avatar__text">AB</span>
            </div>
          </div>
        </div>

        <div className="docs-code">
{`<Avatar src="/user.jpg" alt="User" size="medium" shape="circle" />
<Avatar size="large">John Doe</Avatar>`}
        </div>

        <h4>Props</h4>
        <table className="props-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>src</td>
              <td><span className="type-badge">string</span></td>
              <td><span className="default-badge">-</span></td>
              <td>Image source URL</td>
            </tr>
            <tr>
              <td>alt</td>
              <td><span className="type-badge">string</span></td>
              <td><span className="default-badge">-</span></td>
              <td>Image alt text</td>
            </tr>
            <tr>
              <td>size</td>
              <td><span className="type-badge">small | medium | large | xlarge</span></td>
              <td><span className="default-badge">medium</span></td>
              <td>Avatar size</td>
            </tr>
            <tr>
              <td>shape</td>
              <td><span className="type-badge">circle | square</span></td>
              <td><span className="default-badge">circle</span></td>
              <td>Avatar shape</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td><span className="type-badge">function</span></td>
              <td><span className="default-badge">-</span></td>
              <td>Click handler</td>
            </tr>
          </tbody>
        </table>

        <h3>Badge Component</h3>
        <p>Small count and status indicators that can be used standalone or wrapped around other components.</p>
        
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span className="ui-badge ui-badge--primary ui-badge--medium">New</span>
            <span className="ui-badge ui-badge--success ui-badge--medium">5</span>
            <span className="ui-badge ui-badge--warning ui-badge--medium">99+</span>
            <span className="ui-badge-wrapper">
              <button className="ui-button ui-button--secondary ui-button--medium">Messages</button>
              <span className="ui-badge ui-badge--danger ui-badge--medium">3</span>
            </span>
          </div>
        </div>

        <div className="docs-code">
{`<Badge variant="primary">New</Badge>
<Badge count={5}>
  <Button>Messages</Button>
</Badge>
<Badge dot variant="success">
  <Avatar>User</Avatar>
</Badge>`}
        </div>

        <h4>Props</h4>
        <table className="props-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>variant</td>
              <td><span className="type-badge">primary | secondary | success | warning | danger | info</span></td>
              <td><span className="default-badge">primary</span></td>
              <td>Badge color variant</td>
            </tr>
            <tr>
              <td>size</td>
              <td><span className="type-badge">small | medium | large</span></td>
              <td><span className="default-badge">medium</span></td>
              <td>Badge size</td>
            </tr>
            <tr>
              <td>count</td>
              <td><span className="type-badge">number</span></td>
              <td><span className="default-badge">-</span></td>
              <td>Number to display</td>
            </tr>
            <tr>
              <td>dot</td>
              <td><span className="type-badge">boolean</span></td>
              <td><span className="default-badge">false</span></td>
              <td>Show as dot instead of number</td>
            </tr>
            <tr>
              <td>showZero</td>
              <td><span className="type-badge">boolean</span></td>
              <td><span className="default-badge">false</span></td>
              <td>Show badge when count is 0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>🎭 Theming</h2>
        <p>
          All components use CSS custom properties (CSS variables) for easy theming.
          You can override these variables in your application's CSS:
        </p>
        
        <div className="docs-code">
{`:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --info-color: #06b6d4;
}`}
        </div>
      </div>

      <div className="docs-section">
        <h2>♿ Accessibility</h2>
        <p>All components are built with accessibility in mind:</p>
        <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
          <li>Keyboard navigation support</li>
          <li>Screen reader compatibility</li>
          <li>Proper focus management</li>
          <li>ARIA attributes where needed</li>
          <li>High contrast support</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>🔧 Development</h2>
        <p>
          Want to contribute or modify the components? Here's how to get started:
        </p>
        
        <div className="docs-code">
{`# Clone the repository
git clone https://github.com/your-org/component-library

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build`}
        </div>
      </div>
    </div>
  );
};