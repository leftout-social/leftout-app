// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
//   buildExcludes: [/middleware-manifest.json$/],
// });

// const nextConfig = withPWA({
//     eslint: {
//         // Warning: This allows production builds to successfully complete even if
//         // your project has ESLint errors.
//         ignoreDuringBuilds: true,
//       },
// });
// module.exports = nextConfig;

module.exports = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
    typescript: {
        ignoreBuildErrors: true,
    },
};
