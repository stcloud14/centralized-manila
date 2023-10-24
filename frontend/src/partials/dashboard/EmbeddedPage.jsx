import React from 'react';

function EmbeddedPage() {
  return (
    <iframe
      title="Embedded Page"
      src="https://www.gomanila.com/news"
      style={{ width: '100%', minHeight: '560px', border: 'none'}}
    />
  );
}

export default EmbeddedPage;
