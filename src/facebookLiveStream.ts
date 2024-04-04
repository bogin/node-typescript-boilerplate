import { spawn } from 'child_process';

const facebookRTMPUrl = 'rtmps://live-api-s.facebook.com:443/rtmp/';
const streamKey = 'FB-1359042594957669-0-AbwTi8j_TyME6U5K'

interface StreamConfig {
  videoSrc: string;
  decoder: string;
  encoder: string;
  preset: string;
  duration: number; 
  maxrate: string; 
  bufsize: string;
  videoResolution: string;
  keyFreamRate: string;
  outFileFormant: string;
}

const streamConfigs: StreamConfig[] = [
  {
    videoSrc: './src/public/assets/vidoes/snappers_channel_14.mp4', // Replace with your video file
    duration: 60, // 1 minute
    decoder: 'libx264',
    preset: 'veryfast',
    maxrate: '3000k', 
    bufsize: '6000k',
    keyFreamRate: '22',
    videoResolution: '3000k',
    encoder: 'aac',
    outFileFormant: 'flv',
  },
  {
    videoSrc: './src/public/assets/vidoes/snappers_nba.mp4', // Replace with your second video file
    duration: 60, // 1 minute,
    decoder: 'libx264',
    preset: 'veryfast',
    maxrate: '3000k', 
    bufsize: '6000k',
    keyFreamRate: '22',
    videoResolution: '3000k',
    encoder: 'aac',
    outFileFormant: 'flv',
  },
];

function startStreaming(config: StreamConfig) {
  const { videoSrc, preset, duration, decoder, videoResolution,
    maxrate, encoder, bufsize, keyFreamRate, outFileFormant } = config;

  const ffmpegCommand = 'ffmpeg';
  const outputUrl = `${facebookRTMPUrl}${streamKey}`;
  const args = 
  [
    '-re', '-i', videoSrc,
    '-c:v', decoder,
    '-preset', preset,
    '-b:v', videoResolution,
    '-maxrate', maxrate, 
    '-bufsize', bufsize,
    '-g', keyFreamRate, 
    '-c:a', encoder,
    '-f', outFileFormant, outputUrl
  ];
  

  const ffmpegProcess = spawn(ffmpegCommand, args);
  ffmpegProcess.on('error', function(err) {
    console.log('Oh noez, teh errurz: ' + err);
  });
  setTimeout(() => {
    console.log(`Stopping stream: ${videoSrc}`);
    ffmpegProcess.kill();
  }, duration * 1000);
}

function startStreamingSequence() {
  let currentTime = 0;

  for (const config of streamConfigs) {
    setTimeout(() => {
      console.log(`Starting stream: ${config.videoSrc}`);
      startStreaming(config);
    }, currentTime * 1000);

    currentTime += config.duration;
  }
}

startStreamingSequence();
