import React, { forwardRef, useState, useRef, useCallback, useImperativeHandle } from 'react';
import { 
  Upload as UploadIcon, 
  File, 
  Image, 
  CheckCircle, 
  XCircle, 
  X, 
  Eye, 
  Download,
  Loader2
} from 'lucide-react';
import './Upload.css';

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  percent?: number;
  url?: string;
  thumbUrl?: string;
  response?: any;
  error?: any;
  originFileObj?: File;
}

export interface UploadProps {
  /** Upload type */
  type?: 'select' | 'drag';
  /** Upload list type */
  listType?: 'text' | 'picture' | 'picture-card';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether to accept multiple files */
  multiple?: boolean;
  /** Accepted file types */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxCount?: number;
  /** Whether disabled */
  disabled?: boolean;
  /** Show upload list */
  showUploadList?: boolean;
  /** File list */
  fileList?: UploadFile[];
  /** Default file list */
  defaultFileList?: UploadFile[];
  /** Upload action URL */
  action?: string;
  /** Upload method */
  method?: 'POST' | 'PUT' | 'PATCH';
  /** Upload headers */
  headers?: Record<string, string>;
  /** Upload data */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /** Upload name */
  name?: string;
  /** With credentials */
  withCredentials?: boolean;
  /** Custom upload request */
  customRequest?: (options: {
    file: File;
    filename: string;
    action: string;
    headers: Record<string, string>;
    data: Record<string, any>;
    withCredentials: boolean;
    onProgress: (percent: number) => void;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
  }) => void;
  /** Before upload hook */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /** File change callback */
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  /** Upload progress callback */
  onProgress?: (percent: number, file: UploadFile) => void;
  /** Upload success callback */
  onSuccess?: (response: any, file: UploadFile) => void;
  /** Upload error callback */
  onError?: (error: any, file: UploadFile) => void;
  /** File remove callback */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  /** File preview callback */
  onPreview?: (file: UploadFile) => void;
  /** File download callback */
  onDownload?: (file: UploadFile) => void;
  /** Custom upload text */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Upload area props */
  uploadAreaProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface UploadRef {
  upload: () => void;
  abort: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (file: UploadFile) => {
  if (file.type.startsWith('image/')) {
    return <Image size={16} />;
  }
  return <File size={16} />;
};

const generateUID = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const Upload = forwardRef<UploadRef, UploadProps>(({
  type = 'select',
  listType = 'text',
  size = 'medium',
  multiple = false,
  accept,
  maxSize,
  maxCount,
  disabled = false,
  showUploadList = true,
  fileList,
  defaultFileList = [],
  action,
  method = 'POST',
  headers = {},
  data = {},
  name = 'file',
  withCredentials = false,
  customRequest,
  beforeUpload,
  onChange,
  onProgress,
  onSuccess,
  onError,
  onRemove,
  onPreview,
  onDownload,
  children,
  className = '',
  style,
  uploadAreaProps = {},
  ...props
}, ref) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRequestsRef = useRef<Map<string, XMLHttpRequest>>(new Map());

  const isControlled = fileList !== undefined;
  const currentFileList = isControlled ? fileList : internalFileList;

  useImperativeHandle(ref, () => ({
    upload: () => {
      // Trigger upload for files with status 'ready'
      currentFileList.forEach(file => {
        if (file.status === 'uploading') {
          uploadFile(file);
        }
      });
    },
    abort: () => {
      // Abort all ongoing uploads
      uploadRequestsRef.current.forEach(xhr => {
        xhr.abort();
      });
      uploadRequestsRef.current.clear();
    }
  }));

  const updateFileList = useCallback((newFileList: UploadFile[]) => {
    if (!isControlled) {
      setInternalFileList(newFileList);
    }
    if (newFileList.length > 0) {
      onChange?.({ file: newFileList[newFileList.length - 1], fileList: newFileList });
    }
  }, [isControlled, onChange]);

  const uploadFile = useCallback((file: UploadFile) => {
    if (!action && !customRequest) {
      console.warn('Upload: action or customRequest is required');
      return;
    }

    const updateFile = (updates: Partial<UploadFile>) => {
      const newFileList = currentFileList.map(f => 
        f.uid === file.uid ? { ...f, ...updates } : f
      );
      updateFileList(newFileList);
    };

    if (customRequest) {
      const requestData = typeof data === 'function' ? data(file.originFileObj!) : data;
      
      customRequest({
        file: file.originFileObj!,
        filename: file.name,
        action: action!,
        headers,
        data: requestData,
        withCredentials,
        onProgress: (percent) => {
          updateFile({ percent, status: 'uploading' });
          onProgress?.(percent, file);
        },
        onSuccess: (response) => {
          updateFile({ status: 'done', response, percent: 100 });
          onSuccess?.(response, file);
        },
        onError: (error) => {
          updateFile({ status: 'error', error });
          onError?.(error, file);
        }
      });
      return;
    }

    // Default upload implementation
    const xhr = new XMLHttpRequest();
    uploadRequestsRef.current.set(file.uid, xhr);

    const formData = new FormData();
    formData.append(name, file.originFileObj!);

    const requestData = typeof data === 'function' ? data(file.originFileObj!) : data;
    Object.keys(requestData).forEach(key => {
      formData.append(key, requestData[key]);
    });

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        updateFile({ percent, status: 'uploading' });
        onProgress?.(percent, file);
      }
    };

    xhr.onload = () => {
      uploadRequestsRef.current.delete(file.uid);
      
      if (xhr.status >= 200 && xhr.status < 300) {
        let response;
        try {
          response = JSON.parse(xhr.responseText);
        } catch {
          response = xhr.responseText;
        }
        updateFile({ status: 'done', response, percent: 100 });
        onSuccess?.(response, file);
      } else {
        const error = new Error(`Upload failed with status ${xhr.status}`);
        updateFile({ status: 'error', error });
        onError?.(error, file);
      }
    };

    xhr.onerror = () => {
      uploadRequestsRef.current.delete(file.uid);
      const error = new Error('Upload failed');
      updateFile({ status: 'error', error });
      onError?.(error, file);
    };

    xhr.onabort = () => {
      uploadRequestsRef.current.delete(file.uid);
    };

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.withCredentials = withCredentials;
    xhr.open(method, action!);
    xhr.send(formData);

    updateFile({ status: 'uploading', percent: 0 });
  }, [action, customRequest, headers, data, name, withCredentials, method, currentFileList, updateFileList, onProgress, onSuccess, onError]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (disabled) return;

    const fileArray = Array.from(files);
    
    // Check max count
    if (maxCount && currentFileList.length + fileArray.length > maxCount) {
      console.warn(`Upload: Cannot upload more than ${maxCount} files`);
      return;
    }

    const newFiles: UploadFile[] = [];

    for (const file of fileArray) {
      // Check file size
      if (maxSize && file.size > maxSize) {
        console.warn(`Upload: File ${file.name} is too large`);
        continue;
      }

      // Check before upload
      if (beforeUpload) {
        try {
          const result = await beforeUpload(file, fileArray);
          if (!result) continue;
        } catch (error) {
          console.warn('Upload: beforeUpload failed', error);
          continue;
        }
      }

      const newUploadFile: UploadFile = {
        uid: generateUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        originFileObj: file,
      };

      // Generate thumbnail for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newUploadFile.thumbUrl = e.target?.result as string;
          // Force re-render by updating the file list
          const updatedList = currentFileList.map(f => 
            f.uid === newUploadFile.uid ? { ...f, thumbUrl: newUploadFile.thumbUrl } : f
          );
          updateFileList(updatedList);
        };
        reader.readAsDataURL(file);
      }
      
      // Add all files to the list immediately
      newFiles.push(newUploadFile);
    }

    if (newFiles.length > 0) {
      const updatedFileList = [...currentFileList, ...newFiles];
      updateFileList(updatedFileList);

      // Start uploading
      newFiles.forEach(file => {
        uploadFile(file);
      });
    }
  }, [disabled, maxCount, maxSize, beforeUpload, currentFileList, updateFileList, uploadFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleAreaClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current?.click();
    }
  };

  const handleClick = () => {
    // This function is intentionally empty to prevent default behavior
  };

  const handleRemove = async (file: UploadFile) => {
    if (onRemove) {
      try {
        const result = await onRemove(file);
        if (!result) return;
      } catch (error) {
        console.warn('Upload: onRemove failed', error);
        return;
      }
    }

    // Abort upload if in progress
    const xhr = uploadRequestsRef.current.get(file.uid);
    if (xhr) {
      xhr.abort();
      uploadRequestsRef.current.delete(file.uid);
    }

    const newFileList = currentFileList.filter(f => f.uid !== file.uid);
    updateFileList(newFileList);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && type === 'drag') {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (!disabled && type === 'drag') {
      const files = e.dataTransfer.files;
      if (files) {
        handleFileSelect(files);
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    }
  };

  // Build class names
  const baseClass = 'ui-upload';
  const sizeClass = `ui-upload--${size}`;
  const typeClass = listType !== 'text' ? `ui-upload--${listType}` : '';

  const classes = [baseClass, sizeClass, typeClass, className].filter(Boolean).join(' ');

  const areaClasses = [
    'ui-upload-area',
    dragOver && 'ui-upload-area--drag-over',
    disabled && 'ui-upload-area--disabled'
  ].filter(Boolean).join(' ');

  const renderUploadArea = () => {
    if (listType === 'picture-card' && maxCount && currentFileList.length >= maxCount) {
      return null;
    }

    return (
      <div
        {...uploadAreaProps}
        className={areaClasses}
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Upload files"
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          type="file"
          className="ui-upload-input"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
        />

        {children || (
          <>
            <div className="ui-upload-icon">
              <UploadIcon size={listType === 'picture-card' ? 24 : 32} />
            </div>
            <div className="ui-upload-text">
              {type === 'drag' ? 'Click or drag file to this area to upload' : 'Click to upload'}
            </div>
            {type === 'drag' && (
              <p className="ui-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
              </p>
            )}
            {listType === 'text' && (
              <button type="button" className="ui-upload-button">
                <UploadIcon size={16} />
                Upload
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  const renderFileList = () => {
    if (!showUploadList) {
      return null;
    }

    if (currentFileList.length === 0) {
      return null;
    }

    if (listType === 'picture-card') {
      return (
        <div className="ui-upload-picture-card-list">
          {currentFileList.map(file => (
            <div key={file.uid} className="ui-upload-picture-card-item">
              {file.thumbUrl || file.url ? (
                <img
                  src={file.thumbUrl || file.url}
                  alt={file.name}
                  className="ui-upload-picture-card-image"
                />
              ) : (
                <div className="ui-upload-picture-card-placeholder">
                  <Image size={32} />
                </div>
              )}
              
              <div className="ui-upload-picture-card-actions">
                {onPreview && (
                  <button
                    type="button"
                    className="ui-upload-picture-card-action"
                    onClick={() => onPreview(file)}
                    aria-label="Preview"
                  >
                    <Eye size={16} />
                  </button>
                )}
                {onDownload && file.url && (
                  <button
                    type="button"
                    className="ui-upload-picture-card-action"
                    onClick={() => onDownload(file)}
                    aria-label="Download"
                  >
                    <Download size={16} />
                  </button>
                )}
                <button
                  type="button"
                  className="ui-upload-picture-card-action"
                  onClick={() => handleRemove(file)}
                  aria-label="Remove"
                >
                  <X size={16} />
                </button>
              </div>
              
              {file.status === 'uploading' && file.percent !== undefined && (
                <div className="ui-upload-progress">
                  <div 
                    className="ui-upload-progress-bar"
                    style={{ width: `${file.percent}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="ui-upload-list">
        {currentFileList.map(file => {
          const itemClasses = [
            'ui-upload-list-item',
            `ui-upload-list-item--${file.status}`
          ].filter(Boolean).join(' ');

          return (
            <div key={file.uid} className={itemClasses}>
              <div className="ui-upload-file-icon">
                {getFileIcon(file)}
              </div>
              
              <div className="ui-upload-file-info">
                <div className="ui-upload-file-name">{file.name}</div>
                <div className="ui-upload-file-size">{formatFileSize(file.size)}</div>
                
                {file.status === 'uploading' && file.percent !== undefined && (
                  <div className="ui-upload-progress">
                    <div 
                      className="ui-upload-progress-bar"
                      style={{ width: `${file.percent}%` }}
                    />
                  </div>
                )}
              </div>
              
              <div className="ui-upload-file-status">
                {file.status === 'uploading' && (
                  <Loader2 size={16} className="ui-upload-status-icon ui-upload-status-icon--uploading" />
                )}
                {file.status === 'done' && (
                  <CheckCircle size={16} className="ui-upload-status-icon" />
                )}
                {file.status === 'error' && (
                  <XCircle size={16} className="ui-upload-status-icon ui-upload-status-icon--error" />
                )}
                
                <button
                  type="button"
                  className="ui-upload-remove"
                  onClick={() => handleRemove(file)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (listType === 'picture-card') {
    return (
      <div className={classes} style={style} {...props}>
        <div className="ui-upload-picture-card-list">
          {renderFileList()}
          {renderUploadArea()}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} style={style} {...props}>
      {renderUploadArea()}
      {renderFileList()}
    </div>
  );
});

Upload.displayName = 'Upload';