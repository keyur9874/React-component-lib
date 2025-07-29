import React, { useState } from 'react';
import { Dropdown, DropdownOption } from './Dropdown';
import { FormItem } from '../Form';
import { User, Settings, LogOut, Mail, Phone, MapPin, Star, Heart, Bookmark, Download, Share, Edit, Trash2 } from 'lucide-react';

export const DropdownDocs: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string>();
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>();

  const basicOptions: DropdownOption[] = [
    { key: 1, label: 'Option 1', value: 'option1' },
    { key: 2, label: 'Option 2', value: 'option2' },
    { key: 3, label: 'Option 3', value: 'option3' },
    { key: 4, label: 'Option 4', value: 'option4', disabled: true },
    { key: 5, label: 'Option 5', value: 'option5' },
  ];

  const iconOptions: DropdownOption[] = [
    { key: 1, label: 'Profile', value: 'profile', icon: <User size={16} /> },
    { key: 2, label: 'Settings', value: 'settings', icon: <Settings size={16} /> },
    { key: 3, label: 'Logout', value: 'logout', icon: <LogOut size={16} />, danger: true },
  ];

  const groupedOptions: DropdownOption[] = [
    { key: 1, label: 'John Doe', value: 'john', icon: <User size={16} />, group: 'Users' },
    { key: 2, label: 'Jane Smith', value: 'jane', icon: <User size={16} />, group: 'Users' },
    { key: 3, label: 'Bob Johnson', value: 'bob', icon: <User size={16} />, group: 'Users' },
    { key: 4, label: 'Email', value: 'email', icon: <Mail size={16} />, group: 'Contact' },
    { key: 5, label: 'Phone', value: 'phone', icon: <Phone size={16} />, group: 'Contact' },
    { key: 6, label: 'Address', value: 'address', icon: <MapPin size={16} />, group: 'Contact' },
    { key: 7, label: 'Favorites', value: 'favorites', icon: <Star size={16} />, group: 'Actions' },
    { key: 8, label: 'Bookmarks', value: 'bookmarks', icon: <Bookmark size={16} />, group: 'Actions' },
  ];

  const actionOptions: DropdownOption[] = [
    { key: 1, label: 'Download', value: 'download', icon: <Download size={16} /> },
    { key: 2, label: 'Share', value: 'share', icon: <Share size={16} /> },
    { key: 3, label: 'Edit', value: 'edit', icon: <Edit size={16} /> },
    { key: 4, label: 'Delete', value: 'delete', icon: <Trash2 size={16} />, danger: true },
  ];

  const countryOptions: DropdownOption[] = [
    { key: 1, label: 'United States', value: 'us' },
    { key: 2, label: 'United Kingdom', value: 'uk' },
    { key: 3, label: 'Canada', value: 'ca' },
    { key: 4, label: 'Australia', value: 'au' },
    { key: 5, label: 'Germany', value: 'de' },
    { key: 6, label: 'France', value: 'fr' },
    { key: 7, label: 'Japan', value: 'jp' },
    { key: 8, label: 'China', value: 'cn' },
    { key: 9, label: 'India', value: 'in' },
    { key: 10, label: 'Brazil', value: 'br' },
  ];

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Dropdown</h1>
        <p>A dropdown list component that provides a list of options for users to choose from.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you need to provide a list of options for users to choose from.</li>
          <li>When you want to save space by hiding options until needed.</li>
          <li>When you need to group related options together.</li>
          <li>When you want to provide search functionality within options.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>The most basic usage of dropdown.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                options={basicOptions}
                placeholder="Select an option"
                style={{ width: 200 }}
              />
              <Dropdown
                options={basicOptions}
                defaultValue="option2"
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Dropdown
  options={basicOptions}
  placeholder="Select an option"
  style={{ width: 200 }}
/>
<Dropdown
  options={basicOptions}
  defaultValue="option2"
  style={{ width: 200 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Sizes</h3>
          <p>Dropdown supports three sizes: small, medium (default), and large.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                size="small"
                options={basicOptions}
                defaultValue="option1"
                style={{ width: 150 }}
              />
              <Dropdown
                size="medium"
                options={basicOptions}
                defaultValue="option1"
                style={{ width: 180 }}
              />
              <Dropdown
                size="large"
                options={basicOptions}
                defaultValue="option1"
                style={{ width: 220 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Dropdown size="small" options={options} />
<Dropdown size="medium" options={options} />
<Dropdown size="large" options={options} />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>With Icons</h3>
          <p>Options can include icons for better visual representation.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                options={iconOptions}
                placeholder="Select action"
                style={{ width: 200 }}
              />
              <Dropdown
                options={actionOptions}
                placeholder="Choose action"
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`const iconOptions = [
  { key: 1, label: 'Profile', value: 'profile', icon: <User size={16} /> },
  { key: 2, label: 'Settings', value: 'settings', icon: <Settings size={16} /> },
  { key: 3, label: 'Logout', value: 'logout', icon: <LogOut size={16} />, danger: true },
];

<Dropdown
  options={iconOptions}
  placeholder="Select action"
  style={{ width: 200 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Grouped Options</h3>
          <p>Options can be grouped for better organization.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                options={groupedOptions}
                placeholder="Select from groups"
                style={{ width: 250 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`const groupedOptions = [
  { key: 1, label: 'John Doe', value: 'john', icon: <User size={16} />, group: 'Users' },
  { key: 2, label: 'Jane Smith', value: 'jane', icon: <User size={16} />, group: 'Users' },
  { key: 3, label: 'Email', value: 'email', icon: <Mail size={16} />, group: 'Contact' },
  { key: 4, label: 'Phone', value: 'phone', icon: <Phone size={16} />, group: 'Contact' },
];

<Dropdown
  options={groupedOptions}
  placeholder="Select from groups"
  style={{ width: 250 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Searchable</h3>
          <p>Enable search functionality to filter options.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                options={countryOptions}
                searchable
                placeholder="Search countries"
                style={{ width: 250 }}
                value={searchValue}
                onChange={(value) => setSearchValue(value)}
              />
              <Dropdown
                options={countryOptions}
                showSearch
                searchPlaceholder="Type to search..."
                placeholder="Countries with search"
                style={{ width: 250 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Dropdown
  options={countryOptions}
  searchable
  placeholder="Search countries"
  style={{ width: 250 }}
/>
<Dropdown
  options={countryOptions}
  showSearch
  searchPlaceholder="Type to search..."
  placeholder="Countries with search"
  style={{ width: 250 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Multiple Selection</h3>
          <p>Allow users to select multiple options.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Dropdown
                  options={basicOptions}
                  multiple
                  placeholder="Select multiple options"
                  style={{ width: 300 }}
                  value={multiValue}
                  onChange={(value) => setMultiValue(value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Dropdown
                  options={groupedOptions}
                  multiple
                  searchable
                  placeholder="Multi-select with search"
                  style={{ width: 300 }}
                  maxTagCount={2}
                />
              </div>
              <div>
                <p style={{ margin: '8px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Selected values: {JSON.stringify(multiValue)}
                </p>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Dropdown
  options={basicOptions}
  multiple
  placeholder="Select multiple options"
  style={{ width: 300 }}
  value={multiValue}
  onChange={(value) => setMultiValue(value)}
/>
<Dropdown
  options={groupedOptions}
  multiple
  searchable
  placeholder="Multi-select with search"
  style={{ width: 300 }}
  maxTagCount={2}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Disabled & Loading</h3>
          <p>Dropdown can be disabled or show loading state.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                options={basicOptions}
                disabled
                placeholder="Disabled dropdown"
                style={{ width: 200 }}
              />
              <Dropdown
                options={basicOptions}
                loading
                placeholder="Loading dropdown"
                style={{ width: 200 }}
              />
              <Dropdown
                options={basicOptions}
                defaultValue="option1"
                disabled
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Dropdown
  options={basicOptions}
  disabled
  placeholder="Disabled dropdown"
  style={{ width: 200 }}
/>
<Dropdown
  options={basicOptions}
  loading
  placeholder="Loading dropdown"
  style={{ width: 200 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Trigger Types</h3>
          <p>Dropdown can be triggered by click or hover.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Dropdown
                options={iconOptions}
                trigger="click"
                placeholder="Click to open"
                style={{ width: 200 }}
              />
              <Dropdown
                options={iconOptions}
                trigger="hover"
                placeholder="Hover to open"
                style={{ width: 200 }}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Dropdown
  options={iconOptions}
  trigger="click"
  placeholder="Click to open"
  style={{ width: 200 }}
/>
<Dropdown
  options={iconOptions}
  trigger="hover"
  placeholder="Hover to open"
  style={{ width: 200 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Controlled</h3>
          <p>Fully controlled dropdown component.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Dropdown
                  options={basicOptions}
                  value={singleValue}
                  onChange={(value) => setSingleValue(value)}
                  placeholder="Controlled dropdown"
                  style={{ width: 250 }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>
                  Selected: {singleValue || 'None'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setSingleValue('option1')}
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '4px',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                >
                  Set Option 1
                </button>
                <button 
                  onClick={() => setSingleValue('option3')}
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '4px',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                >
                  Set Option 3
                </button>
                <button 
                  onClick={() => setSingleValue(undefined)}
                  style={{ 
                    padding: '4px 8px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '4px',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`const [singleValue, setSingleValue] = useState();

<Dropdown
  options={basicOptions}
  value={singleValue}
  onChange={(value) => setSingleValue(value)}
  placeholder="Controlled dropdown"
  style={{ width: 250 }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Form Integration</h3>
          <p>Dropdown works seamlessly with form components.</p>
          <div className="example-demo">
            <div style={{ maxWidth: '400px' }}>
              <FormItem label="Country" required>
                <Dropdown
                  options={countryOptions}
                  searchable
                  placeholder="Select your country"
                  style={{ width: '100%' }}
                />
              </FormItem>
              
              <FormItem label="Preferred Contact" help="Choose how you'd like to be contacted">
                <Dropdown
                  options={[
                    { key: 1, label: 'Email', value: 'email', icon: <Mail size={16} /> },
                    { key: 2, label: 'Phone', value: 'phone', icon: <Phone size={16} /> },
                    { key: 3, label: 'Mail', value: 'mail', icon: <MapPin size={16} /> },
                  ]}
                  placeholder="Select contact method"
                  style={{ width: '100%' }}
                />
              </FormItem>
              
              <FormItem label="Skills" help="Select all that apply">
                <Dropdown
                  options={[
                    { key: 1, label: 'JavaScript', value: 'js' },
                    { key: 2, label: 'TypeScript', value: 'ts' },
                    { key: 3, label: 'React', value: 'react' },
                    { key: 4, label: 'Vue', value: 'vue' },
                    { key: 5, label: 'Angular', value: 'angular' },
                    { key: 6, label: 'Node.js', value: 'node' },
                  ]}
                  multiple
                  searchable
                  placeholder="Select your skills"
                  style={{ width: '100%' }}
                  maxTagCount={3}
                />
              </FormItem>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<FormItem label="Country" required>
  <Dropdown
    options={countryOptions}
    searchable
    placeholder="Select your country"
    style={{ width: '100%' }}
  />
</FormItem>

<FormItem label="Skills" help="Select all that apply">
  <Dropdown
    options={skillOptions}
    multiple
    searchable
    placeholder="Select your skills"
    style={{ width: '100%' }}
    maxTagCount={3}
  />
</FormItem>`}</pre>
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
              <td>options</td>
              <td>Data source for dropdown options</td>
              <td>DropdownOption[]</td>
              <td>[]</td>
              <td></td>
            </tr>
            <tr>
              <td>value</td>
              <td>Current selected value(s)</td>
              <td>any | any[]</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>defaultValue</td>
              <td>Initial selected value(s)</td>
              <td>any | any[]</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>Placeholder text when no option is selected</td>
              <td>string</td>
              <td>'Select an option'</td>
              <td></td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Whether the dropdown is disabled</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Whether the dropdown is in loading state</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>Size of the dropdown</td>
              <td>small | medium | large</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>placement</td>
              <td>Placement of dropdown menu</td>
              <td>bottom | top | bottomLeft | bottomRight | topLeft | topRight</td>
              <td>bottom</td>
              <td></td>
            </tr>
            <tr>
              <td>trigger</td>
              <td>Trigger mode for dropdown</td>
              <td>hover | click</td>
              <td>click</td>
              <td></td>
            </tr>
            <tr>
              <td>multiple</td>
              <td>Allow multiple selection</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>searchable</td>
              <td>Whether to show search input</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>searchPlaceholder</td>
              <td>Placeholder for search input</td>
              <td>string</td>
              <td>'Search...'</td>
              <td></td>
            </tr>
            <tr>
              <td>maxTagCount</td>
              <td>Max tag count to show in multiple mode</td>
              <td>number</td>
              <td>3</td>
              <td></td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>Called when selection changes</td>
              <td>function(value, option)</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onSelect</td>
              <td>Called when an option is selected</td>
              <td>function(value, option)</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onSearch</td>
              <td>Called when search input changes</td>
              <td>function(value)</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onDropdownVisibleChange</td>
              <td>Called when dropdown visibility changes</td>
              <td>function(visible)</td>
              <td>-</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>DropdownOption</h2>
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
              <td>key</td>
              <td>Unique key for the option</td>
              <td>string | number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>label</td>
              <td>Display text for the option</td>
              <td>ReactNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td>value</td>
              <td>Value of the option</td>
              <td>any</td>
              <td>-</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Whether the option is disabled</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>danger</td>
              <td>Whether the option is dangerous (red styling)</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>icon</td>
              <td>Icon to display before the label</td>
              <td>ReactNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td>group</td>
              <td>Group name for grouping options</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>Methods</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>focus()</td>
              <td>Get focus</td>
              <td></td>
            </tr>
            <tr>
              <td>blur()</td>
              <td>Remove focus</td>
              <td></td>
            </tr>
            <tr>
              <td>open()</td>
              <td>Open dropdown</td>
              <td></td>
            </tr>
            <tr>
              <td>close()</td>
              <td>Close dropdown</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};