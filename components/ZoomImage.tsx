'use client';

import {useRef} from 'react';

/** Article image that opens full-size in a native <dialog> on click. */
export default function ZoomImage({src, alt}: {src: string; alt: string}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className="zoom-trigger" onClick={() => dialog.current?.showModal()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
        <img src={src} alt={alt} className="article-img" loading="lazy" />
      </button>
      <dialog ref={dialog} className="zoom-dialog" onClick={() => dialog.current?.close()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </dialog>
    </>
  );
}
