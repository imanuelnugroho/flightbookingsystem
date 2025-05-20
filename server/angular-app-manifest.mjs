
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/flightbookingsystem/',
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
    'index.csr.html': {size: 625, hash: 'dbc4648c0c9c99dadb664a5faa9910ce5fcc8d9c7a4912cae60ed48cc870ad0c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1139, hash: '962f223c2ee40284f0b339b2ab65b51dcc5ecb3ad912b864bfca904e6acecd52', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20291, hash: '109998ee32ead625f210c9770381bb1cca1bd2a5b0625aeb0d09018049892b39', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'search-results/index.html': {size: 4957, hash: '2809a6ef774c6000ffbb2ce95dd687f86eac9f9a2faa5b979ff7f242080e8e95', text: () => import('./assets-chunks/search-results_index_html.mjs').then(m => m.default)},
    'confirmation/index.html': {size: 4914, hash: '18ee08ca950813c48cce58b32ac065274d228cbfd22b56dd163e7d312bc34831', text: () => import('./assets-chunks/confirmation_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
