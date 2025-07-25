import React, { useState } from 'react';
import { Switch } from './Switch';
import { FormItem } from '../Form';
import { Check, X, Sun, Moon, Wifi, WifiOff } from 'lucide-react';

export const SwitchDocs: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLoadingChange = (checked: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChecked(checked);
    }, 1000);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Switch</h1>
        <p>Switching Selector. Switch is used for switching between two opposing states.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>If you need to represent the switching between two states or on-off state.</li>
          <li>The difference between Switch and Checkbox is that Switch will trigger a state change directly when you toggle it, while Checkbox is generally used for state marking, which should work in conjunction with submit operation.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>The most basic usage.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Switch />
              <Switch defaultChecked />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Switch />
<Switch defaultChecked />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Disabled</h3>
          <p>Disabled state of Switch.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Switch disabled />
              <Switch disabled defaultChecked />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Switch disabled />
<Switch disabled defaultChecked />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Text & Icon</h3>
          <p>With text and icon.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                <Switch checkedChildren="1" unCheckedChildren="0" />
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch 
                  checkedChildren={<Check size={12} />} 
                  unCheckedChildren={<X size={12} />} 
                  defaultChecked 
                />
                <Switch 
                  checkedChildren={<Sun size={12} />} 
                  unCheckedChildren={<Moon size={12} />} 
                />
                <Switch 
                  checkedChildren={<Wifi size={12} />} 
                  unCheckedChildren={<WifiOff size={12} />} 
                  defaultChecked
                />
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
<Switch checkedChildren="1" unCheckedChildren="0" />
<Switch 
  checkedChildren={<Check size={12} />} 
  unCheckedChildren={<X size={12} />} 
  defaultChecked 
/>
<Switch 
  checkedChildren={<Sun size={12} />} 
  unCheckedChildren={<Moon size={12} />} 
/>
<Switch 
  checkedChildren={<Wifi size={12} />} 
  unCheckedChildren={<WifiOff size={12} />} 
  defaultChecked
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Size</h3>
          <p>Switch supports three sizes: small, medium (default), and large.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Switch size="small" defaultChecked />
              <Switch size="medium" defaultChecked />
              <Switch size="large" defaultChecked />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Switch size="small" defaultChecked />
<Switch size="medium" defaultChecked />
<Switch size="large" defaultChecked />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Loading</h3>
          <p>Mark a pending state of switch.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Switch loading defaultChecked />
              <Switch loading />
              <Switch 
                loading={loading} 
                checked={checked}
                onChange={handleLoadingChange}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Switch loading defaultChecked />
<Switch loading />
<Switch 
  loading={loading} 
  checked={checked}
  onChange={handleLoadingChange}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Color Variants</h3>
          <p>Different color variants for different contexts.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch variant="primary" defaultChecked />
                <Switch variant="success" defaultChecked />
                <Switch variant="warning" defaultChecked />
                <Switch variant="danger" defaultChecked />
                <Switch variant="info" defaultChecked />
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch variant="primary" />
                <Switch variant="success" />
                <Switch variant="warning" />
                <Switch variant="danger" />
                <Switch variant="info" />
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Switch variant="primary" defaultChecked />
<Switch variant="success" defaultChecked />
<Switch variant="warning" defaultChecked />
<Switch variant="danger" defaultChecked />
<Switch variant="info" defaultChecked />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Controlled</h3>
          <p>Controlled component.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch 
                  checked={checked} 
                  onChange={setChecked}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
                <span>Current state: {checked ? 'ON' : 'OFF'}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setChecked(true)}
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '4px',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                >
                  Turn On
                </button>
                <button 
                  onClick={() => setChecked(false)}
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '4px',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                >
                  Turn Off
                </button>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`const [checked, setChecked] = useState(false);

<Switch 
  checked={checked} 
  onChange={setChecked}
  checkedChildren="ON"
  unCheckedChildren="OFF"
/>
<span>Current state: {checked ? 'ON' : 'OFF'}</span>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Form Integration</h3>
          <p>Switch works seamlessly with form components.</p>
          <div className="example-demo">
            <div style={{ maxWidth: '400px' }}>
              <FormItem label="Enable Notifications">
                <Switch defaultChecked />
              </FormItem>
              
              <FormItem label="Dark Mode">
                <Switch 
                  checkedChildren={<Sun size={12} />}
                  unCheckedChildren={<Moon size={12} />}
                />
              </FormItem>
              
              <FormItem label="Auto Save" help="Automatically save your work">
                <Switch variant="success" defaultChecked />
              </FormItem>
              
              <FormItem label="Maintenance Mode" help="This will disable the application">
                <Switch 
                  variant="danger" 
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
              </FormItem>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<FormItem label="Enable Notifications">
  <Switch defaultChecked />
</FormItem>

<FormItem label="Dark Mode">
  <Switch 
    checkedChildren={<Sun size={12} />}
    unCheckedChildren={<Moon size={12} />}
  />
</FormItem>

<FormItem label="Auto Save" help="Automatically save your work">
  <Switch variant="success" defaultChecked />
</FormItem>`}</pre>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        
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
              <td>autoFocus</td>
              <td>Whether get focus when component mounted</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>checked</td>
              <td>Determine whether the Switch is checked</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>checkedChildren</td>
              <td>The content to be shown when the state is checked</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>className</td>
              <td>The additional class to Switch</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>defaultChecked</td>
              <td>Whether to set the initial state</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Disable switch</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Loading state of switch</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>The size of the Switch</td>
              <td>small | medium | large</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>unCheckedChildren</td>
              <td>The content to be shown when the state is unchecked</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>variant</td>
              <td>Set Switch color variant</td>
              <td>primary | success | warning | danger | info</td>
              <td>primary</td>
              <td></td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>Trigger when the checked state is changing</td>
              <td>function(checked: boolean, event: Event)</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onClick</td>
              <td>Trigger when click occurs</td>
              <td>function(checked: boolean, event: Event)</td>
              <td>-</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>blur()</td>
              <td>Remove focus</td>
              <td></td>
            </tr>
            <tr>
              <td>focus()</td>
              <td>Get focus</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};