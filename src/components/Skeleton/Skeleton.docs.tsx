import React, { useState } from 'react';
import { 
  Skeleton, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonInput, 
  SkeletonImage, 
  SkeletonNode 
} from './Skeleton';
import { Switch } from '../Switch/Switch';
import { FormItem } from '../Form';

export const SkeletonDocs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Skeleton</h1>
        <p>Provide a placeholder while you wait for content to load, or to visualize content that doesn't exist yet.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When a resource needs long time to load.</li>
          <li>When the component contains lots of information, such as List or Card.</li>
          <li>Only works when loading is true or when used to occupy space.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>Simplest Skeleton usage.</p>
          <div className="example-demo">
            <Skeleton />
          </div>
          <div className="example-code">
            <pre>{`<Skeleton />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Complex combination</h3>
          <p>Complex combination with avatar and multiple paragraphs.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Skeleton avatar paragraph={{ rows: 4 }} />
              <Skeleton avatar={{ size: 'large', shape: 'square' }} paragraph={{ rows: 2 }} />
              <Skeleton avatar={{ size: 'small' }} title={false} paragraph={{ rows: 3 }} />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Skeleton avatar paragraph={{ rows: 4 }} />
<Skeleton avatar={{ size: 'large', shape: 'square' }} paragraph={{ rows: 2 }} />
<Skeleton avatar={{ size: 'small' }} title={false} paragraph={{ rows: 3 }} />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Active Animation</h3>
          <p>Display active animation.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <FormItem label="Active Animation">
                  <Switch checked={active} onChange={setActive} />
                </FormItem>
              </div>
              <Skeleton avatar active={active} paragraph={{ rows: 2 }} />
              <Skeleton avatar={{ size: 'large' }} active={active} paragraph={{ rows: 3 }} />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Skeleton avatar active={active} paragraph={{ rows: 2 }} />
<Skeleton avatar={{ size: 'large' }} active={active} paragraph={{ rows: 3 }} />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Contains sub component</h3>
          <p>Skeleton contains sub components.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <FormItem label="Show Loading">
                  <Switch checked={loading} onChange={setLoading} />
                </FormItem>
              </div>
              
              <Skeleton loading={loading}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '16px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-color)'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    JD
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', color: 'var(--text-color)' }}>John Doe</h3>
                    <p style={{ margin: '0', color: 'var(--text-secondary)' }}>Software Engineer at Tech Corp</p>
                  </div>
                </div>
              </Skeleton>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Skeleton loading={loading}>
  <div className="user-card">
    <Avatar src="/user.jpg" size="large" />
    <div>
      <h3>John Doe</h3>
      <p>Software Engineer at Tech Corp</p>
    </div>
  </div>
</Skeleton>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Avatar Variants</h3>
          <p>Different avatar configurations.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <SkeletonAvatar size="small" />
                <SkeletonAvatar size="medium" />
                <SkeletonAvatar size="large" />
                <SkeletonAvatar size="xlarge" />
              </div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <SkeletonAvatar shape="circle" />
                <SkeletonAvatar shape="square" />
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<SkeletonAvatar size="small" />
<SkeletonAvatar size="medium" />
<SkeletonAvatar size="large" />
<SkeletonAvatar size="xlarge" />

<SkeletonAvatar shape="circle" />
<SkeletonAvatar shape="square" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Button and Input</h3>
          <p>Button and Input skeleton.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <SkeletonButton size="small" />
                <SkeletonButton size="medium" />
                <SkeletonButton size="large" />
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <SkeletonButton shape="circle" />
                <SkeletonButton shape="round" />
                <SkeletonButton shape="default" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SkeletonInput size="small" />
                <SkeletonInput size="medium" />
                <SkeletonInput size="large" />
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<SkeletonButton size="small" />
<SkeletonButton size="medium" />
<SkeletonButton size="large" />

<SkeletonButton shape="circle" />
<SkeletonButton shape="round" />

<SkeletonInput size="small" />
<SkeletonInput size="medium" />
<SkeletonInput size="large" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Image Skeleton</h3>
          <p>Image placeholder with different sizes.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <SkeletonImage size="small" />
                <SkeletonImage size="medium" />
                <SkeletonImage size="large" />
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<SkeletonImage size="small" />
<SkeletonImage size="medium" />
<SkeletonImage size="large" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>List Skeleton</h3>
          <p>Use SkeletonNode for list items.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SkeletonNode />
              <SkeletonNode />
              <SkeletonNode />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<SkeletonNode />
<SkeletonNode />
<SkeletonNode />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Card Skeleton</h3>
          <p>Complete card layout with image, avatar, and content.</p>
          <div className="example-demo">
            <div className="ui-skeleton-card">
              <div className="ui-skeleton-card-header">
                <SkeletonAvatar size="medium" className="ui-skeleton-card-avatar" />
                <div className="ui-skeleton-element ui-skeleton-card-title ui-skeleton-element--active" />
              </div>
              <SkeletonImage className="ui-skeleton-card-image" />
              <div className="ui-skeleton-card-content">
                <div className="ui-skeleton-element ui-skeleton-card-line ui-skeleton-element--active" />
                <div className="ui-skeleton-element ui-skeleton-card-line ui-skeleton-element--active" />
                <div className="ui-skeleton-element ui-skeleton-card-line ui-skeleton-element--active" />
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<div className="ui-skeleton-card">
  <div className="ui-skeleton-card-header">
    <SkeletonAvatar size="medium" />
    <div className="ui-skeleton-card-title" />
  </div>
  <SkeletonImage className="ui-skeleton-card-image" />
  <div className="ui-skeleton-card-content">
    <div className="ui-skeleton-card-line" />
    <div className="ui-skeleton-card-line" />
    <div className="ui-skeleton-card-line" />
  </div>
</div>`}</pre>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        
        <h3>Skeleton</h3>
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
              <td>active</td>
              <td>Show animation effect</td>
              <td>boolean</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>avatar</td>
              <td>Show avatar placeholder or avatar configuration</td>
              <td>boolean | {`{ size?: 'small' | 'medium' | 'large' | 'xlarge', shape?: 'circle' | 'square', active?: boolean, className?: string, style?: CSSProperties }`}</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Display the skeleton when true</td>
              <td>boolean</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>paragraph</td>
              <td>Show paragraph placeholder or paragraph configuration</td>
              <td>boolean | {`{ rows?: number, width?: number | string | Array<number | string> }`}</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>round</td>
              <td>Show skeleton element with round corner</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>Set the size of skeleton</td>
              <td>small | medium | large</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>title</td>
              <td>Show title placeholder or title configuration</td>
              <td>boolean | {`{ width?: number | string }`}</td>
              <td>true</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <h3>SkeletonAvatar</h3>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>active</td>
              <td>Show animation effect</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>shape</td>
              <td>Set the shape of avatar</td>
              <td>circle | square</td>
              <td>circle</td>
            </tr>
            <tr>
              <td>size</td>
              <td>Set the size of avatar</td>
              <td>small | medium | large | xlarge</td>
              <td>medium</td>
            </tr>
          </tbody>
        </table>

        <h3>SkeletonButton</h3>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>active</td>
              <td>Show animation effect</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>shape</td>
              <td>Set the shape of button</td>
              <td>default | circle | round</td>
              <td>default</td>
            </tr>
            <tr>
              <td>size</td>
              <td>Set the size of button</td>
              <td>small | medium | large</td>
              <td>medium</td>
            </tr>
          </tbody>
        </table>

        <h3>SkeletonInput</h3>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>active</td>
              <td>Show animation effect</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>size</td>
              <td>Set the size of input</td>
              <td>small | medium | large</td>
              <td>medium</td>
            </tr>
          </tbody>
        </table>

        <h3>SkeletonImage</h3>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>active</td>
              <td>Show animation effect</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>Set the size of image</td>
              <td>small | medium | large</td>
              <td>medium</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>Design Guidelines</h2>
        
        <h3>Usage Principles</h3>
        <ul>
          <li><strong>Predictable:</strong> Use skeleton shapes that match the final content layout</li>
          <li><strong>Contextual:</strong> Show skeleton only during actual loading states</li>
          <li><strong>Consistent:</strong> Use consistent skeleton patterns across your application</li>
          <li><strong>Performance:</strong> Use skeleton to improve perceived performance</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Match skeleton structure to actual content layout</li>
          <li>Use appropriate animation timing (not too fast, not too slow)</li>
          <li>Consider using different skeleton variants for different content types</li>
          <li>Don't show skeleton for very short loading times (&lt;200ms)</li>
          <li>Use skeleton for initial page loads and data fetching</li>
          <li>Combine with actual loading indicators for long operations</li>
        </ul>

        <h3>Accessibility</h3>
        <ul>
          <li>Skeleton elements include proper ARIA labels and roles</li>
          <li>Loading state is announced to screen readers</li>
          <li>Animation can be disabled for users with motion sensitivity</li>
          <li>High contrast mode support for better visibility</li>
          <li>Proper semantic structure for content hierarchy</li>
        </ul>
      </div>
    </div>
  );
};