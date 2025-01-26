module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://wa-backend-he0u.onrender.com', // URL backend-a
        changeOrigin: true,
      },
    },
  },
};
