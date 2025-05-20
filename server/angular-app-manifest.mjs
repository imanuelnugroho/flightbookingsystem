
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
    'index.csr.html': {size: 5627, hash: '7ab6730a7797ba926c42be59f2667708c794bf0a1ae75ea33b3de3e186598301', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1236, hash: '575d2a9248b5493ed98ebd0071370b8ca0ece2ffea2c9b0e95674a1be638696e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 35983, hash: 'd084ce5a2e05a3ab0aaa566e235dce125b14ccaba3f0b71ec6211e48924fccb7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'search-results/index.html': {size: 12136, hash: 'cf864c2bcd7b7229f6337aec4121bf96a7be72dcd05a1118c3f92a785f21fa6b', text: () => import('./assets-chunks/search-results_index_html.mjs').then(m => m.default)},
    'confirmation/index.html': {size: 12110, hash: '80db36f7df8cf9f938fd4e232a97d76f7d50dfed9a26d5efa3e12c451a4ca06f', text: () => import('./assets-chunks/confirmation_index_html.mjs').then(m => m.default)},
    'styles-JSBOE537.css': {size: 238910, hash: 'RY1TK5en6C8', text: () => import('./assets-chunks/styles-JSBOE537_css.mjs').then(m => m.default)}
  },
};
