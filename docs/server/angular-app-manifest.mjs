
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
    'index.csr.html': {size: 5301, hash: 'a6b847f552b8527fa491adc49c4a3def212bcea74cd15c8779bc074218ad3038', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1137, hash: 'e31b907ff0f9567c4c8e9fd974a75f1437da37424d597de9c2e086c9976f8128', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14589, hash: '8dd1a90565de22739b19f1bb4b054648621992c031c133817e43ad5118d26be2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'search-results/index.html': {size: 11357, hash: '03695384335ad40aa86812e42183622439848154f31e27fcde437567008247ee', text: () => import('./assets-chunks/search-results_index_html.mjs').then(m => m.default)},
    'confirmation/index.html': {size: 11453, hash: '5f7f2380e80da4bf60b0145fdda974efa1fd62275943cd8cb1df2c54d165f214', text: () => import('./assets-chunks/confirmation_index_html.mjs').then(m => m.default)},
    'styles-HTFLABQQ.css': {size: 239011, hash: '4pMjUMAcXV4', text: () => import('./assets-chunks/styles-HTFLABQQ_css.mjs').then(m => m.default)}
  },
};
