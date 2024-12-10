import * as tf from '@tensorflow/tfjs-node';

interface EmotionMetrics {
  confidence: number;
  stress: number;
  engagement: number;
  emotions: {
    neutral: number;
    happy: number;
    anxious: number;
    confused: number;
  };
}

let model: tf.LayersModel | null = null;

async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('file://./models/emotion/model.json');
  }
  return model;
}

export async function analyzeEmotions(
  audioFeatures: Float32Array,
  facialFeatures?: Float32Array
): Promise<EmotionMetrics> {
  const model = await loadModel();
  
  // Prepare input tensors
  const audioTensor = tf.tensor2d([Array.from(audioFeatures)]);
  const facialTensor = facialFeatures 
    ? tf.tensor2d([Array.from(facialFeatures)])
    : tf.zeros([1, 128]); // Default features if facial not available
  
  // Run inference
  const predictions = await model.predict([audioTensor, facialTensor]) as tf.Tensor;
  const results = await predictions.array();
  
  // Process results
  return {
    confidence: results[0][0],
    stress: results[0][1],
    engagement: results[0][2],
    emotions: {
      neutral: results[0][3],
      happy: results[0][4],
      anxious: results[0][5],
      confused: results[0][6],
    },
  };
}