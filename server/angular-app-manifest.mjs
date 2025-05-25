
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://imanuelnugroho.github.io/flightbookingsystem/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/flightbookingsystem"
  },
  {
    "renderMode": 2,
    "route": "/flightbookingsystem/search-results"
  },
  {
    "renderMode": 2,
    "route": "/flightbookingsystem/confirmation"
  },
  {
    "renderMode": 2,
    "redirectTo": "/flightbookingsystem",
    "route": "/flightbookingsystem/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5333, hash: '05a80796ee239168513da034e5c92d143d96972feb7b39303135a145bd76dbfa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1169, hash: '03cedde5f31e9d50bf2f984d883b628522e1333dcf5ea7d97230547ed74dbbc0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14621, hash: '412a3ed5ae1f0cd0b1fd8674c99068dfe95db2a02d53a9343ace93217d152396', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'search-results/index.html': {size: 11389, hash: '60aafe5e7cd5df04e640bb814b1437ef8eda244fdb4396a03fcf57bcf530b4d5', text: () => import('./assets-chunks/search-results_index_html.mjs').then(m => m.default)},
    'confirmation/index.html': {size: 11485, hash: 'aa4be25e30afb0cbfccd48411ec2daa167e24a54e7a1eb1d0aca8e22c76bebf8', text: () => import('./assets-chunks/confirmation_index_html.mjs').then(m => m.default)},
    'styles-HTFLABQQ.css': {size: 239011, hash: '4pMjUMAcXV4', text: () => import('./assets-chunks/styles-HTFLABQQ_css.mjs').then(m => m.default)}
  },
};
