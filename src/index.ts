#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import youtubedl from 'youtube-dl-exec';

yargs(hideBin(process.argv))
  .scriptName('yt-download')
  .usage('$0 <cmd> [args]')
  .command(
    'download <url>',
    'Download a YouTube video',
    (y) =>
      y
        .positional('url', {
          describe: 'The URL of the YouTube video to download',
          type: 'string',
        })
        .option('output', {
          alias: 'o',
          describe: 'The output file template (see youtube-dl docs)',
          type: 'string',
          default: '%(title)s.%(ext)s',
        })
        .option('audio', {
          alias: 'a',
          describe: 'Download audio only (extract to mp3)',
          type: 'boolean',
          default: false,
        }),
    async (argv) => {
      try {
        const url = argv.url as string;
        const output = (argv as any).output as string;
        const audioOnly = (argv as any).audio as boolean;

        console.log(
          `Downloading ${url} -> ${output}${audioOnly ? ' (audio only)' : ''}`
        );

        // build options for youtube-dl
        const opts: any = {
          format: audioOnly
            ? 'bestaudio/best'
            : 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
          output,
        };

        // When downloading video+audio we ask youtube-dl to merge the
        // streams into a single MP4. This requires `ffmpeg`/`avconv` on
        // your PATH; if none is found youtube-dl will fall back to
        // downloading separate files and you might end up with two
        // tracks like you saw previously.
        if (!audioOnly) {
          opts.mergeOutputFormat = 'mp4';
        }

        if (audioOnly) {
          // ask youtube-dl to extract and convert audio to mp3
          opts.extractAudio = true;
          opts.audioFormat = 'mp3';
        }

        const result = await youtubedl(url, opts);

        if (result) console.log(String(result));
        console.log('Download complete');
      } catch (error) {
        console.error('Failed to download video', error);
        process.exitCode = 1;
      }
    }
  )
  .demandCommand(1, 'You must specify a command')
  .help()
  .parse();