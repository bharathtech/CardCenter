var config = {
   entry: './react_es6/main.js',
	
   output: {
      path:'./public',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8085
   },
	
   module: {
      loaders: [ {
         test: /\.js?$/,
         exclude: /node_modules/,
         loader: 'babel',
			
         query: {
            presets: ['es2015', 'react']
         }
      }]
   }
	
}

module.exports = config;