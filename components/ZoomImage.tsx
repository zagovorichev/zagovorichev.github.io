'use client';

import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

/** Article image that opens full-size in a native <dialog> on click. */
export default function ZoomImage({src, alt}: {src: string; alt: string}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  return (
    <>
      <button type="button" className="zoom-trigger" onClick={() => setOpen(true)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
        <img src={src} alt={alt} className="article-img" loading="lazy" />
      </button>
      {/* The image sits inside a markdown <p>, where a <dialog> is invalid HTML and breaks hydration,
          so the dialog is rendered into <body>, and only while open */}
      {open &&
        createPortal(
          <dialog ref={dialog} className="zoom-dialog" onClick={() => dialog.current?.close()} onClose={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} />
          </dialog>,
          document.body,
        )}
    </>
  );
}
