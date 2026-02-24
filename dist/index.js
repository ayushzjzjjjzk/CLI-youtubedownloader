import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import youtubedl from 'youtube-dl-exec';
const argv = yargs(hideBin(process.argv))
    .option('url', { type: 'string', describe: 'video URL to download', demandOption: true })
    .option('output', {
    type: 'string',
    alias: 'o',
    describe: 'output file template (see youtube-dl docs)',
    default: '%(title)s.%(ext)s',
})
    .help()
    .parseSync();
async function main() {
    try {
        console.log(`Downloading: ${argv.url}`);
        await youtubedl(argv.url, { output: argv.output });
        console.log('Download complete');
    }
    catch (err) {
        console.error('Error downloading video:', err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map