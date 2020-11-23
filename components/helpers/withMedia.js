import React, { useEffect, useState } from 'react';

function getMedia() {
  if (!window) return 'xl';
  if (window.innerWidth >= 1440) return 'xl';
  if (window.innerWidth >= 1024) return 'lg';
  if (window.innerWidth >= 576) return 'md';
  return 'sm';
}

const withMedia = Component => {
  const MediaComponent = props => {
    const [media, setMedia] = useState('sm');

    const handleMedia = event => {
      const m = getMedia();
      const origin = localStorage.getItem('media');
      if (!event || origin !== m) {
        localStorage.setItem('media', m);
        setMedia(m);
      }
    };

    useEffect(() => {
      handleMedia();
      window.onresize = handleMedia;

      return () => {
        window.onresize = undefined;
      };
    }, []);

    return (
      <Component
        {...props}
        media={media}
      />
    );
  };

  MediaComponent.getInitialProps = Component.getInitialProps;

  return MediaComponent;
};

export default withMedia;
