const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./route/user");
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.dev');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')

let url = "mongodb://nabcofurniture:nabco1654@ds153841.mlab.com:53841/nabcofurniture";
mongoose.connect(url, {server: { poolsize:10}}, function(error){
  if (error) {
    console.log("err", error);
  } else {
    console.log("Connected to database");
  }
});
let app = express();




const webpackCompiler = webpack(webpackConfig);
app.use(webpackMiddleware(webpackCompiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/user", userRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
  console.log(res);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use(webpackHotMiddleware(webpackCompiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));

});


app.listen(3000, () => console.log('server running on 4000'));
