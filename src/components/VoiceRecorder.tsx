import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Download, Trash2, Volume2 } from 'lucide-react';

interface Recording {
  id: string;
  blob: Blob;
  url: string;
  duration: number;
  timestamp: Date;
  name: string;
}

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      recordings.forEach(recording => {
        URL.revokeObjectURL(recording.url);
      });
    };
  }, [recordings]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const newRecording: Recording = {
          id: Date.now().toString(),
          blob: audioBlob,
          url: audioUrl,
          duration: recordingTime,
          timestamp: new Date(),
          name: `Enregistrement ${recordings.length + 1}`
        };

        setRecordings(prev => [...prev, newRecording]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erreur lors de l\'accès au microphone:', error);
      alert('Impossible d\'accéder au microphone. Vérifiez les permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = (recording: Recording) => {
    if (currentlyPlaying === recording.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        setCurrentlyPlaying(null);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(recording.url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setCurrentlyPlaying(null);
      };
      
      audio.play();
      setCurrentlyPlaying(recording.id);
    }
  };

  const downloadRecording = (recording: Recording) => {
    const link = document.createElement('a');
    link.href = recording.url;
    link.download = `${recording.name}.wav`;
    link.click();
  };

  const deleteRecording = (recordingId: string) => {
    setRecordings(prev => {
      const recording = prev.find(r => r.id === recordingId);
      if (recording) {
        URL.revokeObjectURL(recording.url);
      }
      return prev.filter(r => r.id !== recordingId);
    });
    
    if (currentlyPlaying === recordingId) {
      setCurrentlyPlaying(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Voice recorder button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Volume2 className="h-6 w-6" />
      </button>

      {/* Voice recorder panel */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <h3 className="font-semibold">Dictaphone</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              ×
            </button>
          </div>

          <div className="p-4">
            {/* Recording controls */}
            <div className="text-center mb-6">
              <div className="mb-4">
                {isRecording ? (
                  <div className="text-red-500 font-mono text-2xl">
                    {formatTime(recordingTime)}
                  </div>
                ) : (
                  <div className="text-slate-500 text-lg">
                    Prêt à enregistrer
                  </div>
                )}
              </div>
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                }`}
              >
                {isRecording ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </button>
              
              <p className="text-sm text-slate-500 mt-2">
                {isRecording ? 'Cliquez pour arrêter' : 'Cliquez pour enregistrer'}
              </p>
            </div>

            {/* Recordings list */}
            {recordings.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-slate-800 mb-3">
                  Enregistrements ({recordings.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {recordings.map((recording) => (
                    <div
                      key={recording.id}
                      className="bg-slate-50 rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm text-slate-800">
                          {recording.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatDate(recording.timestamp)} • {formatTime(recording.duration)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => playRecording(recording)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        >
                          {currentlyPlaying === recording.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => downloadRecording(recording)}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => deleteRecording(recording.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recordings.length === 0 && !isRecording && (
              <div className="text-center text-slate-400 py-8">
                <Volume2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun enregistrement</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceRecorder;