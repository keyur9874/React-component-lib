import React from 'react';
import { Avatar } from './Avatar';
import { User, Settings, Heart, Star, Crown } from 'lucide-react';

export const AvatarDocs: React.FC = () => {
  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Avatar</h1>
        <p>Avatars can be used to represent people or objects. It supports images, icons, or letters with automatic color generation and smart text scaling.</p>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>Four sizes and two shapes are available.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar size="xlarge">XL</Avatar>
              <Avatar size="large">L</Avatar>
              <Avatar size="medium">M</Avatar>
              <Avatar size="small">S</Avatar>
              <Avatar size="large" shape="square">SQ</Avatar>
              <Avatar shape="square">SQ</Avatar>
              <Avatar size="small" shape="square">SQ</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar size="xlarge">XL</Avatar>
<Avatar size="large">L</Avatar>
<Avatar size="medium">M</Avatar>
<Avatar size="small">S</Avatar>
<Avatar size="large" shape="square">SQ</Avatar>
<Avatar shape="square">SQ</Avatar>
<Avatar size="small" shape="square">SQ</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Type</h3>
          <p>Image, Icon and letter are supported with automatic fallbacks and loading states.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt="Profile"
              />
              <Avatar icon={<User />} />
              <Avatar icon={<Settings />} />
              <Avatar>John Doe</Avatar>
              <Avatar>A</Avatar>
              <Avatar 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt="Profile 2"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar src="https://example.com/avatar.jpg" alt="Profile" />
<Avatar icon={<User />} />
<Avatar icon={<Settings />} />
<Avatar>John Doe</Avatar>
<Avatar>A</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Auto String & Color Generation</h3>
          <p>For letter type, initials are automatically generated with consistent colors based on the name. Text automatically scales to fit.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar size="large">John Doe</Avatar>
              <Avatar size="large">Jane Smith</Avatar>
              <Avatar size="large">Bob Johnson</Avatar>
              <Avatar size="large">Alice Brown</Avatar>
              <Avatar size="large">Michael Wilson</Avatar>
              <Avatar size="large">Sarah Davis</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar size="large">John Doe</Avatar>
<Avatar size="large">Jane Smith</Avatar>
<Avatar size="large">Bob Johnson</Avatar>
<Avatar size="large">Alice Brown</Avatar>
<Avatar size="large">Michael Wilson</Avatar>
<Avatar size="large">Sarah Davis</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Custom Size</h3>
          <p>You can set a custom size using a number value in pixels.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar size={100}>100px</Avatar>
              <Avatar size={64}>64px</Avatar>
              <Avatar size={48}>48px</Avatar>
              <Avatar size={32}>32px</Avatar>
              <Avatar size={24}>24px</Avatar>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar size={100}>100px</Avatar>
<Avatar size={64}>64px</Avatar>
<Avatar size={48}>48px</Avatar>
<Avatar size={32}>32px</Avatar>
<Avatar size={24}>24px</Avatar>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>With Icons</h3>
          <p>Custom icons can be used instead of text or images. Icons automatically scale with avatar size.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar icon={<User />} size="small" />
              <Avatar icon={<User />} />
              <Avatar icon={<Settings />} size="large" />
              <Avatar icon={<Heart />} size="xlarge" />
              <Avatar icon={<Star />} shape="square" />
              <Avatar icon={<Crown />} size={64} shape="square" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar icon={<User />} size="small" />
<Avatar icon={<User />} />
<Avatar icon={<Settings />} size="large" />
<Avatar icon={<Heart />} size="xlarge" />
<Avatar icon={<Star />} shape="square" />
<Avatar icon={<Crown />} size={64} shape="square" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Clickable</h3>
          <p>Avatar can be clickable with hover effects and keyboard navigation.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar onClick={() => alert('Avatar clicked!')}>Click</Avatar>
              <Avatar 
                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                onClick={() => alert('Profile clicked!')}
                alt="Clickable Profile"
              />
              <Avatar 
                icon={<Settings />}
                onClick={() => alert('Settings clicked!')}
                size="large"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar onClick={() => alert('Avatar clicked!')}>Click</Avatar>
<Avatar 
  src="https://example.com/avatar.jpg"
  onClick={() => alert('Profile clicked!')}
  alt="Clickable Profile"
/>
<Avatar 
  icon={<Settings />}
  onClick={() => alert('Settings clicked!')}
  size="large"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Error Handling</h3>
          <p>Avatar gracefully handles image loading errors with fallbacks.</p>
          <div className="example-demo">
            <div className="avatar-group">
              <Avatar 
                src="https://invalid-url.com/image.jpg"
                onError={() => console.log('Image failed to load')}
              >
                Fallback
              </Avatar>
              <Avatar 
                src="https://invalid-url.com/image.jpg"
                icon={<User />}
              />
              <Avatar 
                src="https://invalid-url.com/image.jpg"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Avatar 
  src="https://invalid-url.com/image.jpg"
  onError={() => console.log('Image failed to load')}
>
  Fallback
</Avatar>
<Avatar 
  src="https://invalid-url.com/image.jpg"
  icon={<User />}
/>
<Avatar 
  src="https://invalid-url.com/image.jpg"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Avatar Group</h3>
          <p>Multiple avatars can be grouped together with overlapping effect.</p>
          <div className="example-demo">
            <div className="ui-avatar-group">
              <Avatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
              <Avatar>JS</Avatar>
              <Avatar src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
              <Avatar>AB</Avatar>
              <Avatar icon={<User />} />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<div className="ui-avatar-group">
  <Avatar src="https://example.com/user1.jpg" />
  <Avatar>JS</Avatar>
  <Avatar src="https://example.com/user2.jpg" />
  <Avatar>AB</Avatar>
  <Avatar icon={<User />} />
</div>`}</pre>
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
              <td>crossOrigin</td>
              <td>CORS settings attributes</td>
              <td>anonymous | use-credentials | ''</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>draggable</td>
              <td>Whether the image is draggable</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>gap</td>
              <td>Letter spacing for text avatars</td>
              <td>number</td>
              <td>4</td>
              <td></td>
            </tr>
            <tr>
              <td>icon</td>
              <td>Custom icon to be used in avatar</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Image loading strategy</td>
              <td>eager | lazy</td>
              <td>lazy</td>
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
              <td>small | medium | large | xlarge | number</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>sizes</td>
              <td>A list of source sizes</td>
              <td>string</td>
              <td>-</td>
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
              <td>srcSet</td>
              <td>A list of sources to use for different screen resolutions</td>
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
            <tr>
              <td>onError</td>
              <td>Handler when img load error</td>
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