'use client';

import {
  dataURLToBlob,
  editFileName,
  getCroppedImageSrc,
  getImageData,
  getMaskData,
} from '@/lib/image';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import {
  Coordinates,
  CropperRef,
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { ActionButtons } from './action-buttons';
import { ImageSelector } from './image-selector';

export type Mode = 'crop' | 'select' | 'iddle' | 'generate';
export type Image = { src: string; name: string };

const downloadImage = (objectUrl: string, imageName: string) => {
  const name = editFileName(imageName);
  const linkElement = document.createElement('a');
  linkElement.download = name;
  linkElement.href = objectUrl;
  linkElement.click();
};

export const ImageEditorForm = () => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [image, setImage] = useState<Image>({ src: '', name: '' });
  const [mode, setMode] = useState<Mode>('iddle');
  const [isLoading, setIsLoading] = useState(false);
  const [selectionRect, setSelectionRect] = useState<Coordinates | null>();
  const formRef = useRef<HTMLFormElement>(null);

  const isGenerating = mode === 'generate';

  const crop = async () => {
    const imageSrc = await getCroppedImageSrc(cropperRef);

    if (imageSrc) {
      setImage({ src: imageSrc, name: image.name });
      setMode('generate');
    }
  };

  const onUpload = (src: string, name: string) => {
    setImage({ src, name });
    setMode('crop');
  };

  const onDownload = async () => {
    if (isGenerating) {
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

  const onGenerate = async (prompt: string) => {
    const imageData = await getImageData(image.src);
    const mask = await getMaskData(image.src, selectionRect);

    if (!imageData || !mask || !prompt) {
      return;
    }

    const formData = new FormData();

    formData.append('image', imageData);
    formData.append('mask', mask);
    formData.append('prompt', prompt);
    formData.append('response_format', 'b64_json');

    try {
      setIsLoading(true);
      const response = await fetch('/images/edit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.image) {
        const blob = dataURLToBlob(data.image, 'image/png');

        setImage(image => ({
          src: URL.createObjectURL(blob),
          name: image.name,
        }));
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={e => e.preventDefault()}
      className="w-dvw max-w-5xl"
    >
      <div className="w-full p-2 overflow-hidden">
        {isGenerating ? (
          <div className="h-[600px] relative">
            {isLoading && (
              <div className="z-10 absolute brightness-50 opacity-80 bg-black lef-0 top-0 w-full h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-lg text-white">Generating edit...</p>
                </div>
              </div>
            )}
            <ImageSelector
              src={image.src}
              selectionRect={selectionRect}
              onSelectionChange={onSelectionChange}
            />
          </div>
        ) : (
          <FixedCropper
            src={image.src}
            ref={cropperRef}
            className={cn(
              `h-[600px] border-[1px] border-var(--border) rounded-md`,
              'backdrop-filter backdrop-blur-lg'
            )}
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
              lines: true,
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
            onGenerate={onGenerate}
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};
