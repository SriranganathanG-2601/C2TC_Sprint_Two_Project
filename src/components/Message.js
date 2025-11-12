import React from 'react';

function Message({ message, type }) {
  return (
    <div className="message-container">
      <div className={`message ${type}`}>
        {message}
      </div>
    </div>
  );
}

export default Message;
