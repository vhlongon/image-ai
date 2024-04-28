'use client';

import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { ReactNode, useRef } from 'react';
import { Mode } from './image-editor-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
  onUpload: (blob: string, name: string) => void;
  onDownload: () => void;
  onCrop: () => void;
  mode: Mode;
  children?: ReactNode;
}

export const ActionButtons = ({
  onUpload,
  onDownload,
  onCrop,
  mode,
  children,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.[0]) {
      const name = files[0].name;
      onUpload?.(URL.createObjectURL(files[0]), name);
    }

    event.target.value = '';
  };

  return (
    <div className="flex gap-4 w-full justify-center">
      <Button
        variant="outline"
        className="gap-2"
        type="button"
        onClick={onUploadButtonClick}
      >
        <UploadIcon />
        <Input
          ref={inputRef}
          name="image"
          type="file"
          max={1}
          accept="image/*"
          className="hidden"
          onChange={onLoadImage}
        />
        Upload
      </Button>

      {mode === 'crop' && (
        <Button type="button" variant="outline" onClick={onCrop}>
          Crop
        </Button>
      )}

      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={onDownload}
      >
        <DownloadIcon />
        Download
      </Button>
      <div>{children}</div>
    </div>
  );
};
