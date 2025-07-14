import React, { useState } from 'react';
import { Badge } from './Badge';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';

export const BadgeDocs: React.FC = () => {
  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Badge</h1>
        <p>Small numerical value or status descriptor for UI elements.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <p>Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.</p>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>Simplest Usage. Badge will be hidden when count is 0, but we can use showZero to show it.</p>
          <div className="example-demo">
            <div className="badge-group">
              <Badge count={5}>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <Badge count={0} showZero>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Badge count={5}>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>
<Badge count={0} showZero>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Standalone</h3>
          <p>Used in standalone when children is empty.</p>
          <div className="example-demo">
            <div className="badge-group">
              <Badge count={25} />
              <Badge count={4} variant="primary" />
              <Badge count={109} variant="danger" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Badge count={25} />
<Badge count={4} variant="primary" />
<Badge count={109} variant="danger" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Red badge</h3>
          <p>This will simply display a red badge, without a specific count. If count equals 0, it won't display the dot.</p>
          <div className="example-demo">
            <div className="badge-group">
              <Badge dot>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <Badge dot variant="success">
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <Badge dot variant="warning">
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <Badge dot variant="danger">
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Badge dot>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>
<Badge dot variant="success">
  <Avatar shape="square" size="large">A</Avatar>
</Badge>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Dynamic</h3>
          <p>The count will be animated as it changes.</p>
          <div className="example-demo">
            <div className="badge-group">
              <Badge count={count}>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <div className="button-group">
                <Button size="small" onClick={() => setCount(Math.max(0, count - 1))}>
                  -
                </Button>
                <Button size="small" onClick={() => setCount(count + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`const [count, setCount] = useState(5);

<Badge count={count}>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>
<Button onClick={() => setCount(count - 1)}>-</Button>
<Button onClick={() => setCount(count + 1)}>+</Button>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Status</h3>
          <p>Standalone badge with status.</p>
          <div className="example-demo">
            <div className="badge-group">
              <Badge variant="success" status>Success</Badge>
              <Badge variant="danger" status>Error</Badge>
              <Badge variant="secondary" status>Default</Badge>
              <Badge variant="primary" status>Processing</Badge>
              <Badge variant="warning" status>Warning</Badge>
              <Badge variant="info" status>Info</Badge>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Badge variant="success" status>Success</Badge>
<Badge variant="danger" status>Error</Badge>
<Badge variant="secondary" status>Default</Badge>
<Badge variant="primary" status>Processing</Badge>
<Badge variant="warning" status>Warning</Badge>
<Badge variant="info" status>Info</Badge>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Size</h3>
          <p>Set size of numeral Badge.</p>
          <div className="example-demo">
            <div className="badge-group">
              <Badge size="small" count={5}>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <Badge count={5}>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
              <Badge size="large" count={5}>
                <Avatar shape="square" size="large">A</Avatar>
              </Badge>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Badge size="small" count={5}>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>
<Badge count={5}>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>
<Badge size="large" count={5}>
  <Avatar shape="square" size="large">A</Avatar>
</Badge>`}</pre>
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
              <td>count</td>
              <td>Number to show in badge</td>
              <td>number</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>dot</td>
              <td>Whether to display a red dot instead of count</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>showZero</td>
              <td>Whether to show badge when count is zero</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>status</td>
              <td>Set Badge as status tag</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>If count is shown, size sets the size of badge</td>
              <td>small | medium | large</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>variant</td>
              <td>Set Badge color</td>
              <td>primary | secondary | success | warning | danger | info</td>
              <td>primary</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};