// eslint-disable-next-line import/no-extraneous-dependencies
const execa = require('execa');

const getProjectPath = () => __dirname;

const getCli = (platform = process.platform) => {
  const getMacosCli = () => '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';
  const getWindowsCli = () => { throw new Error('unsupport windows for now'); };
  return platform === 'darwin' ? getMacosCli() : getWindowsCli();
};

const buildNpm = () => execa(getCli(), ['build-npm', '--project', getProjectPath()]);

const open = () => execa(getCli(), ['open', '--project', getProjectPath()]);

const preview = () => execa(getCli(), ['preview', '--project', getProjectPath()]);

const main = () => {
  const type = process.argv[2];
  if (type === 'build-npm') return buildNpm();
  if (type === 'open') return open();
  if (type === 'preview') return preview();
};

main();
