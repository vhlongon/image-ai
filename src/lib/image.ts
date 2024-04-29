import { RefObject } from 'react';
import { Coordinates, FixedCropperRef } from 'react-advanced-cropper';
import { createCanvas, drawImage, drawMask, getCanvasData } from './canvas';

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

export const getImageData = async (src?: string): Promise<Blob | null> => {
  if (!src) {
    return null;
  }

  const canvas = document.createElement('canvas');
  await drawImage(canvas, src);

  return getCanvasData(canvas);
};

export const getMaskData = async (
  src?: string,
  selectionRect?: Coordinates | null
): Promise<Blob | null> => {
  if (!src || !selectionRect) {
    return null;
  }

  const canvas = createCanvas();

  await drawImage(canvas, src);
  drawMask(canvas, selectionRect);

  return getCanvasData(canvas);
};

export const dataURLToBlob = (dataURL: string, type: string) => {
  var binary = atob((dataURL || '').trim());
  var array = new Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new Blob([new Uint8Array(array)], { type });
};
