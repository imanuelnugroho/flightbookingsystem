
export default {
  basePath: 'https://imanuelnugroho.github.io/flightbookingsystem',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
