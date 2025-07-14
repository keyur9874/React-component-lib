import React from 'react';
import { Avatar } from './Avatar';

export const AvatarDocs: React.FC = () => {
  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Avatar</h1>
        <p>Avatars can be used to represent people or objects. It supports images, Icons, or letters.</p>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>Three sizes and two shapes are available.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar size="large">U</Avatar>
              <Avatar>U</Avatar>
              <Avatar size="small">U</Avatar>
              <Avatar size="large" shape="square">U</Avatar>
              <Avatar shape="square">U</Avatar>
              <Avatar size="small" shape="square">U</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar size="large">U</Avatar>
<Avatar>U</Avatar>
<Avatar size="small">U</Avatar>
<Avatar size="large" shape="square">U</Avatar>
<Avatar shape="square">U</Avatar>
<Avatar size="small" shape="square">U</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Type</h3>
          <p>Image, Icon and letter are supported, and the latter two kinds of avatar can have custom colors and background colors.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt="Profile"
              />
              <Avatar>U</Avatar>
              <Avatar>USER</Avatar>
              <Avatar 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt="Profile 2"
              />
              <Avatar>A</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar src="https://example.com/avatar.jpg" alt="Profile" />
<Avatar>U</Avatar>
<Avatar>USER</Avatar>
<Avatar>A</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Auto String</h3>
          <p>For letter type, when the letters are too long to display, the font size will be automatically adjusted according to the width of the avatar.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar size="large">John Doe</Avatar>
              <Avatar size="large">Jane Smith</Avatar>
              <Avatar size="large">Bob Johnson</Avatar>
              <Avatar size="large">Alice Brown</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar size="large">John Doe</Avatar>
<Avatar size="large">Jane Smith</Avatar>
<Avatar size="large">Bob Johnson</Avatar>
<Avatar size="large">Alice Brown</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Size</h3>
          <p>For letter type, when the letters are too long to display, a smaller font size will be used. Alternatively, you can use the size property to set a custom size.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar size="xlarge">Large</Avatar>
              <Avatar size="large">Large</Avatar>
              <Avatar>Default</Avatar>
              <Avatar size="small">Small</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar size="xlarge">Large</Avatar>
<Avatar size="large">Large</Avatar>
<Avatar>Default</Avatar>
<Avatar size="small">Small</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Clickable</h3>
          <p>Avatar can be clickable by adding onClick handler.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar onClick={() => alert('Avatar clicked!')}>Click</Avatar>
              <Avatar 
                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                onClick={() => alert('Profile clicked!')}
                alt="Clickable Profile"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar onClick={() => alert('Avatar clicked!')}>Click</Avatar>
<Avatar 
  src="https://example.com/avatar.jpg"
  onClick={() => alert('Profile clicked!')}
  alt="Clickable Profile"
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
              <td>alt</td>
              <td>This attribute defines the alternative text describing the image</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>shape</td>
              <td>The shape of avatar</td>
              <td>circle | square</td>
              <td>circle</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>The size of the avatar</td>
              <td>small | medium | large | xlarge</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>src</td>
              <td>The address of the image for an image avatar</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onClick</td>
              <td>Handler to handle click event</td>
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