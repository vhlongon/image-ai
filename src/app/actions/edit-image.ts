'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

type FormState = Partial<{
  error: string | null;
  response: string;
}>;

export const editImageAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  const image = formData.get('image') as File;
  const prompt = formData.get('promp') as string;

  // TODO: Implement the edit image action

  // const response = await openai.images.edit({
  //   model: 'dall-e-2',
  //   image: fs.createReadStream('image-edit.png'),
  //   mask: fs.createReadStream('mask.png'),
  //   prompt: 'A sunlit indoor lounge area with a pool containing a flamingo',
  //   n: 1,
  //   size: '1024x1024',
  // });

  return { error: null, response: 'response' };
};
