import React, { useState } from 'react';
import { Button } from './Button';
import { Search, Download, Plus, Heart, Settings, ArrowRight, Loader2 } from 'lucide-react';

export const ButtonDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const colors: Array<'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan'> = [
    'default', 'primary', 'danger', 'pink', 'purple', 'cyan'
  ];
  
  const variants: Array<'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link'> = [
    'solid', 'outlined', 'dashed', 'filled', 'text', 'link'
  ];

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Button</h1>
        <p>To trigger an operation.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <p>A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.</p>
        <p>In our design system we provide 6 variants of button:</p>
        <ul>
          <li>🔵 <strong>Solid button:</strong> used for the main action, there can be at most one primary button in a section.</li>
          <li>⚪️ <strong>Outlined button:</strong> used for a series of actions without priority.</li>
          <li>😶 <strong>Dashed button:</strong> commonly used for adding more actions.</li>
          <li>🔤 <strong>Filled button:</strong> used for secondary actions with subtle background.</li>
          <li>🔤 <strong>Text button:</strong> used for the most secondary action.</li>
          <li>🔗 <strong>Link button:</strong> used for external links.</li>
        </ul>
        <p>And 4 other properties additionally:</p>
        <ul>
          <li>🔴 <strong>danger:</strong> used for actions of risk, like deletion or authorization.</li>
          <li>👻 <strong>ghost:</strong> used in situations with complex background, home pages usually.</li>
          <li>🚫 <strong>disabled:</strong> used when actions are not available.</li>
          <li>🔃 <strong>loading:</strong> adds a loading spinner in button, avoids multiple submits too.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Icon</h3>
          <p>Button can have an icon to make the action more intuitive.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button color="primary" icon={<Search />}>Search</Button>
              <Button color="default" icon={<Download />}>Download</Button>
              <Button color="success" icon={<Plus />}>Add</Button>
              <Button color="danger" icon={<Heart />}>Like</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button color="primary" icon={<Search />}>Search</Button>
<Button color="default" icon={<Download />}>Download</Button>
<Button color="success" icon={<Plus />}>Add</Button>
<Button color="danger" icon={<Heart />}>Like</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Icon Position</h3>
          <p>Icon can be placed at the start or end of the button text.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button color="primary" icon={<Search />} iconPosition="start">Search</Button>
              <Button color="primary" icon={<ArrowRight />} iconPosition="end">Next</Button>
              <Button color="default" icon={<Settings />} iconPosition="start">Settings</Button>
              <Button color="default" icon={<Download />} iconPosition="end">Download</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button color="primary" icon={<Search />} iconPosition="start">Search</Button>
<Button color="primary" icon={<ArrowRight />} iconPosition="end">Next</Button>
<Button color="default" icon={<Settings />} iconPosition="start">Settings</Button>
<Button color="default" icon={<Download />} iconPosition="end">Download</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Icon Only</h3>
          <p>Button can be icon-only by omitting the text content.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button color="primary" icon={<Search />} />
              <Button color="default" icon={<Settings />} />
              <Button color="danger" icon={<Heart />} />
              <Button color="success" icon={<Plus />} />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button color="primary" icon={<Search />} />
<Button color="default" icon={<Settings />} />
<Button color="danger" icon={<Heart />} />
<Button color="success" icon={<Plus />} />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Shape</h3>
          <p>Button supports three shapes: default, round, and circle.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button color="primary" shape="default">Default</Button>
              <Button color="primary" shape="round">Round</Button>
              <Button color="primary" shape="circle" icon={<Plus />} />
              <Button color="default" shape="circle" icon={<Search />} />
              <Button color="danger" shape="circle" icon={<Heart />} />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button color="primary" shape="default">Default</Button>
<Button color="primary" shape="round">Round</Button>
<Button color="primary" shape="circle" icon={<Plus />} />
<Button color="default" shape="circle" icon={<Search />} />
<Button color="danger" shape="circle" icon={<Heart />} />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Color & Variant Combinations</h3>
          <p>All color and variant combinations available in the button component.</p>
          <div className="example-demo">
            {colors.map(color => (
              <div key={color} style={{ marginBottom: '16px' }}>
                <h4 style={{ marginBottom: '8px', textTransform: 'capitalize', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {color} Color
                </h4>
                <div className="button-group">
                  {variants.map(variant => (
                    <Button key={variant} color={color} variant={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="example-code">
            <pre>{`<Button color="default" variant="solid">Solid</Button>
<Button color="default" variant="outlined">Outlined</Button>
<Button color="default" variant="dashed">Dashed</Button>
<Button color="default" variant="filled">Filled</Button>
<Button color="default" variant="text">Text</Button>
<Button color="default" variant="link">Link</Button>

<Button color="primary" variant="solid">Solid</Button>
<Button color="primary" variant="outlined">Outlined</Button>
// ... and so on for all colors`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Size</h3>
          <p>Button supports three sizes: small, medium (default), and large.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button size="large" color="primary">Large</Button>
              <Button size="medium" color="primary">Medium</Button>
              <Button size="small" color="primary">Small</Button>
              <Button size="large" color="primary" icon={<Search />}>Large with Icon</Button>
              <Button size="medium" color="primary" icon={<Search />}>Medium with Icon</Button>
              <Button size="small" color="primary" icon={<Search />}>Small with Icon</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button size="large" color="primary">Large</Button>
<Button size="medium" color="primary">Medium</Button>
<Button size="small" color="primary">Small</Button>
<Button size="large" color="primary" icon={<Search />}>Large with Icon</Button>
<Button size="medium" color="primary" icon={<Search />}>Medium with Icon</Button>
<Button size="small" color="primary" icon={<Search />}>Small with Icon</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Loading</h3>
          <p>A loading indicator can be added to a button by setting the loading property. You can also customize the loading icon.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button loading={loading} color="primary" onClick={handleLoadingClick}>
                {loading ? 'Loading' : 'Click me!'}
              </Button>
              <Button loading color="primary">Loading</Button>
              <Button loading size="small">Loading</Button>
              <Button loading={{ icon: <Loader2 /> }} color="primary">Custom Loading</Button>
              <Button loading color="primary" icon={<Search />}>Search</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button loading={loading} color="primary" onClick={handleLoadingClick}>
  {loading ? 'Loading' : 'Click me!'}
</Button>
<Button loading color="primary">Loading</Button>
<Button loading size="small">Loading</Button>
<Button loading={{ icon: <Loader2 /> }} color="primary">Custom Loading</Button>
<Button loading color="primary" icon={<Search />}>Search</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Disabled</h3>
          <p>To mark a button as disabled, add the disabled property to the Button.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button color="primary">Primary</Button>
              <Button color="primary" disabled>Primary(disabled)</Button>
              <Button color="default">Default</Button>
              <Button color="default" disabled>Default(disabled)</Button>
              <Button color="danger">Danger</Button>
              <Button color="danger" disabled>Danger(disabled)</Button>
              <Button color="primary" icon={<Search />}>With Icon</Button>
              <Button color="primary" icon={<Search />} disabled>With Icon(disabled)</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button color="primary">Primary</Button>
<Button color="primary" disabled>Primary(disabled)</Button>
<Button color="default">Default</Button>
<Button color="default" disabled>Default(disabled)</Button>
<Button color="primary" icon={<Search />}>With Icon</Button>
<Button color="primary" icon={<Search />} disabled>With Icon(disabled)</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Ghost Button</h3>
          <p>Ghost button has a transparent background and is usually used in colored backgrounds.</p>
          <div className="example-demo">
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', borderRadius: '8px' }}>
              <div className="button-group">
                <Button ghost>Ghost</Button>
                <Button ghost disabled>Ghost(disabled)</Button>
                <Button ghost color="primary">Primary Ghost</Button>
                <Button ghost color="danger">Danger Ghost</Button>
                <Button ghost icon={<Search />}>Ghost with Icon</Button>
                <Button ghost color="primary" icon={<Plus />}>Primary Ghost</Button>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button ghost>Ghost</Button>
<Button ghost disabled>Ghost(disabled)</Button>
<Button ghost color="primary">Primary Ghost</Button>
<Button ghost color="danger">Danger Ghost</Button>
<Button ghost icon={<Search />}>Ghost with Icon</Button>
<Button ghost color="primary" icon={<Plus />}>Primary Ghost</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Link Button</h3>
          <p>Link buttons can be used with href attribute for navigation.</p>
          <div className="example-demo">
            <div className="button-group">
              <Button variant="link" href="https://example.com">External Link</Button>
              <Button variant="link" color="primary" href="#section">Internal Link</Button>
              <Button variant="link" color="danger" href="#delete">Delete Link</Button>
              <Button variant="link" color="primary" icon={<ArrowRight />} iconPosition="end" href="#next">Next Page</Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Button variant="link" href="https://example.com">External Link</Button>
<Button variant="link" color="primary" href="#section">Internal Link</Button>
<Button variant="link" color="danger" href="#delete">Delete Link</Button>
<Button variant="link" color="primary" icon={<ArrowRight />} iconPosition="end" href="#next">Next Page</Button>`}</pre>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        <p>To get a customized button, just set color/variant/size/loading/disabled/ghost.</p>
        
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
              <td>color</td>
              <td>Set button color</td>
              <td>default | primary | danger | pink | purple | cyan</td>
              <td>default</td>
              <td></td>
            </tr>
            <tr>
              <td>variant</td>
              <td>Set button variant</td>
              <td>solid | outlined | dashed | filled | text | link</td>
              <td>solid</td>
              <td></td>
            </tr>
            <tr>
              <td>icon</td>
              <td>Set the icon component of button</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>iconPosition</td>
              <td>Set the icon position of button</td>
              <td>start | end</td>
              <td>start</td>
              <td></td>
            </tr>
            <tr>
              <td>shape</td>
              <td>Can be used to set button shape</td>
              <td>default | circle | round</td>
              <td>default</td>
              <td></td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Disabled state of button</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>ghost</td>
              <td>Make background transparent and invert text and border colors</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>href</td>
              <td>Redirect url of link button</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Set the loading status of button</td>
              <td>boolean | {"{ delay?: number; icon?: ReactNode }"}</td>
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
              <td>type</td>
              <td>Set the original html type of button</td>
              <td>button | submit | reset</td>
              <td>button</td>
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