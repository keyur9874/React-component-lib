import React from 'react';
import { Avatar } from '../components/Avatar/Avatar';

export const AvatarStories: React.FC = () => {
  return (
    <div className="story-container">
      <h2>Avatar Component</h2>
      
      <div className="story-section">
        <h3>Sizes</h3>
        <div className="story-grid">
          <Avatar size="small">John Doe</Avatar>
          <Avatar size="medium">Jane Smith</Avatar>
          <Avatar size="large">Bob Johnson</Avatar>
          <Avatar size="xlarge">Alice Brown</Avatar>
        </div>
      </div>

      <div className="story-section">
        <h3>Shapes</h3>
        <div className="story-grid">
          <Avatar shape="circle">Circle</Avatar>
          <Avatar shape="square">Square</Avatar>
        </div>
      </div>

      <div className="story-section">
        <h3>With Images</h3>
        <div className="story-grid">
          <Avatar 
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
            alt="Profile 1"
          />
          <Avatar 
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
            alt="Profile 2"
          />
          <Avatar 
            src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
            alt="Profile 3"
          />
        </div>
      </div>

      <div className="story-section">
        <h3>Initials</h3>
        <div className="story-grid">
          <Avatar>John Doe</Avatar>
          <Avatar>Jane Smith</Avatar>
          <Avatar>Bob Johnson</Avatar>
          <Avatar>Alice Brown</Avatar>
          <Avatar>Michael Wilson</Avatar>
        </div>
      </div>

      <div className="story-section">
        <h3>Interactive</h3>
        <div className="story-grid">
          <Avatar onClick={() => alert('Avatar clicked!')}>
            Clickable
          </Avatar>
          <Avatar 
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
            onClick={() => alert('Profile clicked!')}
          />
        </div>
      </div>
    </div>
  );
};