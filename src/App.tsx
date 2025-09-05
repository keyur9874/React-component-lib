import React, { useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { SwitchDocs } from "./components/Switch/Switch.docs";
import { AlertDocs } from "./components/Alert/Alert.docs";
import { UploadDocs } from "./components/Upload/Upload.docs";
import { PopoverDocs } from "./components/Popover/Popover.docs";

type ActiveComponent = "switch" | "alert" | "upload" | "popover" | "skeleton";

function App() {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("alert");

  const components = [
    { id: "switch" as const, label: "Switch", component: SwitchDocs },
    { id: "alert" as const, label: "Alert", component: AlertDocs },
    { id: "upload" as const, label: "Upload", component: UploadDocs },
    { id: "popover" as const, label: "Popover", component: PopoverDocs },
  ];

  const ActiveComponentDoc =
    components.find((comp) => comp.id === activeComponent)?.component ||
    AlertDocs;

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
