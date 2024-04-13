/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { defaultLoaders }) => {
    // Push a new rule for TypeScript files
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Skip type checking
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
