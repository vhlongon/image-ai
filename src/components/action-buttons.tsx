'use client';

import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { Mode } from './image-editor-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
  children?: ReactNode;
  isLoading: boolean;
  mode: Mode;
  onCrop: () => void;
  onDownload: () => void;
  onGenerate: (prompt: string) => void;
  onUpload: (blob: string, name: string) => void;
}

export const ActionButtons = ({
  children,
  isLoading,
  mode,
  onCrop,
  onDownload,
  onGenerate,
  onUpload,
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

  const [prompt, setPrompt] = useState('');
  const canGenerate = Boolean(prompt);

  const onPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="flex gap-4 w-full justify-center">
      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={onUploadButtonClick}
      >
        <UploadIcon />
        <Input
          ref={inputRef}
          name="originImage"
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

      {mode === 'generate' && (
        <div className="flex flex-col grow md:flex-row gap-2">
          <Input
            onChange={onPromptChange}
            value={prompt}
            type="text"
            name="prompt"
          />
          <Button
            type="button"
            disabled={!canGenerate || isLoading}
            color="red"
            onClick={e => {
              onGenerate(prompt);
            }}
          >
            {isLoading ? 'generating...' : 'Generate'}
          </Button>
        </div>
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
