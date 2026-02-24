/**
 * Download a video using youtube-dl-exec and write it directly to disk.
 * Returns the stdout/stderr output from the underlying command as a string.
 */
export declare function download(url: string, output?: string): Promise<string>;
/** Convenience wrapper kept for compatibility. */
export declare function downloadAgain(url: string): Promise<string>;
/**
 * Download only the audio track and convert it to mp3.
 * If `output` is omitted the template `%(title)s.%(ext)s` is used.
 */
export declare function downloadAudio(url: string, output?: string): Promise<string>;
//# sourceMappingURL=downloader.d.ts.map