import React, { useState } from 'react';
import { Upload } from './Upload';
import { FormItem } from '../Form';
import { 
  Upload as UploadIcon, 
  Image, 
  FileText, 
  Download,
  Eye,
  Camera
} from 'lucide-react';

export const UploadDocs: React.FC = () => {
  const [fileList, setFileList] = useState([]);
  const [pictureFileList, setPictureFileList] = useState([]);

  const handleChange = (info: any) => {
    console.log('Upload change:', info);
    setFileList(info.fileList);
  };

  const handlePictureChange = (info: any) => {
    console.log('Picture upload change:', info);
    setPictureFileList(info.fileList);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      console.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error('Image must smaller than 2MB!');
      return false;
    }
    return true;
  };

  const customRequest = ({ file, onSuccess, onError, onProgress }: any) => {
    // Simulate upload progress
    let progress = 0;
    const timer = setInterval(() => {
      progress += 10;
      onProgress(progress);
      
      if (progress >= 100) {
        clearInterval(timer);
        // Simulate success or error
        if (Math.random() > 0.2) {
          onSuccess({ url: URL.createObjectURL(file) });
        } else {
          onError(new Error('Upload failed'));
        }
      }
    }, 200);
  };

  return (
    <div className="component-docs">
      <div className="docs-header">
        <h1>Upload</h1>
        <p>Upload file by selecting or dragging. A versatile file upload component with multiple display modes and comprehensive features.</p>
      </div>

      <div className="docs-section">
        <h2>When To Use</h2>
        <ul>
          <li>When you need to upload one or more files.</li>
          <li>When you need to show the process of uploading.</li>
          <li>When you need to upload files by dragging and dropping.</li>
          <li>When you need to display uploaded files in different formats.</li>
        </ul>
      </div>

      <div className="docs-section">
        <h2>Examples</h2>
        
        <div className="example-container">
          <h3>Basic</h3>
          <p>Classic mode. File selection dialog pops up when upload button is clicked.</p>
          <div className="example-demo">
            <Upload
              action="https://httpbin.org/post"
              onChange={handleChange}
            >
              <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
                <UploadIcon size={16} style={{ marginRight: '8px' }} />
                Click to Upload
              </button>
            </Upload>
          </div>
          <div className="example-code">
            <pre>{`<Upload
  action="https://httpbin.org/post"
  onChange={handleChange}
>
  <Button icon={<UploadIcon />}>Click to Upload</Button>
</Upload>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Default File List</h3>
          <p>Use defaultFileList for uploaded files when page init.</p>
          <div className="example-demo">
            <Upload
              action="https://httpbin.org/post"
              defaultFileList={[
                {
                  uid: '1',
                  name: 'document.pdf',
                  status: 'done',
                  size: 1024000,
                  type: 'application/pdf',
                  url: 'https://example.com/document.pdf',
                },
                {
                  uid: '2',
                  name: 'image.png',
                  status: 'done',
                  size: 512000,
                  type: 'image/png',
                  url: 'https://example.com/image.png',
                },
                {
                  uid: '3',
                  name: 'failed.txt',
                  status: 'error',
                  size: 256000,
                  type: 'text/plain',
                },
              ]}
            />
          </div>
          <div className="example-code">
            <pre>{`<Upload
  action="https://httpbin.org/post"
  defaultFileList={[
    {
      uid: '1',
      name: 'document.pdf',
      status: 'done',
      size: 1024000,
      type: 'application/pdf',
      url: 'https://example.com/document.pdf',
    },
    // ... more files
  ]}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Drag and Drop</h3>
          <p>You can drag files to a specific area to upload. Alternatively, you can also upload by selecting.</p>
          <div className="example-demo">
            <Upload
              type="drag"
              action="https://httpbin.org/post"
              multiple
              onChange={handleChange}
            />
          </div>
          <div className="example-code">
            <pre>{`<Upload
  type="drag"
  action="https://httpbin.org/post"
  multiple
  onChange={handleChange}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Upload Directory</h3>
          <p>Support upload whole directory.</p>
          <div className="example-demo">
            <Upload
              type="drag"
              action="https://httpbin.org/post"
              multiple
              accept="image/*"
            >
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '500' }}>
                  <Image size={32} style={{ marginBottom: '8px' }} />
                </p>
                <p style={{ margin: '0 0 4px 0', color: 'var(--text-color)' }}>
                  Click or drag images to this area to upload
                </p>
                <p style={{ margin: '0', color: 'var(--text-tertiary)', fontSize: '14px' }}>
                  Support for single or bulk upload. Only image files are accepted.
                </p>
              </div>
            </Upload>
          </div>
          <div className="example-code">
            <pre>{`<Upload
  type="drag"
  action="https://httpbin.org/post"
  multiple
  accept="image/*"
>
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <Image size={32} />
    <p>Click or drag images to this area to upload</p>
    <p>Support for single or bulk upload. Only image files are accepted.</p>
  </div>
</Upload>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Upload with Validation</h3>
          <p>Use beforeUpload to limit the file type and size.</p>
          <div className="example-demo">
            <Upload
              action="https://httpbin.org/post"
              beforeUpload={beforeUpload}
              accept="image/*"
              maxSize={2 * 1024 * 1024} // 2MB
            >
              <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
                <Camera size={16} style={{ marginRight: '8px' }} />
                Upload Image (Max 2MB)
              </button>
            </Upload>
          </div>
          <div className="example-code">
            <pre>{`const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
    return false;
  }
  return true;
};

<Upload
  action="https://httpbin.org/post"
  beforeUpload={beforeUpload}
  accept="image/*"
  maxSize={2 * 1024 * 1024}
>
  <Button icon={<Camera />}>Upload Image (Max 2MB)</Button>
</Upload>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Picture Wall</h3>
          <p>After users upload picture, the thumbnail will be shown in list. The upload button will disappear when count meets limitation.</p>
          <div className="example-demo">
            <Upload
              listType="picture-card"
              action="https://httpbin.org/post"
              fileList={pictureFileList}
              onChange={handlePictureChange}
              onPreview={(file) => {
                console.log('Preview:', file);
                if (file.url || file.thumbUrl) {
                  window.open(file.url || file.thumbUrl);
                }
              }}
              maxCount={4}
              accept="image/*"
              customRequest={customRequest}
            />
          </div>
          <div className="example-code">
            <pre>{`<Upload
  listType="picture-card"
  action="https://httpbin.org/post"
  fileList={pictureFileList}
  onChange={handlePictureChange}
  onPreview={(file) => {
    if (file.url || file.thumbUrl) {
      window.open(file.url || file.thumbUrl);
    }
  }}
  maxCount={4}
  accept="image/*"
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Picture List</h3>
          <p>If uploaded file is a picture, the thumbnail can be shown. listType should be picture.</p>
          <div className="example-demo">
            <Upload
              listType="picture"
              action="https://httpbin.org/post"
              accept="image/*"
              defaultFileList={[
                {
                  uid: '1',
                  name: 'nature.jpg',
                  status: 'done',
                  size: 1024000,
                  type: 'image/jpeg',
                  url: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
                  thumbUrl: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
                },
                {
                  uid: '2',
                  name: 'landscape.jpg',
                  status: 'done',
                  size: 2048000,
                  type: 'image/jpeg',
                  url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
                  thumbUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
                },
              ]}
              onPreview={(file) => {
                if (file.url || file.thumbUrl) {
                  window.open(file.url || file.thumbUrl);
                }
              }}
              onDownload={(file) => {
                if (file.url) {
                  const link = document.createElement('a');
                  link.href = file.url;
                  link.download = file.name;
                  link.click();
                }
              }}
            />
          </div>
          <div className="example-code">
            <pre>{`<Upload
  listType="picture"
  action="https://httpbin.org/post"
  accept="image/*"
  onPreview={(file) => {
    if (file.url || file.thumbUrl) {
      window.open(file.url || file.thumbUrl);
    }
  }}
  onDownload={(file) => {
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    }
  }}
/>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Custom Request</h3>
          <p>Use customRequest to override default upload behavior, allowing you to customize your own upload implementation.</p>
          <div className="example-demo">
            <Upload
              action="https://httpbin.org/post"
              customRequest={customRequest}
              showUploadList={true}
            >
              <button className="ui-alert-action" style={{ backgroundColor: 'var(--success-color)', color: 'white', borderColor: 'var(--success-color)' }}>
                <UploadIcon size={16} style={{ marginRight: '8px' }} />
                Custom Upload
              </button>
            </Upload>
          </div>
          <div className="example-code">
            <pre>{`const customRequest = ({ file, onSuccess, onError, onProgress }) => {
  // Simulate upload progress
  let progress = 0;
  const timer = setInterval(() => {
    progress += 10;
    onProgress(progress);
    
    if (progress >= 100) {
      clearInterval(timer);
      // Simulate success or error
      if (Math.random() > 0.2) {
        onSuccess({ url: URL.createObjectURL(file) });
      } else {
        onError(new Error('Upload failed'));
      }
    }
  }, 200);
};

<Upload
  action="https://httpbin.org/post"
  customRequest={customRequest}
  showUploadList={true}
>
  <Button>Custom Upload</Button>
</Upload>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Size Variants</h3>
          <p>Upload component supports three sizes: small, medium (default), and large.</p>
          <div className="example-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Small</h4>
                <Upload
                  size="small"
                  action="https://httpbin.org/post"
                >
                  <button className="ui-alert-action">
                    <UploadIcon size={14} style={{ marginRight: '6px' }} />
                    Small Upload
                  </button>
                </Upload>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Medium (Default)</h4>
                <Upload
                  size="medium"
                  action="https://httpbin.org/post"
                >
                  <button className="ui-alert-action" style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderColor: 'var(--primary-color)' }}>
                    <UploadIcon size={16} style={{ marginRight: '8px' }} />
                    Medium Upload
                  </button>
                </Upload>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-color)' }}>Large</h4>
                <Upload
                  size="large"
                  action="https://httpbin.org/post"
                >
                  <button className="ui-alert-action" style={{ backgroundColor: 'var(--success-color)', color: 'white', borderColor: 'var(--success-color)', padding: '12px 20px', fontSize: '16px' }}>
                    <UploadIcon size={18} style={{ marginRight: '10px' }} />
                    Large Upload
                  </button>
                </Upload>
              </div>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<Upload size="small" action="https://httpbin.org/post">
  <Button size="small">Small Upload</Button>
</Upload>

<Upload size="medium" action="https://httpbin.org/post">
  <Button>Medium Upload</Button>
</Upload>

<Upload size="large" action="https://httpbin.org/post">
  <Button size="large">Large Upload</Button>
</Upload>`}</pre>
          </div>
        </div>

        <div className="example-container">
          <h3>Form Integration</h3>
          <p>Upload works seamlessly with form components.</p>
          <div className="example-demo">
            <div style={{ maxWidth: '500px' }}>
              <FormItem label="Profile Picture" help="Upload your profile picture (JPG/PNG, max 2MB)">
                <Upload
                  listType="picture-card"
                  action="https://httpbin.org/post"
                  accept="image/*"
                  maxCount={1}
                  beforeUpload={beforeUpload}
                />
              </FormItem>
              
              <FormItem label="Documents" help="Upload supporting documents">
                <Upload
                  action="https://httpbin.org/post"
                  multiple
                  accept=".pdf,.doc,.docx"
                >
                  <button className="ui-alert-action">
                    <FileText size={16} style={{ marginRight: '8px' }} />
                    Upload Documents
                  </button>
                </Upload>
              </FormItem>
              
              <FormItem label="Attachments" help="Drag and drop files here">
                <Upload
                  type="drag"
                  action="https://httpbin.org/post"
                  multiple
                  maxCount={5}
                />
              </FormItem>
            </div>
          </div>
          <div className="example-code">
            <pre>{`<FormItem label="Profile Picture" help="Upload your profile picture">
  <Upload
    listType="picture-card"
    action="https://httpbin.org/post"
    accept="image/*"
    maxCount={1}
    beforeUpload={beforeUpload}
  />
</FormItem>

<FormItem label="Documents" help="Upload supporting documents">
  <Upload
    action="https://httpbin.org/post"
    multiple
    accept=".pdf,.doc,.docx"
  >
    <Button icon={<FileText />}>Upload Documents</Button>
  </Upload>
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
              <td>accept</td>
              <td>File types that can be accepted</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>action</td>
              <td>Uploading URL</td>
              <td>string</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>beforeUpload</td>
              <td>Hook function which will be executed before uploading</td>
              <td>{'(file, fileList) => boolean | Promise<boolean>'}</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>customRequest</td>
              <td>Override for the default xhr behavior allowing for additional customization</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>data</td>
              <td>Uploading extra params or function which can return uploading extra params</td>
              <td>{'object | (file) => object'}</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>defaultFileList</td>
              <td>Default list of files that have been uploaded</td>
              <td>UploadFile[]</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Disable upload button</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>fileList</td>
              <td>List of files that have been uploaded (controlled)</td>
              <td>UploadFile[]</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>headers</td>
              <td>Set request headers</td>
              <td>object</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>listType</td>
              <td>Built-in stylesheets, support for three types: text, picture or picture-card</td>
              <td>text | picture | picture-card</td>
              <td>text</td>
              <td></td>
            </tr>
            <tr>
              <td>maxCount</td>
              <td>Limit the number of uploaded files</td>
              <td>number</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>maxSize</td>
              <td>Maximum file size in bytes</td>
              <td>number</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>method</td>
              <td>The http method of upload request</td>
              <td>POST | PUT | PATCH</td>
              <td>POST</td>
              <td></td>
            </tr>
            <tr>
              <td>multiple</td>
              <td>Whether to support selected multiple files</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>name</td>
              <td>The name of uploading file</td>
              <td>string</td>
              <td>file</td>
              <td></td>
            </tr>
            <tr>
              <td>showUploadList</td>
              <td>Whether to show default upload list</td>
              <td>boolean | object</td>
              <td>true</td>
              <td></td>
            </tr>
            <tr>
              <td>size</td>
              <td>Size of the upload area</td>
              <td>small | medium | large</td>
              <td>medium</td>
              <td></td>
            </tr>
            <tr>
              <td>type</td>
              <td>Upload type</td>
              <td>select | drag</td>
              <td>select</td>
              <td></td>
            </tr>
            <tr>
              <td>withCredentials</td>
              <td>Ajax upload with cookie sent</td>
              <td>boolean</td>
              <td>false</td>
              <td></td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>A callback function, can be executed when uploading state is changing</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onDownload</td>
              <td>Click the method to download the file</td>
              <td>{'(file) => void'}</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onError</td>
              <td>A callback function, will be executed when upload error</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onPreview</td>
              <td>A callback function, will be executed when file link or preview icon is clicked</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onProgress</td>
              <td>A callback function, will be executed when upload progress is changing</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onRemove</td>
              <td>A callback function, will be executed when file is removed</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
            <tr>
              <td>onSuccess</td>
              <td>A callback function, will be executed when upload successfully</td>
              <td>function</td>
              <td>-</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>UploadFile</h2>
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
              <td>uid</td>
              <td>Unique file identifier</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>name</td>
              <td>File name</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>size</td>
              <td>File size in bytes</td>
              <td>number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>type</td>
              <td>File MIME type</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>status</td>
              <td>Upload status</td>
              <td>uploading | done | error | removed</td>
              <td>-</td>
            </tr>
            <tr>
              <td>percent</td>
              <td>Upload progress percentage</td>
              <td>number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>url</td>
              <td>File URL</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>thumbUrl</td>
              <td>Thumbnail URL</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>response</td>
              <td>Server response</td>
              <td>any</td>
              <td>-</td>
            </tr>
            <tr>
              <td>error</td>
              <td>Upload error</td>
              <td>any</td>
              <td>-</td>
            </tr>
            <tr>
              <td>originFileObj</td>
              <td>Original file object</td>
              <td>File</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="docs-section">
        <h2>Design Guidelines</h2>
        
        <h3>Usage Principles</h3>
        <ul>
          <li><strong>Clear Instructions:</strong> Provide clear guidance on what files are accepted and any size limitations</li>
          <li><strong>Progress Feedback:</strong> Show upload progress and status to keep users informed</li>
          <li><strong>Error Handling:</strong> Display helpful error messages when uploads fail</li>
          <li><strong>File Management:</strong> Allow users to preview, download, and remove uploaded files</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use appropriate list types based on content (text for documents, picture for images)</li>
          <li>Set reasonable file size and count limits</li>
          <li>Validate files before upload to provide immediate feedback</li>
          <li>Use drag and drop for better user experience when uploading multiple files</li>
          <li>Provide preview functionality for images and documents</li>
          <li>Show clear upload status and progress indicators</li>
        </ul>

        <h3>Accessibility</h3>
        <ul>
          <li>Upload areas are keyboard accessible with proper focus management</li>
          <li>Screen reader friendly with appropriate ARIA labels</li>
          <li>Clear visual feedback for drag and drop states</li>
          <li>Sufficient color contrast for all text and icons</li>
          <li>Proper error announcements for screen readers</li>
        </ul>
      </div>
    </div>
  );
};