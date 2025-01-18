module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL backend-a
        changeOrigin: true,
      },
    },
  },
};
