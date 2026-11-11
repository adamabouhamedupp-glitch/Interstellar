// Builds the static site into `dist` for Netlify.
// Copies everything in `static/` and adds a `_redirects` file that mirrors
// the page routes and asset routes defined in index.js.
import { cp, rm, writeFile } from "node:fs/promises";

const outDir = "dist";

await rm(outDir, { recursive: true, force: true });
await cp("static", outDir, { recursive: true });

const redirects = `
/b            /apps.html      200
/a            /games.html     200
/play.html    /games.html     200
/c            /settings.html  200
/d            /tabs.html      200
/e/1/*        https://raw.githubusercontent.com/qrs/x/fixy/:splat         200
/e/2/*        https://raw.githubusercontent.com/3v1/V5-Assets/main/:splat   200
/e/3/*        https://raw.githubusercontent.com/3v1/V5-Retro/master/:splat  200
/*            /404.html       404
`.trimStart();

await writeFile(`${outDir}/_redirects`, redirects);

console.log(`Static site written to ${outDir}/`);
