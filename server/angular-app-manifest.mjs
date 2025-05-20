
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
    'index.csr.html': {size: 5627, hash: 'e10d2a7c576f2a12a6720fa30199781cec1feb609129c4705f7c349a6cc097d9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1236, hash: '59dc54cc024d97a9d4b88e6c12a640e23d9dcdb65d1048b204f0b23c1e8daca6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 15357, hash: 'b7c5fecd45b50bb84e33d95349bef1fb240e0db3b44ada7578332829364f40bd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'search-results/index.html': {size: 8155, hash: 'e333e602e88ef5e2e1e09edc845c6bddd3ed0be558a1c9d02b1a98c7371b2fb8', text: () => import('./assets-chunks/search-results_index_html.mjs').then(m => m.default)},
    'confirmation/index.html': {size: 8280, hash: 'd9aaae62e230ba83b8bcbd0f9ead40eabd21f38b0b1e5afab2164d3170e42af6', text: () => import('./assets-chunks/confirmation_index_html.mjs').then(m => m.default)},
    'styles-JSBOE537.css': {size: 238910, hash: 'RY1TK5en6C8', text: () => import('./assets-chunks/styles-JSBOE537_css.mjs').then(m => m.default)}
  },
};
