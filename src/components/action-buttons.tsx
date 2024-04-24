'use client';

import { useRef } from 'react';
import { UploadIcon, DownloadIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Props {
  onUpload?: (blob: string) => void;
  onDownload?: () => void;
}

export default function ActionButtons({ onUpload, onDownload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.[0]) {
      onUpload?.(URL.createObjectURL(files[0]));
    }

    event.target.value = '';
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" className="gap-2">
        <UploadIcon onClick={onUploadButtonClick} />
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="hidden"
        />
        Upload
      </Button>
      <Button variant="outline" className="gap-2">
        <DownloadIcon onClick={onDownload} />
        Download
      </Button>
    </div>
  );
}
