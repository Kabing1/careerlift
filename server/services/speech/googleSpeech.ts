import speech from '@google-cloud/speech';

const client = new speech.SpeechClient();

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const audio = {
    content: audioBuffer.toString('base64'),
  };
  
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    enableAutomaticPunctuation: true,
    model: 'latest_long',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  return response.results
    ?.map(result => result.alternatives?.[0].transcript)
    .join('\n') || '';
}