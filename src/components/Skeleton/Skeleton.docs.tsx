import React, { useState } from 'react';
import { 
  Skeleton, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonInput, 
  SkeletonImage, 
  SkeletonNode 
} from './Skeleton';
import { Switch } from '../Switch';
import { FormItem } from '../Form';
import { 
  User, 
  Star, 
  Heart, 
  MessageCircle, 
  Share2,
  MoreHorizontal,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

export const SkeletonDocs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);

  // Simulate loading delay
  const simulateLoading = (setter: (value: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Skeleton</h1>
        <p>Provide a placeholder while you wait for content to load, or to visualize content that doesn't exist yet.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When a resource needs long time to load, like components with heavy dependencies.</li>
          <li>When the component contains lots of information, such as List or Card.</li>
          <li>Only works when loading is slow or in poor network conditions.</li>
          <li>To improve perceived performance and user experience.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>The simplest usage.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <FormItem label="Loading">
                  <Switch checked={loading} onChange={setLoading} />
                </FormItem>
                <FormItem label="Active Animation">
                  <Switch checked={active} onChange={setActive} />
                </FormItem>
              </div>
              
              <Skeleton loading={loading} active={active}>
                <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-color)' }}>Article Title</h3>
                  <p style={{ margin: '0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    This is the actual content that appears when loading is complete. 
                    The skeleton provides a placeholder that matches the structure of this content, 
                    giving users a preview of what's coming and improving perceived performance.
                  </p>
                </div>
              </Skeleton>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Skeleton loading={loading} active={active}>
  <div>
    <h3>Article Title</h3>
    <p>This is the actual content that appears when loading is complete.</p>
  </div>
</Skeleton>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Complex</h3>
          <p>Complex combination with avatar and multiple paragraphs.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <FormItem label="Loading">
                  <Switch checked={avatarLoading} onChange={setAvatarLoading} />
                </FormItem>
                <button 
                  onClick={() => simulateLoading(setAvatarLoading)}
                  style={{ 
                    padding: '6px 12px', 
                    border: '1px solid var(--primary-color)', 
                    borderRadius: '4px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Simulate Loading
                </button>
              </div>
              
              <Skeleton 
                loading={avatarLoading} 
                avatar={{ size: 'large', shape: 'circle' }}
                paragraph={{ rows: 4, width: ['100%', '100%', '80%', '60%'] }}
                active={active}
              >
                <div style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                  <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                    alt="User"
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-color)' }}>John Doe</h3>
                    <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      Senior Frontend Developer at TechCorp. Passionate about creating beautiful user interfaces 
                      and exceptional user experiences. 
                    </p>
                    <p style={{ margin: '0', color: 'var(--text-tertiary)', fontSize: '14px' }}>
                      Joined 2 years ago • 1.2k followers
                    </p>
                  </div>
                </div>
              </Skeleton>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Skeleton 
  loading={loading} 
  avatar={{ size: 'large', shape: 'circle' }}
  paragraph={{ rows: 4, width: ['100%', '100%', '80%', '60%'] }}
  active={true}
>
  <UserProfile />
</Skeleton>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Sub-components</h3>
          <p>Use sub-components for more control over the skeleton layout.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Avatar</h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <SkeletonAvatar size="small" active={active} />
                  <SkeletonAvatar size="medium" active={active} />
                  <SkeletonAvatar size="large" active={active} />
                  <SkeletonAvatar size="xlarge" active={active} />
                  <SkeletonAvatar size="medium" shape="square" active={active} />
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Button</h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <SkeletonButton size="small" active={active} />
                  <SkeletonButton size="medium" active={active} />
                  <SkeletonButton size="large" active={active} />
                  <SkeletonButton shape="round" active={active} />
                  <SkeletonButton shape="circle" active={active} />
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Input</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
                  <SkeletonInput size="small" active={active} />
                  <SkeletonInput size="medium" active={active} />
                  <SkeletonInput size="large" active={active} />
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Image</h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <SkeletonImage size="small" active={active} style={{ width: '120px' }} />
                  <SkeletonImage size="medium" active={active} style={{ width: '200px' }} />
                  <SkeletonImage size="large" active={active} style={{ width: '300px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Skeleton.Avatar size="large" />
<Skeleton.Button shape="round" />
<Skeleton.Input size="large" />
<Skeleton.Image size="medium" />
<Skeleton.Node />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Card Loading</h3>
          <p>Skeleton for card-like content with image, avatar, and text.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <FormItem label="Card Loading">
                  <Switch checked={cardLoading} onChange={setCardLoading} />
                </FormItem>
                <button 
                  onClick={() => simulateLoading(setCardLoading)}
                  style={{ 
                    padding: '6px 12px', 
                    border: '1px solid var(--primary-color)', 
                    borderRadius: '4px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Reload Card
                </button>
              </div>

              <div style={{ maxWidth: '400px' }}>
                {cardLoading ? (
                  <div className="ui-skeleton-card">
                    <div className="ui-skeleton-card-header">
                      <SkeletonAvatar size="medium" active={active} />
                      <div className={`ui-skeleton-element ui-skeleton-card-title ${active ? 'ui-skeleton-element--active' : ''}`} />
                    </div>
                    <SkeletonImage active={active} style={{ width: '100%', height: '200px', marginBottom: '16px' }} />
                    <div className="ui-skeleton-card-content">
                      <div className={`ui-skeleton-element ui-skeleton-card-line ${active ? 'ui-skeleton-element--active' : ''}`} />
                      <div className={`ui-skeleton-element ui-skeleton-card-line ${active ? 'ui-skeleton-element--active' : ''}`} />
                      <div className={`ui-skeleton-element ui-skeleton-card-line ${active ? 'ui-skeleton-element--active' : ''}`} />
                    </div>
                  </div>
                ) : (
                  <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '16px', background: 'var(--bg-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <img 
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
                        alt="User"
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ margin: '0', color: 'var(--text-color)', fontSize: '14px' }}>Sarah Wilson</h4>
                        <p style={{ margin: '0', color: 'var(--text-tertiary)', fontSize: '12px' }}>2 hours ago</p>
                      </div>
                    </div>
                    <img 
                      src="https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2"
                      alt="Nature"
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px', marginBottom: '16px' }}
                    />
                    <div>
                      <p style={{ margin: '0 0 8px 0', color: 'var(--text-color)', lineHeight: '1.6' }}>
                        Beautiful morning in the garden! The flowers are blooming and the weather is perfect.
                      </p>
                      <p style={{ margin: '0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Nature has a way of bringing peace to our busy lives. Taking time to appreciate these small moments.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// Custom card skeleton
<div className="ui-skeleton-card">
  <div className="ui-skeleton-card-header">
    <Skeleton.Avatar size="medium" />
    <div className="ui-skeleton-card-title" />
  </div>
  <Skeleton.Image style={{ width: '100%', height: '200px' }} />
  <div className="ui-skeleton-card-content">
    <div className="ui-skeleton-card-line" />
    <div className="ui-skeleton-card-line" />
    <div className="ui-skeleton-card-line" />
  </div>
</div>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>List Loading</h3>
          <p>Skeleton for list items with consistent structure.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <FormItem label="List Loading">
                  <Switch checked={listLoading} onChange={setListLoading} />
                </FormItem>
                <button 
                  onClick={() => simulateLoading(setListLoading)}
                  style={{ 
                    padding: '6px 12px', 
                    border: '1px solid var(--success-color)', 
                    borderRadius: '4px',
                    background: 'var(--success-color)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Reload List
                </button>
              </div>

              <div style={{ maxWidth: '500px' }}>
                {listLoading ? (
                  <div className="ui-skeleton-list">
                    {[1, 2, 3].map((item) => (
                      <SkeletonNode key={item} active={active} />
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { name: 'Alice Johnson', role: 'Product Designer', time: '5 min ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2' },
                      { name: 'Bob Smith', role: 'Frontend Developer', time: '12 min ago', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2' },
                      { name: 'Carol Davis', role: 'UX Researcher', time: '1 hour ago', avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2' }
                    ].map((user, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
                        <img 
                          src={user.avatar}
                          alt={user.name}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-color)', fontSize: '14px' }}>{user.name}</h4>
                          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '12px' }}>{user.role} • {user.time}</p>
                        </div>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// List skeleton
<div className="ui-skeleton-list">
  {[1, 2, 3].map((item) => (
    <Skeleton.Node key={item} active={true} />
  ))}
</div>

// Or use main component
<Skeleton 
  loading={loading}
  avatar={{ size: 'medium' }}
  paragraph={{ rows: 2 }}
>
  <UserListItem />
</Skeleton>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Social Media Post</h3>
          <p>Real-world example of a social media post skeleton.</p>
          <div className="example-demo">
            <div style={{ maxWidth: '500px' }}>
              <Skeleton loading={true} active={active}>
                <div>Social media post content</div>
              </Skeleton>
              
              <div style={{ marginTop: '24px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <SkeletonAvatar size="medium" active={active} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '30%' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '50%' }} />
                  </div>
                  <SkeletonButton shape="circle" size="small" active={active} />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '85%', marginBottom: '8px' }} />
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '60%' }} />
                </div>
                
                <SkeletonImage active={active} style={{ width: '100%', height: '250px', marginBottom: '16px' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SkeletonButton shape="circle" size="small" active={active} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '30px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SkeletonButton shape="circle" size="small" active={active} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '25px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SkeletonButton shape="circle" size="small" active={active} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '35px' }} />
                    </div>
                  </div>
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '60px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// Social media post skeleton
<div className="post-skeleton">
  <div className="post-header">
    <Skeleton.Avatar size="medium" />
    <div className="user-info">
      <div className="skeleton-line" style={{ width: '30%' }} />
      <div className="skeleton-line" style={{ width: '50%' }} />
    </div>
    <Skeleton.Button shape="circle" size="small" />
  </div>
  
  <div className="post-content">
    <div className="skeleton-line" style={{ width: '100%' }} />
    <div className="skeleton-line" style={{ width: '85%' }} />
    <div className="skeleton-line" style={{ width: '60%' }} />
  </div>
  
  <Skeleton.Image style={{ width: '100%', height: '250px' }} />
  
  <div className="post-actions">
    <Skeleton.Button shape="circle" size="small" />
    <Skeleton.Button shape="circle" size="small" />
    <Skeleton.Button shape="circle" size="small" />
  </div>
</div>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Dashboard Loading</h3>
          <p>Complex dashboard layout with multiple skeleton components.</p>
          <div className="example-demo">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {/* Stats Cards */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '60%', marginBottom: '8px' }} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '24px', width: '40%' }} />
                    </div>
                    <SkeletonButton shape="circle" size="medium" active={active} />
                  </div>
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '80%' }} />
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              {/* Chart Area */}
              <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '16px', width: '25%' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <SkeletonButton size="small" active={active} />
                    <SkeletonButton size="small" active={active} />
                  </div>
                </div>
                <SkeletonImage active={active} style={{ width: '100%', height: '200px' }} />
              </div>
              
              {/* Activity Feed */}
              <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-color)' }}>
                <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '16px', width: '60%', marginBottom: '16px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[1, 2, 3].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SkeletonAvatar size="small" active={active} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '70%' }} />
                        <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '10px', width: '40%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// Dashboard skeleton layout
<div className="dashboard-skeleton">
  {/* Stats Cards */}
  <div className="stats-grid">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="stat-card">
        <div className="stat-header">
          <div className="skeleton-line" style={{ width: '60%' }} />
          <Skeleton.Button shape="circle" size="medium" />
        </div>
        <div className="skeleton-line" style={{ height: '24px', width: '40%' }} />
        <div className="skeleton-line" style={{ width: '80%' }} />
      </div>
    ))}
  </div>
  
  {/* Chart and Activity */}
  <div className="main-content">
    <div className="chart-area">
      <div className="chart-header">
        <div className="skeleton-line" style={{ width: '25%' }} />
        <div className="chart-controls">
          <Skeleton.Button size="small" />
          <Skeleton.Button size="small" />
        </div>
      </div>
      <Skeleton.Image style={{ width: '100%', height: '200px' }} />
    </div>
    
    <div className="activity-feed">
      <div className="skeleton-line" style={{ width: '60%' }} />
      {[1, 2, 3].map((item) => (
        <Skeleton.Node key={item} />
      ))}
    </div>
  </div>
</div>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Interactive Demo</h3>
          <p>Try different configurations and see real-time changes.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <FormItem label="Show Animation">
                  <Switch checked={active} onChange={setActive} />
                </FormItem>
                <FormItem label="Avatar Size">
                  <select 
                    style={{ 
                      padding: '6px 8px', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '4px',
                      background: 'var(--bg-color)',
                      color: 'var(--text-color)',
                      fontSize: '14px'
                    }}
                    defaultValue="medium"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">X-Large</option>
                  </select>
                </FormItem>
                <FormItem label="Paragraph Rows">
                  <select 
                    style={{ 
                      padding: '6px 8px', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '4px',
                      background: 'var(--bg-color)',
                      color: 'var(--text-color)',
                      fontSize: '14px'
                    }}
                    defaultValue="3"
                  >
                    <option value="1">1 Row</option>
                    <option value="2">2 Rows</option>
                    <option value="3">3 Rows</option>
                    <option value="4">4 Rows</option>
                    <option value="5">5 Rows</option>
                  </select>
                </FormItem>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {/* Article Card */}
                <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-color)' }}>
                  <SkeletonImage active={active} style={{ width: '100%', height: '160px', borderRadius: '0' }} />
                  <div style={{ padding: '16px' }}>
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '18px', width: '80%', marginBottom: '12px' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '70%', marginBottom: '16px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SkeletonAvatar size="small" active={active} />
                        <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '60px' }} />
                      </div>
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '40px' }} />
                    </div>
                  </div>
                </div>

                {/* Profile Card */}
                <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '20px', background: 'var(--bg-color)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <SkeletonAvatar size="xlarge" active={active} style={{ marginBottom: '16px' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '18px', width: '60%', marginBottom: '8px' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '40%', marginBottom: '16px' }} />
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <SkeletonButton size="small" active={active} />
                      <SkeletonButton size="small" active={active} />
                    </div>
                    <div style={{ width: '100%' }}>
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '100%', marginBottom: '6px' }} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '80%', marginBottom: '6px' }} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '12px', width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// Article card skeleton
<div className="article-card">
  <Skeleton.Image style={{ width: '100%', height: '160px' }} />
  <div className="article-content">
    <div className="skeleton-line" style={{ height: '18px', width: '80%' }} />
    <div className="skeleton-line" style={{ width: '100%' }} />
    <div className="skeleton-line" style={{ width: '70%' }} />
    <div className="article-meta">
      <Skeleton.Avatar size="small" />
      <div className="skeleton-line" style={{ width: '60px' }} />
    </div>
  </div>
</div>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Custom Shapes and Sizes</h3>
          <p>Create custom skeleton layouts with different shapes and sizes.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Custom Shapes</h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ width: '100px', height: '20px', borderRadius: '2px' }} />
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ width: '80px', height: '30px', borderRadius: '15px' }} />
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                  <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ width: '120px', height: '40px', borderRadius: '8px' }} />
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Form Skeleton</h4>
                <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '25%', marginBottom: '8px' }} />
                    <SkeletonInput size="medium" active={active} />
                  </div>
                  <div>
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '30%', marginBottom: '8px' }} />
                    <SkeletonInput size="medium" active={active} />
                  </div>
                  <div>
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '20%', marginBottom: '8px' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '80px', width: '100%', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <SkeletonButton size="medium" active={active} />
                    <SkeletonButton size="medium" active={active} />
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Table Skeleton</h4>
                <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-color)' }}>
                  {/* Table Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px', gap: '16px', padding: '12px 16px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '60%' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '50%' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '40%' }} />
                    <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '100%' }} />
                  </div>
                  {/* Table Rows */}
                  {[1, 2, 3, 4].map((row) => (
                    <div key={row} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px', gap: '16px', padding: '12px 16px', borderBottom: row < 4 ? '1px solid var(--border-light)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SkeletonAvatar size="small" active={active} />
                        <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '80%' }} />
                      </div>
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '70%' }} />
                      <div className={`ui-skeleton-element ${active ? 'ui-skeleton-element--active' : ''}`} style={{ height: '14px', width: '50%' }} />
                      <SkeletonButton size="small" shape="round" active={active} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`// Custom skeleton shapes
<div className="ui-skeleton-element" style={{ 
  width: '100px', 
  height: '20px', 
  borderRadius: '2px' 
}} />

<div className="ui-skeleton-element" style={{ 
  width: '60px', 
  height: '60px', 
  borderRadius: '50%' 
}} />

// Form skeleton
<div className="form-skeleton">
  <div className="field">
    <div className="skeleton-line" style={{ width: '25%' }} />
    <Skeleton.Input size="medium" />
  </div>
  <div className="field">
    <div className="skeleton-line" style={{ width: '30%' }} />
    <div className="skeleton-line" style={{ height: '80px' }} />
  </div>
  <div className="actions">
    <Skeleton.Button size="medium" />
    <Skeleton.Button size="medium" />
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
              <td>Show avatar placeholder</td>
              <td>boolean | object</td>
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
              <td>Show paragraph placeholder</td>
              <td>boolean | object</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>round</td>
              <td>Show paragraph and title radius when true</td>
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
              <td>Show title placeholder</td>
              <td>boolean | object</td>
              <td>true</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <h3>Skeleton.Avatar</h3>
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

        <h3>Skeleton.Button</h3>
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

        <h3>Skeleton.Input</h3>
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

        <h3>Skeleton.Image</h3>
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
          <li><strong>Perceived Performance:</strong> Use skeletons to improve perceived loading performance</li>
          <li><strong>Content Structure:</strong> Match the skeleton structure to the actual content layout</li>
          <li><strong>Progressive Loading:</strong> Show skeletons for slow-loading content only</li>
          <li><strong>Consistent Timing:</strong> Use consistent animation timing across all skeletons</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use skeleton screens for content that takes more than 1 second to load</li>
          <li>Match the skeleton structure as closely as possible to the final content</li>
          <li>Use appropriate sizes and shapes for different content types</li>
          <li>Consider using static skeletons for very fast loading content</li>
          <li>Combine different skeleton components for complex layouts</li>
          <li>Use the loading prop to conditionally show skeletons vs real content</li>
        </ul>

        <h3>Accessibility</h3>
        <ul>
          <li>Skeletons include proper ARIA labels and roles</li>
          <li>Loading states are announced to screen readers</li>
          <li>Animation can be disabled for users who prefer reduced motion</li>
          <li>High contrast mode support for better visibility</li>
          <li>Semantic HTML structure for better screen reader navigation</li>
        </ul>

        <h3>Performance Tips</h3>
        <ul>
          <li>Use CSS animations instead of JavaScript for better performance</li>
          <li>Limit the number of animated elements on screen simultaneously</li>
          <li>Consider using static skeletons for very short loading times</li>
          <li>Use the active prop to control animation based on user preferences</li>
        </ul>
      </div>
    </div>
  );
};