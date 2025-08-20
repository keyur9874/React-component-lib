import React, { useState } from 'react';
import { Alert } from './Alert';
import { 
  Heart, 
  Download, 
  ExternalLink, 
  RefreshCw,
  Settings,
  Bell,
  Shield,
  Zap
} from 'lucide-react';

export const AlertDocs: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [showCustomAlert, setShowCustomAlert] = useState(true);

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Alert</h1>
        <p>Alert component for feedback. Display important messages and notifications to users.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you need to show alert messages to users.</li>
          <li>When you need a persistent static container which is closable by user actions.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>The simplest usage for short messages.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert message="Info Text" />
              <Alert message="Success Text" type="success" />
              <Alert message="Warning Text" type="warning" />
              <Alert message="Error Text" type="error" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert message="Info Text" />
<Alert message="Success Text" type="success" />
<Alert message="Warning Text" type="warning" />
<Alert message="Error Text" type="error" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Closable</h3>
          <p>Closable alert with close button.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert
                message="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
                type="warning"
                closable
              />
              <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description"
                type="error"
                closable
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert
  message="Warning Text"
  type="warning"
  closable
/>
<Alert
  message="Error Text"
  description="Error Description"
  type="error"
  closable
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Description</h3>
          <p>Additional description for the alert message.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert
                message="Info Text"
                description="Info Description Info Description Info Description Info Description"
                type="info"
              />
              <Alert
                message="Success Text"
                description="Success Description Success Description Success Description Success Description"
                type="success"
              />
              <Alert
                message="Warning Text"
                description="Warning Description Warning Description Warning Description Warning Description"
                type="warning"
              />
              <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description"
                type="error"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert
  message="Info Text"
  description="Info Description"
  type="info"
/>
<Alert
  message="Success Text"
  description="Success Description"
  type="success"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Icon</h3>
          <p>A relevant icon makes the alert more friendly.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert message="Success Tips" type="success" showIcon />
              <Alert message="Informational Notes" type="info" showIcon />
              <Alert message="Warning" type="warning" showIcon />
              <Alert message="Error" type="error" showIcon />
              <Alert
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
              />
              <Alert
                message="Informational Notes"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
              />
              <Alert
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
              />
              <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert message="Success Tips" type="success" showIcon />
<Alert
  message="Success Tips"
  description="Detailed description and advice about successful copywriting."
  type="success"
  showIcon
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Custom Icon</h3>
          <p>Replace the default icon with a custom one.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert
                message="Custom Icon"
                type="info"
                showIcon
                icon={<Heart size={16} />}
              />
              <Alert
                message="Download Complete"
                description="Your file has been downloaded successfully."
                type="success"
                showIcon
                icon={<Download size={24} />}
              />
              <Alert
                message="System Update"
                description="A new system update is available. Click to learn more."
                type="warning"
                showIcon
                icon={<RefreshCw size={24} />}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert
  message="Custom Icon"
  type="info"
  showIcon
  icon={<Heart size={16} />}
/>
<Alert
  message="Download Complete"
  description="Your file has been downloaded successfully."
  type="success"
  showIcon
  icon={<Download size={24} />}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Outlined</h3>
          <p>Outlined style for a cleaner look.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert message="Info Text" type="info" outlined showIcon />
              <Alert message="Success Text" type="success" outlined showIcon />
              <Alert message="Warning Text" type="warning" outlined showIcon />
              <Alert message="Error Text" type="error" outlined showIcon />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert message="Info Text" type="info" outlined showIcon />
<Alert message="Success Text" type="success" outlined showIcon />
<Alert message="Warning Text" type="warning" outlined showIcon />
<Alert message="Error Text" type="error" outlined showIcon />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Banner</h3>
          <p>Display Alert as a banner at top of page.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <Alert
                message="Warning text"
                banner
                type="warning"
              />
              <Alert
                message="Very long warning text warning text text text text text text text"
                banner
                type="error"
                closable
              />
              <Alert
                message="Info text"
                banner
                type="info"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert
  message="Warning text"
  banner
  type="warning"
/>
<Alert
  message="Very long warning text"
  banner
  type="error"
  closable
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Action</h3>
          <p>Additional action buttons in the alert.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                action={
                  <button className="ui-alert-action">
                    UNDO
                  </button>
                }
                closable
              />
              <Alert
                message="Info Text"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
                action={
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
                      Accept
                    </button>
                    <button className="ui-alert-action">
                      Decline
                    </button>
                  </div>
                }
              />
              <Alert
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
                action={
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <a href="#" style={{ color: 'var(--warning-color)', textDecoration: 'none', fontSize: '12px' }}>
                      <ExternalLink size={12} style={{ marginRight: '4px' }} />
                      Detail
                    </a>
                  </div>
                }
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert
  message="Success Tips"
  type="success"
  showIcon
  action={
    <Button size="small" variant="ghost">
      UNDO
    </Button>
  }
  closable
/>
<Alert
  message="Info Text"
  description="Additional description and information."
  type="info"
  showIcon
  action={
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>Accept</button>
      <button className="ui-alert-action">Decline</button>
    </div>
  }
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Controlled</h3>
          <p>Control the visibility of the alert.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button 
                  className="ui-alert-action"
                  onClick={() => setShowAlert(true)}
                  disabled={showAlert}
                >
                  Show Alert
                </button>
                <button 
                  className="ui-alert-action"
                  onClick={() => setShowCustomAlert(true)}
                  disabled={showCustomAlert}
                >
                  Show Custom Alert
                </button>
              </div>
              
              {showAlert && (
                <Alert
                  message="Alert Message Text"
                  type="info"
                  closable
                  onClose={() => setShowAlert(false)}
                />
              )}
              
              {showCustomAlert && (
                <Alert
                  message="Custom Alert"
                  description="This alert has custom close behavior."
                  type="success"
                  showIcon
                  closable
                  onClose={() => setShowCustomAlert(false)}
                  afterClose={() => console.log('Alert closed!')}
                />
              )}
            </div>
          </div>
          <div className="example-code">
            <pre>{`const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert
    message="Alert Message Text"
    type="info"
    closable
    onClose={() => setShowAlert(false)}
  />
)}`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Real-world Examples</h3>
          <p>Common use cases for alerts in applications.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert
                message="Account Verification Required"
                description="Please check your email and click the verification link to activate your account."
                type="warning"
                showIcon
                icon={<Bell size={24} />}
                action={
                  <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
                    Resend Email
                  </button>
                }
                closable
              />
              
              <Alert
                message="Security Alert"
                description="We detected a new login from an unrecognized device. If this wasn't you, please secure your account immediately."
                type="error"
                showIcon
                icon={<Shield size={24} />}
                action={
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="ui-alert-action" style={{ backgroundColor: 'var(--danger-color)', color: 'white', borderColor: 'var(--danger-color)' }}>
                      Secure Account
                    </button>
                    <button className="ui-alert-action">
                      This was me
                    </button>
                  </div>
                }
              />
              
              <Alert
                message="Performance Optimization"
                description="Your app is running slower than usual. Enable performance mode to improve speed."
                type="info"
                showIcon
                icon={<Zap size={24} />}
                action={
                  <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
                    Enable
                  </button>
                }
                closable
              />
              
              <Alert
                message="Maintenance Scheduled"
                description="System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM EST. Some features may be unavailable."
                type="warning"
                showIcon
                icon={<Settings size={24} />}
                banner
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Alert
  message="Account Verification Required"
  description="Please check your email and click the verification link."
  type="warning"
  showIcon
  icon={<Bell size={24} />}
  action={
    <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
      Resend Email
    </button>
  }
  closable
/>`}</pre>
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
              <td>action</td>
              <td>The action of Alert</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>afterClose</td>
              <td>Called when close animation is finished</td>
              <td><code>() =&gt; void</code></td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>banner</td>
              <td>Whether to show as banner</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>closable</td>
              <td>Whether Alert can be closed</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>closeText</td>
              <td>Close text to show</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>description</td>
              <td>Additional content of Alert</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>icon</td>
              <td>Custom icon, effective when showIcon is true</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>message</td>
              <td>Content of Alert</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>outlined</td>
              <td>Whether to use outlined style</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>showIcon</td>
              <td>Whether to show icon</td>
              <td>boolean</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>type</td>
              <td>Type of Alert styles</td>
              <td>info | success | warning | error</td>
              <td>info</td>
              <td></td>
            </tr>
            <tr>
              <td>onClose</td>
              <td>Callback when Alert is closed</td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td>-</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>Design Guidelines</h2>
        
        <h3>Usage Principles</h3>
        <ul>
          <li><strong>Contextual:</strong> Use appropriate alert types (info, success, warning, error) based on the message context</li>
          <li><strong>Actionable:</strong> Include relevant actions when users can take steps to resolve or respond to the alert</li>
          <li><strong>Dismissible:</strong> Make alerts closable when they're not critical system messages</li>
          <li><strong>Clear:</strong> Write concise, clear messages that users can quickly understand</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use icons to help users quickly identify the alert type</li>
          <li>Keep messages concise but informative</li>
          <li>Use descriptions for additional context when needed</li>
          <li>Place alerts close to the relevant content or action</li>
          <li>Use banner style for system-wide notifications</li>
          <li>Provide clear actions when users need to respond</li>
        </ul>

        <h3>Accessibility</h3>
        <ul>
          <li>Alerts use proper ARIA roles and live regions</li>
          <li>Close buttons are keyboard accessible</li>
          <li>Color is not the only way to convey meaning (icons are used)</li>
          <li>Sufficient color contrast for all text</li>
          <li>Screen reader friendly content structure</li>
        </ul>
      </div>
    </div>
  );
};