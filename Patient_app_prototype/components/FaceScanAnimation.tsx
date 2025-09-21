import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Camera, X } from 'lucide-react';
import { Button } from './ui/button';

interface FaceScanAnimationProps {
  isScanning: boolean;
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

export function FaceScanAnimation({ isScanning, onComplete, onCancel }: FaceScanAnimationProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState<'preparing' | 'scanning' | 'complete' | 'failed'>('preparing');

  useEffect(() => {
    if (!isScanning) {
      setScanProgress(0);
      setScanStep('preparing');
      return;
    }

    // Simulate face scan process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanStep('complete');
          setTimeout(() => onComplete(true), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setScanStep('scanning');

    return () => clearInterval(interval);
  }, [isScanning, onComplete]);

  if (!isScanning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <Card className="w-80 max-w-[90vw]">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="absolute top-2 right-2 p-2"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="relative">
              {/* Face outline */}
              <div className="relative w-48 h-64 mx-auto">
                <svg
                  viewBox="0 0 200 260"
                  className="w-full h-full"
                  fill="none"
                  stroke={scanStep === 'complete' ? '#10b981' : scanStep === 'failed' ? '#ef4444' : '#3b82f6'}
                  strokeWidth="3"
                >
                  {/* Face outline */}
                  <ellipse cx="100" cy="130" rx="70" ry="90" />
                  
                  {/* Scanning lines */}
                  {scanStep === 'scanning' && (
                    <>
                      <rect
                        x="30"
                        y={50 + (scanProgress / 100) * 160}
                        width="140"
                        height="2"
                        fill="#3b82f6"
                        opacity="0.8"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      
                      {/* Corner brackets */}
                      <path d="M 30 50 L 30 70 M 30 50 L 50 50" strokeWidth="4" />
                      <path d="M 170 50 L 170 70 M 170 50 L 150 50" strokeWidth="4" />
                      <path d="M 30 210 L 30 190 M 30 210 L 50 210" strokeWidth="4" />
                      <path d="M 170 210 L 170 190 M 170 210 L 150 210" strokeWidth="4" />
                    </>
                  )}
                </svg>

                {/* Success checkmark */}
                {scanStep === 'complete' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
                  </div>
                )}

                {/* Camera icon for preparing */}
                {scanStep === 'preparing' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-blue-500 animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">
                {scanStep === 'preparing' && 'Position your face in the frame'}
                {scanStep === 'scanning' && 'Scanning face...'}
                {scanStep === 'complete' && 'Face scan successful!'}
                {scanStep === 'failed' && 'Scan failed. Please try again.'}
              </h3>
              
              {scanStep === 'scanning' && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              )}
              
              <p className="text-sm text-gray-600">
                {scanStep === 'preparing' && 'Make sure your face is clearly visible'}
                {scanStep === 'scanning' && `${Math.round(scanProgress)}% complete`}
                {scanStep === 'complete' && 'Authentication successful'}
                {scanStep === 'failed' && 'Please ensure good lighting and clear visibility'}
              </p>
            </div>

            {scanStep === 'failed' && (
              <Button onClick={() => onComplete(false)} className="w-full">
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}