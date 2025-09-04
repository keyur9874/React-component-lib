import React, { useState } from 'react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { 
  Settings, 
  User, 
  Bell, 
  Search,
  MoreHorizontal,
  Edit,
  Delete,
  Share,
  Download,
  Heart,
  Star,
  MessageCircle
} from 'lucide-react';

export const PopoverDocs: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);

  const content = (
    <div>
      <p>This is the content of the popover.</p>
      <p>It can contain any React elements.</p>
    </div>
  );

  const richContent = (
    <div style={{ width: '200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <User size={16} />
        <span style={{ fontWeight: '500' }}>User Profile</span>
      </div>
      <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)' }}>
        Manage your account settings and preferences.
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <button className="ui-alert-action" style={{ fontSize: '12px' }}>
          <Settings size={12} style={{ marginRight: '4px' }} />
          Settings
        </button>
        <button className="ui-alert-action" style={{ fontSize: '12px' }}>
          <Edit size={12} style={{ marginRight: '4px' }} />
          Edit
        </button>
      </div>
    </div>
  );

  const menuContent = (
    <div style={{ minWidth: '160px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 12px', 
          border: 'none', 
          background: 'transparent', 
          color: 'var(--text-color)', 
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '14px',
          width: '100%',
          textAlign: 'left'
        }}>
          <Edit size={14} />
          Edit
        </button>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 12px', 
          border: 'none', 
          background: 'transparent', 
          color: 'var(--text-color)', 
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '14px',
          width: '100%',
          textAlign: 'left'
        }}>
          <Share size={14} />
          Share
        </button>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 12px', 
          border: 'none', 
          background: 'transparent', 
          color: 'var(--text-color)', 
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '14px',
          width: '100%',
          textAlign: 'left'
        }}>
          <Download size={14} />
          Download
        </button>
        <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--border-light)' }} />
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 12px', 
          border: 'none', 
          background: 'transparent', 
          color: 'var(--danger-color)', 
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '14px',
          width: '100%',
          textAlign: 'left'
        }}>
          <Delete size={14} />
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Popover</h1>
        <p>The floating card popped by clicking or hovering. A simple popup component that can contain complex content and interactions.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you need to show rich content in a floating layer.</li>
          <li>When you need to provide additional information or actions without navigating away.</li>
          <li>When you need a more complex tooltip with interactive elements.</li>
          <li>When you need to display contextual menus or forms.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>The simplest usage. Tooltip will show on mouse enter and hide on mouse leave.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Popover content={content} title="Title">
                <Button>Hover me</Button>
              </Popover>
              
              <Popover content="This is a simple popover content">
                <Button variant="secondary">Simple Popover</Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`const content = (
  <div>
    <p>This is the content of the popover.</p>
    <p>It can contain any React elements.</p>
  </div>
);

<Popover content={content} title="Title">
  <Button>Hover me</Button>
</Popover>

<Popover content="This is a simple popover content">
  <Button variant="secondary">Simple Popover</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Three Ways to Trigger</h3>
          <p>Mouse to click, focus and mouse enter.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Popover content={content} title="Title" trigger="hover">
                <Button>Hover</Button>
              </Popover>
              
              <Popover content={content} title="Title" trigger="focus">
                <Button>Focus</Button>
              </Popover>
              
              <Popover content={content} title="Title" trigger="click">
                <Button>Click</Button>
              </Popover>
              
              <Popover content={content} title="Title" trigger="contextMenu">
                <Button>Right Click</Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Popover content={content} title="Title" trigger="hover">
  <Button>Hover</Button>
</Popover>

<Popover content={content} title="Title" trigger="focus">
  <Button>Focus</Button>
</Popover>

<Popover content={content} title="Title" trigger="click">
  <Button>Click</Button>
</Popover>

<Popover content={content} title="Title" trigger="contextMenu">
  <Button>Right Click</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Placement</h3>
          <p>There are 12 placement options available.</p>
          <div className="example-demo">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '600px' }}>
              {/* Top Row */}
              <Popover content={content} placement="topLeft">
                <Button size="small">TL</Button>
              </Popover>
              <Popover content={content} placement="top">
                <Button size="small">Top</Button>
              </Popover>
              <Popover content={content} placement="topRight">
                <Button size="small">TR</Button>
              </Popover>
              <div></div>
              
              {/* Left Column */}
              <Popover content={content} placement="leftTop">
                <Button size="small">LT</Button>
              </Popover>
              <div></div>
              <div></div>
              <Popover content={content} placement="rightTop">
                <Button size="small">RT</Button>
              </Popover>
              
              {/* Middle Row */}
              <Popover content={content} placement="left">
                <Button size="small">Left</Button>
              </Popover>
              <div></div>
              <div></div>
              <Popover content={content} placement="right">
                <Button size="small">Right</Button>
              </Popover>
              
              {/* Right Column */}
              <Popover content={content} placement="leftBottom">
                <Button size="small">LB</Button>
              </Popover>
              <div></div>
              <div></div>
              <Popover content={content} placement="rightBottom">
                <Button size="small">RB</Button>
              </Popover>
              
              {/* Bottom Row */}
              <div></div>
              <Popover content={content} placement="bottomLeft">
                <Button size="small">BL</Button>
              </Popover>
              <Popover content={content} placement="bottom">
                <Button size="small">Bottom</Button>
              </Popover>
              <Popover content={content} placement="bottomRight">
                <Button size="small">BR</Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Popover content={content} placement="topLeft">
  <Button>TL</Button>
</Popover>
<Popover content={content} placement="top">
  <Button>Top</Button>
</Popover>
<Popover content={content} placement="topRight">
  <Button>TR</Button>
</Popover>
// ... more placements`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Arrow</h3>
          <p>Show or hide arrow. You can also change the arrow to point at the center of the target.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Popover content={content} title="Title" arrow={true}>
                <Button>With Arrow</Button>
              </Popover>
              
              <Popover content={content} title="Title" arrow={false}>
                <Button>No Arrow</Button>
              </Popover>
              
              <Popover content={content} title="Title" arrow={{ pointAtCenter: true }}>
                <Button>Point at Center</Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Popover content={content} title="Title" arrow={true}>
  <Button>With Arrow</Button>
</Popover>

<Popover content={content} title="Title" arrow={false}>
  <Button>No Arrow</Button>
</Popover>

<Popover content={content} title="Title" arrow={{ pointAtCenter: true }}>
  <Button>Point at Center</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Controlling the Close</h3>
          <p>Use open prop to control the display of the popover.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Popover
                content={
                  <div>
                    <p>This popover is controlled.</p>
                    <button 
                      onClick={() => setOpen(false)}
                      style={{ 
                        padding: '4px 8px', 
                        border: '1px solid var(--primary-color)', 
                        borderRadius: '4px',
                        background: 'var(--primary-color)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Close
                    </button>
                  </div>
                }
                title="Controlled Popover"
                trigger="click"
                open={open}
                onOpenChange={setOpen}
              >
                <Button>Controlled Popover</Button>
              </Popover>
              
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? 'Close' : 'Open'} Popover
              </Button>
            </div>
          </div>
          <div className="example-code">
            <pre>{`const [open, setOpen] = useState(false);

<Popover
  content={
    <div>
      <p>This popover is controlled.</p>
      <Button size="small" onClick={() => setOpen(false)}>
        Close
      </Button>
    </div>
  }
  title="Controlled Popover"
  trigger="click"
  open={open}
  onOpenChange={setOpen}
>
  <Button>Controlled Popover</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Rich Content</h3>
          <p>Popover can contain rich content including forms, lists, and interactive elements.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Popover content={richContent} trigger="click">
                <Button>
                  <User size={16} style={{ marginRight: '8px' }} />
                  User Menu
                </Button>
              </Popover>
              
              <Popover content={menuContent} trigger="click" title="Actions">
                <Button variant="secondary">
                  <MoreHorizontal size={16} />
                </Button>
              </Popover>
              
              <Popover 
                content={
                  <div style={{ width: '250px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                        Search
                      </label>
                      <input 
                        type="text" 
                        placeholder="Type to search..."
                        style={{ 
                          width: '100%', 
                          padding: '8px 12px', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '4px',
                          fontSize: '14px',
                          background: 'var(--bg-color)',
                          color: 'var(--text-color)'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button className="ui-alert-action" style={{ fontSize: '12px' }}>
                        Cancel
                      </button>
                      <button className="ui-alert-action" style={{ 
                        fontSize: '12px',
                        backgroundColor: 'var(--primary-color)', 
                        color: 'white', 
                        borderColor: 'var(--primary-color)' 
                      }}>
                        Search
                      </button>
                    </div>
                  </div>
                }
                title="Advanced Search"
                trigger="click"
              >
                <Button variant="secondary">
                  <Search size={16} style={{ marginRight: '8px' }} />
                  Search
                </Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`const richContent = (
  <div style={{ width: '200px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <User size={16} />
      <span style={{ fontWeight: '500' }}>User Profile</span>
    </div>
    <p>Manage your account settings and preferences.</p>
    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
      <Button size="small">Settings</Button>
      <Button size="small">Edit</Button>
    </div>
  </div>
);

<Popover content={richContent} trigger="click">
  <Button>User Menu</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Custom Background</h3>
          <p>Customize the background color of the popover.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Popover 
                content="This popover has a custom background color"
                color="#f6ffed"
                title="Custom Background"
              >
                <Button variant="secondary">Green Background</Button>
              </Popover>
              
              <Popover 
                content="Dark themed popover content"
                color="#001529"
                title={<span style={{ color: 'white' }}>Dark Theme</span>}
              >
                <Button variant="secondary">Dark Background</Button>
              </Popover>
              
              <Popover 
                content={<span style={{ color: 'white' }}>Warning themed content</span>}
                color="#faad14"
                title={<span style={{ color: 'white' }}>Warning</span>}
              >
                <Button variant="secondary">Warning Background</Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Popover 
  content="This popover has a custom background color"
  color="#f6ffed"
  title="Custom Background"
>
  <Button>Green Background</Button>
</Popover>

<Popover 
  content="Dark themed popover content"
  color="#001529"
  title={<span style={{ color: 'white' }}>Dark Theme</span>}
>
  <Button>Dark Background</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Delay</h3>
          <p>Control the delay of showing and hiding.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Popover 
                content="Fast response popover"
                title="Fast"
                mouseEnterDelay={0}
                mouseLeaveDelay={0}
              >
                <Button>Fast (0s)</Button>
              </Popover>
              
              <Popover 
                content="Normal response popover"
                title="Normal"
                mouseEnterDelay={0.1}
                mouseLeaveDelay={0.1}
              >
                <Button>Normal (0.1s)</Button>
              </Popover>
              
              <Popover 
                content="Slow response popover"
                title="Slow"
                mouseEnterDelay={0.5}
                mouseLeaveDelay={0.5}
              >
                <Button>Slow (0.5s)</Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Popover 
  content="Fast response popover"
  title="Fast"
  mouseEnterDelay={0}
  mouseLeaveDelay={0}
>
  <Button>Fast (0s)</Button>
</Popover>

<Popover 
  content="Slow response popover"
  title="Slow"
  mouseEnterDelay={0.5}
  mouseLeaveDelay={0.5}
>
  <Button>Slow (0.5s)</Button>
</Popover>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Real-world Examples</h3>
          <p>Common use cases for popovers in applications.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* User Profile Popover */}
              <Popover 
                content={
                  <div style={{ width: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        background: 'var(--primary-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600'
                      }}>
                        JD
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>John Doe</div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>john.doe@example.com</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 12px', 
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--text-color)', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        textAlign: 'left'
                      }}>
                        <User size={14} />
                        Profile Settings
                      </button>
                      <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 12px', 
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--text-color)', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        textAlign: 'left'
                      }}>
                        <Bell size={14} />
                        Notifications
                      </button>
                      <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 12px', 
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--text-color)', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        textAlign: 'left'
                      }}>
                        <Settings size={14} />
                        Account Settings
                      </button>
                    </div>
                  </div>
                }
                trigger="click"
                placement="bottomLeft"
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  background: 'var(--bg-color)',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    JD
                  </div>
                  <span style={{ fontSize: '14px' }}>John Doe</span>
                </div>
              </Popover>

              {/* Action Menu */}
              <Popover 
                content={
                  <div style={{ minWidth: '180px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 12px', 
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--text-color)', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        textAlign: 'left'
                      }}>
                        <Heart size={14} />
                        Add to Favorites
                      </button>
                      <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 12px', 
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--text-color)', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        textAlign: 'left'
                      }}>
                        <Star size={14} />
                        Rate this item
                      </button>
                      <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 12px', 
                        border: 'none', 
                        background: 'transparent', 
                        color: 'var(--text-color)', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '14px',
                        width: '100%',
                        textAlign: 'left'
                      }}>
                        <MessageCircle size={14} />
                        Leave feedback
                      </button>
                    </div>
                  </div>
                }
                trigger="click"
                placement="bottomRight"
              >
                <Button variant="ghost">
                  <MoreHorizontal size={16} />
                </Button>
              </Popover>

              {/* Notification Popover */}
              <Popover 
                content={
                  <div style={{ width: '300px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontWeight: '500', marginBottom: '8px' }}>Recent Notifications</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ padding: '8px', background: 'var(--bg-hover)', borderRadius: '4px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '2px' }}>New message received</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>2 minutes ago</div>
                        </div>
                        <div style={{ padding: '8px', background: 'var(--bg-hover)', borderRadius: '4px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '2px' }}>Task completed</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>1 hour ago</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button className="ui-alert-action" style={{ 
                        fontSize: '12px',
                        backgroundColor: 'var(--primary-color)', 
                        color: 'white', 
                        borderColor: 'var(--primary-color)' 
                      }}>
                        View All
                      </button>
                    </div>
                  </div>
                }
                trigger="click"
                placement="bottomRight"
              >
                <Button variant="ghost">
                  <Bell size={16} />
                </Button>
              </Popover>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// User Profile Popover
<Popover 
  content={userProfileContent}
  trigger="click"
  placement="bottomLeft"
>
  <div className="user-avatar">
    <Avatar>JD</Avatar>
    <span>John Doe</span>
  </div>
</Popover>

// Action Menu
<Popover 
  content={actionMenuContent}
  trigger="click"
  placement="bottomRight"
>
  <Button variant="ghost">
    <MoreHorizontal size={16} />
  </Button>
</Popover>`}</pre>
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
              <td>align</td>
              <td>Please refer to the settings dom-align</td>
              <td>object</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>arrow</td>
              <td>Change arrow's visible state and change whether the arrow is pointed at the center of target</td>
              <td>boolean | {'{ pointAtCenter: boolean }'}</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>autoAdjustOverflow</td>
              <td>Whether to adjust popup placement automatically when popup is off screen</td>
              <td>boolean</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>color</td>
              <td>The background color</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>content</td>
              <td>Content of the popover</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>defaultOpen</td>
              <td>Whether the floating popover card is open by default</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>destroyOnHidden</td>
              <td>Whether destroy dom when close</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>fresh</td>
              <td>Popover will cache content when it is closed by default. Setting this property will always keep updating</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>getPopupContainer</td>
              <td>The DOM container of the tip, the default behavior is to create a div element in body</td>
              <td>{'(triggerNode: HTMLElement) => HTMLElement'}</td>
              <td>{'() => document.body'}</td>
              <td></td>
            </tr>
            <tr>
              <td>mouseEnterDelay</td>
              <td>Delay in seconds, before popover is shown on mouse enter</td>
              <td>number</td>
              <td>0.1</td>
              <td></td>
            </tr>
            <tr>
              <td>mouseLeaveDelay</td>
              <td>Delay in seconds, before popover is hidden on mouse leave</td>
              <td>number</td>
              <td>0.1</td>
              <td></td>
            </tr>
            <tr>
              <td>open</td>
              <td>Whether the floating popover card is open or not</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>placement</td>
              <td>The position of the popover relative to the target</td>
              <td>top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom</td>
              <td>top</td>
              <td></td>
            </tr>
            <tr>
              <td>title</td>
              <td>Title of the popover</td>
              <td>ReactNode</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>trigger</td>
              <td>Popover trigger mode. Could be multiple by passing an array</td>
              <td>hover | focus | click | contextMenu | Array&lt;string&gt;</td>
              <td>hover</td>
              <td></td>
            </tr>
            <tr>
              <td>zIndex</td>
              <td>Config z-index of Popover</td>
              <td>number</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onOpenChange</td>
              <td>Callback executed when visibility of the popover card is changed</td>
              <td>{'(open: boolean) => void'}</td>
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
          <li><strong>Contextual:</strong> Use popovers to provide additional context or actions related to the trigger element</li>
          <li><strong>Non-blocking:</strong> Popovers should enhance the experience without blocking the main workflow</li>
          <li><strong>Dismissible:</strong> Always provide clear ways to close the popover (click outside, escape key, close button)</li>
          <li><strong>Responsive:</strong> Ensure popovers work well on all screen sizes and adjust positioning automatically</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use appropriate trigger methods based on the content type (hover for info, click for actions)</li>
          <li>Keep content concise and focused on the specific context</li>
          <li>Use proper placement to avoid covering important content</li>
          <li>Include titles for complex popovers to provide clear context</li>
          <li>Use consistent styling and spacing within popover content</li>
          <li>Provide keyboard navigation for interactive elements</li>
        </ul>

        <h3>Accessibility</h3>
        <ul>
          <li>Popovers use proper ARIA roles and attributes</li>
          <li>Keyboard navigation is fully supported</li>
          <li>Focus management ensures proper tab order</li>
          <li>Screen reader compatible with proper announcements</li>
          <li>High contrast mode support</li>
          <li>Escape key closes popovers for better UX</li>
        </ul>
      </div>
    </div>
  );
};