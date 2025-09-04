import React from 'react';

const AIFooter = () => {
  return (
    <footer>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          ©️ <span id="y">{new Date().getFullYear()}</span> Camwood, Inc. • Built with intent • <a href="#overview">Back to top</a>
        </div>
        <div className="chip" title="Theme & a11y">Theme toggle • Motion-aware • Keyboard nav</div>
      </div>
    </footer>
  );
};

export default AIFooter;