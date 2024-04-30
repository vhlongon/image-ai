import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const POST = async (request: Request, res: Response) => {
  const formData = await request.formData();
  const image = formData.get('image') as File;
  const prompt = formData.get('prompt') as string;
  const mask = formData.get('mask') as File;

  console.log('🚀 ~ process.env.OPEN_AI_KEY:', process.env.OPEN_AI_KEY);

  try {
    const response = await openai.images.edit({
      model: 'dall-e-2',
      image,
      mask,
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const editImage = response.data[0].b64_json;

    return Response.json({ error: null, image: editImage }, { status: 200 });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : error && typeof error === 'object' && 'response' in error
        ? JSON.stringify(error.response)
        : 'Something went wrong generating image';

    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
