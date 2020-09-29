import React from 'react';

import '../Add/styles.css';
import './styles.css';

interface RemoveProps {
  del(): any,
  close(): any,
}

const Remove: React.FC<RemoveProps> = ({del, close}) => {
  return (
    <div id="Remove" className="Main">
      <div className="popup">
        <h3>Are you sure you want to delete this?</h3>
        <div>
          <button onClick={close} className="secondary">Cancel</button>
          <button onClick={del}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Remove;