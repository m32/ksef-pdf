const { release } =  require("sea-builder");

const production = {
  entry: 'bundle.js',
  name: 'ksef-pdf',
  platforms: ['linux-x64', 'win-x64'],
  outDir: './exe',
};

release(production)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
 