import React, { useState } from 'react';
import { Button } from './Button';

export const ButtonDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Button</h1>
        <p>To trigger an operation.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <p>A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.</p>
        <p>In Ant Design we provide 4 types of button.</p>
        <ul>
          <li>Primary button: indicate the main action, one primary button at most in one section.</li>
          <li>Default button: indicate a series of actions without priority.</li>
          <li>Dashed button: used for adding action commonly.</li>
          <li>Text button: used for the most secondary action.</li>
          <li>Link button: used for external links.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Type</h3>
          <p>There are primary button, default button, dashed button, text button and link button in antd.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Default Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Default Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="danger">Danger Button</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Size</h3>
          <p>Ant Design supports a default button size as well as a large and small size.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button size="large" variant="primary">Large</Button>
              <Button size="medium" variant="primary">Default</Button>
              <Button size="small" variant="primary">Small</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button size="large" variant="primary">Large</Button>
<Button size="medium" variant="primary">Default</Button>
<Button size="small" variant="primary">Small</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Loading</h3>
          <p>A loading indicator can be added to a button by setting the loading property on the Button.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button loading={loading} variant="primary" onClick={handleLoadingClick}>
                {loading ? 'Loading' : 'Click me!'}
              </Button>
              <Button loading variant="primary">Loading</Button>
              <Button loading size="small">Loading</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button loading={loading} variant="primary" onClick={handleLoadingClick}>
  {loading ? 'Loading' : 'Click me!'}
</Button>
<Button loading variant="primary">Loading</Button>
<Button loading size="small">Loading</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Disabled</h3>
          <p>To mark a button as disabled, add the disabled property to the Button.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" disabled>Primary(disabled)</Button>
              <Button variant="secondary">Default</Button>
              <Button variant="secondary" disabled>Default(disabled)</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="ghost" disabled>Ghost(disabled)</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="danger" disabled>Danger(disabled)</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button variant="primary">Primary</Button>
<Button variant="primary" disabled>Primary(disabled)</Button>
<Button variant="secondary">Default</Button>
<Button variant="secondary" disabled>Default(disabled)</Button>`}</pre>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>To get a customized button, just set type/shape/size/loading/disabled.</p>
        
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>disabled</td>
              <td>Disabled state of button</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Set the loading status of button</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>Set the size of button</td>
              <td>large | medium | small</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>variant</td>
              <td>Set button type</td>
              <td>primary | secondary | ghost | danger</td>
              <td>primary</td>
              <td></td>
            </tr>
            <tr>
              <td>onClick</td>
              <td>Set the handler to handle click event</td>
              <td>{"(event) => void"}</td>
              <td>-</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};