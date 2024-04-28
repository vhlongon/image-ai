'use client';

import { editImageAction } from '@/app/actions/edit-image';
import { editFileName, getCroppedImageSrc } from '@/lib/image';
import { useRef, useState } from 'react';
import {
  Coordinates,
  CropperRef,
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { useFormState } from 'react-dom';
import { ActionButtons } from './action-buttons';
import { SubmitButton } from './submit-button';
import { ImageSelector } from './image-selector';

export type Mode = 'crop' | 'select' | 'iddle' | 'generate';
export type Image = { src: string; name: string };

export const ImageEditorForm = () => {
  const [state, formAction] = useFormState(editImageAction, undefined);
  const cropperRef = useRef<FixedCropperRef>(null);
  const [image, setImage] = useState<Image>({ src: '', name: '' });
  const [mode, setMode] = useState<Mode>('iddle');
  const [selectionRect, setSelectionRect] = useState<Coordinates | null>();

  const isSelecting = mode === 'select';

  const crop = async () => {
    const imageSrc = await getCroppedImageSrc(cropperRef);

    if (imageSrc) {
      setImage({ src: imageSrc, name: image.name });
      setMode('select');
    }
  };

  const downloadImage = (objectUrl: string, imageName: string) => {
    const name = editFileName(imageName);
    const linkElement = document.createElement('a');
    linkElement.download = name;
    linkElement.href = objectUrl;
    linkElement.click();
  };

  const onUpload = (src: string, name: string) => {
    setImage({ src, name });
    setMode('crop');
  };

  const onDownload = async () => {
    if (isSelecting) {
      downloadImage(image.src, image.name);
      return;
    }

    const imageSrc = await getCroppedImageSrc(cropperRef);

    if (imageSrc) {
      downloadImage(imageSrc, image.name);
    }
  };

  const onSelectionChange = (cropper: CropperRef) => {
    setSelectionRect(cropper.getCoordinates());
  };

  const isReadyToSubmit = mode === 'generate';

  //TODO: implement mask generation

  return (
    <form action={formAction} className="w-dvw max-w-5xl">
      <div className="w-full p-2 overflow-hidden">
        {isSelecting ? (
          <ImageSelector
            src={image.src}
            onSelectionChange={onSelectionChange}
          />
        ) : (
          <FixedCropper
            src={image.src}
            ref={cropperRef}
            className={`h-[600px] border-[1px] border-var(--border) rounded-md`}
            wrapperComponent={({ children, ...props }) => {
              return (
                <div {...props} style={{ background: 'transparent' }}>
                  {children}
                </div>
              );
            }}
            stencilProps={{
              movable: false,
              resizable: false,
              lines: false,
              handlers: false,
            }}
            stencilSize={{
              width: 600,
              height: 600,
            }}
            imageRestriction={ImageRestriction.stencil}
          />
        )}
        <div className="mt-4">
          <ActionButtons
            mode={mode}
            onUpload={onUpload}
            onDownload={onDownload}
            onCrop={crop}
          >
            {isReadyToSubmit && (
              <SubmitButton loadingText="Editing..." text="Submit" />
            )}
          </ActionButtons>
        </div>
      </div>
    </form>
  );
};
