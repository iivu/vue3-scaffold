const env = process.env.VUE_APP_PROJECT_ENV;

const config = {
  test: {
    encodeKey: 'i9f6wjdoegph5eg7KjzrgZxPGus1VDGF',
    apiURL: 'https://clzq-test.hnliantong.com',
    htmlURL: 'https://wx-test.hnliantong.com/h5/cl-lpy/index.html',
    staticURL: 'https://wx-test.hnliantong.com/h5/cl-lpy/',
    wxAuthURL: 'https://clzq-test.hnliantong.com/inside/login/loginWxAuth',
  },
  prod: {
    encodeKey: 'i9f6wjdoegph5eg7KjzrgZxPGus1VDGF',
    apiURL: 'https://clzq.hnliantong.com',
    htmlURL: 'https://wx.hnliantong.com/h5/cl-lpy/index.html',
    staticURL: 'https://img.hnliantong.com/h5/cl-lpy/',
    wxAuthURL: 'https://clzq.hnliantong.com/inside/login/loginWxAuth',
  },
};
module.exports = config[env];
