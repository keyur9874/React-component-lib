import React, { useState } from 'react';
import { ButtonDocs } from './components/Button/Button.docs';
import { AvatarDocs } from './components/Avatar/Avatar.docs';
import { BadgeDocs } from './components/Badge/Badge.docs';

type ActiveComponent = 'button' | 'avatar' | 'badge';

function App() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('button');

  const components = [
    { id: 'button' as const, label: 'Button', component: ButtonDocs },
    { id: 'avatar' as const, label: 'Avatar', component: AvatarDocs },
    { id: 'badge' as const, label: 'Badge', component: BadgeDocs },
  ];

  const ActiveComponentDoc = components.find(comp => comp.id === activeComponent)?.component || ButtonDocs;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>React UI Library</h1>
          <p>Beautiful components with zero dependencies</p>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">General</div>
            {components.map(component => (
              <a
                key={component.id}
                href="#"
                className={`nav-item ${activeComponent === component.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveComponent(component.id);
                }}
              >
                {component.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <ActiveComponentDoc />
        </div>
      </div>
    </div>
  );
}

export default App;