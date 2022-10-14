const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;
  const filename = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;
  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src", "icon.png"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new MiniCssExtractPlugin({
        filename: filename("css"),
      }),
    ];
    if (isDev) {
      base.push(new ESLintPlugin());
    }
    return base;
  };
  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      main: ["core-js/stable", "regenerator-runtime/runtime", "./index.js"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: filename("js"),
      clean: true,
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@core": path.resolve(__dirname, "src/core", "core"),
      },
    },
    devServer: {
      port: 8080,
      open: true,
      hot: true,
      watchFiles: "./",
    },

    devtool: isDev ? "source-map" : false,
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
// module.exports = {
//   context: path.resolve(__dirname, "src"),
//   entry: {
//     main: ["core-js/stable", "regenerator-runtime/runtime", "./index.js"],
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].bundle.js",
//   },
//   resolve: {
//     extensions: [".js"],
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//       core: path.resolve(__dirname, "src", "core"),
//     },
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./index.html",
//     }),
//     new CopyPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, "src", "icon.png"),
//           to: path.resolve(__dirname, "dist"),
//         },
//       ],
//       options: {
//         concurrency: 100,
//       },
//     }),
//     new MiniCssExtractPlugin({
//       filename: "[name].bundle.css",
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           MiniCssExtractPlugin.loader,
//           // Translates CSS into CommonJS
//           "css-loader",
//           // Compiles Sass to CSS
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.m?js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env"],
//           },
//         },
//       },
//     ],
//   },
// };
