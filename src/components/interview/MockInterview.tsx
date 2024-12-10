import React from 'react';
import { Video, Mic, Camera, Settings, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../Button';
import InterviewSettings from './InterviewSettings';
import InterviewFeedback from './InterviewFeedback';
import RealTimeFeedback from './RealTimeFeedback';
import PanelSimulator from './PanelSimulator';
import BehavioralQuestions from './BehavioralQuestions';

type InterviewState = 'setup' | 'recording' | 'feedback';
type InterviewMode = 'single' | 'panel';

export default function MockInterview() {
  const [interviewState, setInterviewState] = React.useState<InterviewState>('setup');
  const [interviewMode, setInterviewMode] = React.useState<InterviewMode>('single');
  const [currentQuestion, setCurrentQuestion] = React.useState('');
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (interviewState === 'recording') {
      initializeVideo();
    }
    return () => {
      // Cleanup video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [interviewState]);

  const initializeVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsVideoReady(true);
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Unable to access camera and microphone. Please ensure you have granted the necessary permissions.');
    }
  };

  const handleStart = (settings: {
    jobRole: string;
    duration: number;
    difficulty: string;
    focusAreas: string[];
    mode: InterviewMode;
  }) => {
    setInterviewMode(settings.mode);
    setInterviewState('recording');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {interviewState === 'setup' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Advanced Mock Interview
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Practice with AI-powered interviews and receive real-time coaching
              </p>
            </div>
            <InterviewSettings onStart={handleStart} />
            <BehavioralQuestions />
          </div>
        )}

        {interviewState === 'recording' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Camera className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    Current Question
                  </h3>
                  <p className="mt-2 text-gray-700">{currentQuestion || 'Loading question...'}</p>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <Button variant="secondary" className="flex-1">Previous</Button>
                <Button variant="secondary" className="flex-1">Next</Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => setInterviewState('feedback')}
                >
                  End Interview
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <RealTimeFeedback />
              {interviewMode === 'panel' && <PanelSimulator />}
            </div>
          </div>
        )}

        {interviewState === 'feedback' && (
          <InterviewFeedback />
        )}
      </motion.div>
    </div>
  );
}