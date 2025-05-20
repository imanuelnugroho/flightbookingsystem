
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
    'index.csr.html': {size: 1115, hash: 'a81c41be5b7e507bba1215dc98282cb87beedd8196b02ea3441fc6a9086c1766', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1139, hash: 'd51fe990c2f565fd0e465a829c6282c3b53d8f50b907d7adca76e308fcaab150', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27275, hash: '71e480e2e54dac718aa7846b35a2d066b2838a5c90a968f13e1b0f16e2083fbb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'search-results/index.html': {size: 7343, hash: 'bdb162a78cf093414b28d715f5828701a92df735a5c48d0eca5aabae0b4596f2', text: () => import('./assets-chunks/search-results_index_html.mjs').then(m => m.default)},
    'confirmation/index.html': {size: 7233, hash: '036019110c5a439bf1d6e085201603a6bde64dc049879e6be698569fa5d0a090', text: () => import('./assets-chunks/confirmation_index_html.mjs').then(m => m.default)},
    'styles-5FU7SEP7.css': {size: 7968, hash: 'mnr1uSG2KE8', text: () => import('./assets-chunks/styles-5FU7SEP7_css.mjs').then(m => m.default)}
  },
};
