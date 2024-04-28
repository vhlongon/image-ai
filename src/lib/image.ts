import { RefObject } from 'react';
import { FixedCropperRef } from 'react-advanced-cropper';

export const getCanvasData = async (canvas: HTMLCanvasElement | null) => {
  return new Promise((resolve, reject) => {
    canvas?.toBlob(resolve);
  });
};

export const getCroppedImageSrc = async (
  cropperRef: RefObject<FixedCropperRef>
) => {
  if (!cropperRef.current) return;

  const canvas = cropperRef.current.getCanvas({
    height: 1024,
    width: 1024,
  });

  if (!canvas) return;

  const blob = (await getCanvasData(canvas)) as Blob;

  return blob ? URL.createObjectURL(blob) : null;
};

export const editFileName = (filename: string) => {
  const dotIndex = filename.lastIndexOf('.');
  const name = filename.substring(0, dotIndex);
  const extension = filename.substring(dotIndex);
  return `${name}-edit${extension}`;
};
