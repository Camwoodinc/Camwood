import React, { useState } from 'react';

const Callout = ({ id, icon, title, description, moreText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      id={id}
      className="callout"
      role="button"
      tabIndex="0"
      aria-expanded={isExpanded}
      onClick={toggleExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpanded();
        }
      }}
    >
      {icon}
      <div>
        <strong>{title}</strong>
        {description}
        {moreText && <div className="more">{moreText}</div>}
      </div>
      {moreText && <span className="chev" aria-hidden="true">▾</span>}
    </div>
  );
};

export default Callout;