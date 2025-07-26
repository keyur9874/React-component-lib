import React, { useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { BadgeDocs } from "./components/Badge/Badge.docs";
import { SwitchDocs } from "./components/Switch/Switch.docs";

type ActiveComponent = "button" | "avatar" | "badge" | "input" | "switch";

function App() {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("switch");

  const components = [
    { id: "badge" as const, label: "Badge", component: BadgeDocs },
    { id: "switch" as const, label: "Switch", component: SwitchDocs },
  ];

  const ActiveComponentDoc =
    components.find((comp) => comp.id === activeComponent)?.component ||
    SwitchDocs;

  return (
    <ThemeProvider>
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-header-content">
              <h1>React UI Library</h1>
              <p>Beautiful components with zero dependencies</p>
            </div>
            <ThemeToggle />
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-section-title">General</div>
              {components.map((component) => (
                <a
                  key={component.id}
                  href="#"
                  className={`nav-item ${
                    activeComponent === component.id ? "active" : ""
                  }`}
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
    </ThemeProvider>
  );
}

export default App;
