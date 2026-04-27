import React from 'react';
import './WorkHistory.css';

const WorkHistory: React.FC = () => {
  return (
    <div className="work-history">
      <h3>Professional Experience</h3>
      <p className="experience-caption">
        Contributing to digital solutions at ZB Bank Financial Services Group (20XX - 20XX).
      </p>
      <button
        onClick={() => window.open('https://www.zb.co.zw/', '_blank', 'noopener,noreferrer')}
        className="company-button"
      >
        <span className="button-text">Visit ZB Bank Group</span>
        <svg className="external-icon" viewBox="0 0 24 24" width="16" height="16">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </button>
    </div>
  );
};

export default WorkHistory;