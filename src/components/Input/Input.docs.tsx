import React, { useState } from 'react';
import { Input, InputGroup, InputSearch, InputPassword, InputNumber, TextArea, FormItem } from './index';
import { Button } from '../Button/Button';
import { User, Lock, Mail, Phone, Search, Settings, Globe, CreditCard } from 'lucide-react';

export const InputDocs: React.FC = () => {
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [numberValue, setNumberValue] = useState<number | null>(10);
  const [textAreaValue, setTextAreaValue] = useState('');

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Input</h1>
        <p>A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>A user input in a form field is needed.</li>
          <li>A search input is required.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic Usage</h3>
          <p>Basic usage example.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input placeholder="Basic usage" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="With default value" defaultValue="Default value" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input placeholder="Basic usage" />
<Input placeholder="Disabled" disabled />
<Input placeholder="With default value" defaultValue="Default value" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Sizes</h3>
          <p>There are three sizes available: small, medium (default), and large.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input size="small" placeholder="Small size" />
              <Input size="medium" placeholder="Medium size (default)" />
              <Input size="large" placeholder="Large size" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input size="small" placeholder="Small size" />
<Input size="medium" placeholder="Medium size (default)" />
<Input size="large" placeholder="Large size" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Variants</h3>
          <p>Different input variants: outlined (default), filled, and borderless.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input variant="outlined" placeholder="Outlined (default)" />
              <Input variant="filled" placeholder="Filled variant" />
              <Input variant="borderless" placeholder="Borderless variant" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input variant="outlined" placeholder="Outlined (default)" />
<Input variant="filled" placeholder="Filled variant" />
<Input variant="borderless" placeholder="Borderless variant" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Status</h3>
          <p>Add status to Input with status, which could be error, warning or success.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input status="error" placeholder="Error status" />
              <Input status="warning" placeholder="Warning status" />
              <Input status="success" placeholder="Success status" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input status="error" placeholder="Error status" />
<Input status="warning" placeholder="Warning status" />
<Input status="success" placeholder="Success status" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Prefix and Suffix</h3>
          <p>Add prefix and suffix icons or text to input.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input prefix={<User size={16} />} placeholder="Username" />
              <Input prefix={<Mail size={16} />} suffix="@example.com" placeholder="Email" />
              <Input prefix="https://" suffix={<Globe size={16} />} placeholder="Website" />
              <Input suffix={<Search size={16} />} placeholder="Search" />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input prefix={<User size={16} />} placeholder="Username" />
<Input prefix={<Mail size={16} />} suffix="@example.com" placeholder="Email" />
<Input prefix="https://" suffix={<Globe size={16} />} placeholder="Website" />
<Input suffix={<Search size={16} />} placeholder="Search" />`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Allow Clear</h3>
          <p>Make Input clearable.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input 
                allowClear 
                placeholder="Clearable input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Input 
                allowClear 
                prefix={<User size={16} />} 
                placeholder="Clearable with prefix"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input 
  allowClear 
  placeholder="Clearable input"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
<Input 
  allowClear 
  prefix={<User size={16} />} 
  placeholder="Clearable with prefix"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Show Count</h3>
          <p>Show character count.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <Input 
                showCount 
                maxLength={20} 
                placeholder="Input with character count"
              />
              <Input 
                showCount 
                maxLength={50} 
                allowClear
                prefix={<Mail size={16} />}
                placeholder="Email with count"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input 
  showCount 
  maxLength={20} 
  placeholder="Input with character count"
/>
<Input 
  showCount 
  maxLength={50} 
  allowClear
  prefix={<Mail size={16} />}
  placeholder="Email with count"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Input Group</h3>
          <p>Using pre & post tabs example.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <Input addonBefore="https://" addonAfter=".com" placeholder="Website" />
              <Input addonBefore={<User size={16} />} placeholder="Username" />
              <Input addonAfter={<Settings size={16} />} placeholder="Settings" />
              <Input 
                addonBefore="$" 
                addonAfter="USD" 
                placeholder="Price"
                type="number"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Input addonBefore="https://" addonAfter=".com" placeholder="Website" />
<Input addonBefore={<User size={16} />} placeholder="Username" />
<Input addonAfter={<Settings size={16} />} placeholder="Settings" />
<Input 
  addonBefore="$" 
  addonAfter="USD" 
  placeholder="Price"
  type="number"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Search Input</h3>
          <p>Example of creating a search box by grouping a standard input with a search button.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <InputSearch 
                placeholder="Search input" 
                onSearch={(value) => console.log('Search:', value)}
              />
              <InputSearch 
                placeholder="Search with button" 
                enterButton
                onSearch={(value) => console.log('Search:', value)}
              />
              <InputSearch 
                placeholder="Custom search button" 
                enterButton="Search"
                size="large"
                onSearch={(value) => console.log('Search:', value)}
              />
              <InputSearch 
                placeholder="Loading search" 
                loading
                onSearch={(value) => console.log('Search:', value)}
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<InputSearch 
  placeholder="Search input" 
  onSearch={(value) => console.log('Search:', value)}
/>
<InputSearch 
  placeholder="Search with button" 
  enterButton
  onSearch={(value) => console.log('Search:', value)}
/>
<InputSearch 
  placeholder="Custom search button" 
  enterButton="Search"
  size="large"
  onSearch={(value) => console.log('Search:', value)}
/>
<InputSearch 
  placeholder="Loading search" 
  loading
  onSearch={(value) => console.log('Search:', value)}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Password Input</h3>
          <p>Input type of password.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
              <InputPassword placeholder="Input password" />
              <InputPassword 
                placeholder="Password without toggle" 
                visibilityToggle={false}
              />
              <InputPassword 
                prefix={<Lock size={16} />}
                placeholder="Password with prefix"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<InputPassword placeholder="Input password" />
<InputPassword 
  placeholder="Password without toggle" 
  visibilityToggle={false}
/>
<InputPassword 
  prefix={<Lock size={16} />}
  placeholder="Password with prefix"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Input Number</h3>
          <p>Enter a number within certain range with the mouse or keyboard.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '200px' }}>
              <InputNumber 
                placeholder="Basic number input"
                value={numberValue}
                onChange={setNumberValue}
              />
              <InputNumber 
                min={0} 
                max={100} 
                step={5}
                placeholder="With min/max/step"
              />
              <InputNumber 
                precision={2}
                step={0.1}
                placeholder="Decimal input"
              />
              <InputNumber 
                formatter={(value) => ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => parseFloat((value || '').replace(/\$\s?|(,*)/g, '') || '0')}
                placeholder="Formatted input"
              />
              <InputNumber 
                controls={false}
                placeholder="No controls"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<InputNumber 
  placeholder="Basic number input"
  value={numberValue}
  onChange={setNumberValue}
/>
<InputNumber 
  min={0} 
  max={100} 
  step={5}
  placeholder="With min/max/step"
/>
<InputNumber 
  precision={2}
  step={0.1}
  placeholder="Decimal input"
/>
<InputNumber 
  formatter={(value) => ('$ ' + value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}
  parser={(value) => parseFloat((value || '').replace(/\\$\\s?|(,*)/g, '') || '0')}
  placeholder="Formatted input"
/>
<InputNumber 
  controls={false}
  placeholder="No controls"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>TextArea</h3>
          <p>For multi-line input.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <TextArea 
                rows={4} 
                placeholder="Basic textarea"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
              />
              <TextArea 
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Auto-resize textarea"
              />
              <TextArea 
                showCount 
                maxLength={100}
                placeholder="Textarea with character count"
              />
              <TextArea 
                allowClear
                placeholder="Clearable textarea"
              />
            </div>
          </div>
          <div className="example-code">
            <pre>{`<TextArea 
  rows={4} 
  placeholder="Basic textarea"
  value={textAreaValue}
  onChange={(e) => setTextAreaValue(e.target.value)}
/>
<TextArea 
  autoSize={{ minRows: 2, maxRows: 6 }}
  placeholder="Auto-resize textarea"
/>
<TextArea 
  showCount 
  maxLength={100}
  placeholder="Textarea with character count"
/>
<TextArea 
  allowClear
  placeholder="Clearable textarea"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Form Integration</h3>
          <p>Input components work seamlessly with form validation.</p>
          <div className="example-demo">
            <div style={{ maxWidth: '400px' }}>
              <FormItem 
                label="Username" 
                required
                validateStatus="error"
                help="Username is required"
              >
                <Input prefix={<User size={16} />} placeholder="Enter username" />
              </FormItem>
              
              <FormItem 
                label="Email" 
                validateStatus="success"
                help="Email format is correct"
              >
                <Input prefix={<Mail size={16} />} placeholder="Enter email" />
              </FormItem>
              
              <FormItem 
                label="Phone" 
                validateStatus="warning"
                help="Please verify your phone number"
              >
                <Input prefix={<Phone size={16} />} placeholder="Enter phone" />
              </FormItem>
              
              <FormItem label="Password" required>
                <InputPassword prefix={<Lock size={16} />} placeholder="Enter password" />
              </FormItem>
              
              <FormItem label="Description">
                <TextArea 
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  placeholder="Enter description"
                />
              </FormItem>
              
              <FormItem>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button color="primary">Submit</Button>
                  <Button variant="outlined">Cancel</Button>
                </div>
              </FormItem>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<FormItem 
  label="Username" 
  required
  validateStatus="error"
  help="Username is required"
>
  <Input prefix={<User size={16} />} placeholder="Enter username" />
</FormItem>

<FormItem 
  label="Email" 
  validateStatus="success"
  help="Email format is correct"
>
  <Input prefix={<Mail size={16} />} placeholder="Enter email" />
</FormItem>

<FormItem label="Password" required>
  <InputPassword prefix={<Lock size={16} />} placeholder="Enter password" />
</FormItem>

<FormItem label="Description">
  <TextArea 
    autoSize={{ minRows: 3, maxRows: 6 }}
    placeholder="Enter description"
  />
</FormItem>`}</pre>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2>API</h2>
        
        <h3>Input</h3>
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
              <td>addonAfter</td>
              <td>The label text displayed after (on the right side of) the input field</td>
              <td>ReactNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td>addonBefore</td>
              <td>The label text displayed before (on the left side of) the input field</td>
              <td>ReactNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td>allowClear</td>
              <td>If allow to remove input content with clear icon</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>maxLength</td>
              <td>The max length</td>
              <td>number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>prefix</td>
              <td>The prefix icon for the Input</td>
              <td>ReactNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td>showCount</td>
              <td>Whether show text count</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>The size of the input box</td>
              <td>small | medium | large</td>
              <td>medium</td>
            </tr>
            <tr>
              <td>status</td>
              <td>Set validation status</td>
              <td>error | warning | success</td>
              <td>-</td>
            </tr>
            <tr>
              <td>suffix</td>
              <td>The suffix icon for the Input</td>
              <td>ReactNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td>variant</td>
              <td>Variants of input</td>
              <td>outlined | filled | borderless</td>
              <td>outlined</td>
            </tr>
            <tr>
              <td>onPressEnter</td>
              <td>The callback function that is triggered when Enter key is pressed</td>
              <td>function(e)</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Input.Search</h3>
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
              <td>enterButton</td>
              <td>Whether to show an enter button after input</td>
              <td>boolean | ReactNode</td>
              <td>false</td>
            </tr>
            <tr>
              <td>loading</td>
              <td>Search box with loading</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onSearch</td>
              <td>The callback function triggered when you click on the search-icon, the enter button or press the Enter key</td>
              <td>function(value, event)</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Input.Password</h3>
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
              <td>iconRender</td>
              <td>Custom toggle button</td>
              <td>{'(visible) => ReactNode'}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>visibilityToggle</td>
              <td>Whether show toggle button</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
          </tbody>
        </table>

        <h3>Input.Number</h3>
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
              <td>controls</td>
              <td>Whether to show +/- controls</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>formatter</td>
              <td>Specifies the format of the value presented</td>
              <td>function(value: number | string): string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>keyboard</td>
              <td>If enable keyboard behavior</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>max</td>
              <td>The max value</td>
              <td>number</td>
              <td>Infinity</td>
            </tr>
            <tr>
              <td>min</td>
              <td>The min value</td>
              <td>number</td>
              <td>-Infinity</td>
            </tr>
            <tr>
              <td>parser</td>
              <td>Specifies the value extracted from formatter</td>
              <td>function(string): number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>precision</td>
              <td>The precision of input value</td>
              <td>number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>step</td>
              <td>The number to which the current value is increased or decreased</td>
              <td>number | string</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>

        <h3>TextArea</h3>
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
              <td>autoSize</td>
              <td>Height autosize feature</td>
              <td>{'boolean | { minRows: number, maxRows: number }'}</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showCount</td>
              <td>Whether show text count</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>allowClear</td>
              <td>If allow to remove input content with clear icon</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onResize</td>
              <td>The callback function that is triggered when resize</td>
              <td>{'function({ width, height })'}</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};