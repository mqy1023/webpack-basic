module.exports = {
  pages: {
    index: {
      template: './src/index.html',
      chunks: ['index']
    },
    screen: {
      template: './src/screen.html',
      chunks: ['screen']
    },
    indexcopy:{
      template: './src/indexcopy.html',
      chunks: []
    }
  }
}