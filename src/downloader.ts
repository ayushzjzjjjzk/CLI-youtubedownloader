import youtubedl from 'youtube-dl-exec';
import path from 'path';

/**
 * Download a video using youtube-dl-exec and write it directly to disk.
 * Returns the stdout/stderr output from the underlying command as a string.
 */
export async function download(
  url: string,
  output?: string
): Promise<string> {
  const outputTemplate = output ?? '%(title)s.%(ext)s';
  try {
    const result = await (youtubedl as any)(url, {
      output: outputTemplate,
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
      mergeOutputFormat: 'mp4',
    });
    return String(result ?? '');
  } catch (err) {
    throw err;
  }
}

/** Convenience wrapper kept for compatibility. */
export async function downloadAgain(url: string): Promise<string> {
  return download(url, 'test.mp4');
}

/**
 * Download only the audio track and convert it to mp3.
 * If `output` is omitted the template `%(title)s.%(ext)s` is used.
 */
export async function downloadAudio(
  url: string,
  output?: string
): Promise<string> {
  const outputTemplate = output ?? '%(title)s.%(ext)s';
  try {
    const result = await (youtubedl as any)(url, {
      output: outputTemplate,
      format: 'bestaudio/best',
      extractAudio: true,
      audioFormat: 'mp3',
    });
    return String(result ?? '');
  } catch (err) {
    throw err;
  }
}