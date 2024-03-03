/** @type {import('next').NextConfig} */

const nextConfig = {
  //vercel does not have access to my server directory, therefore it does not have the types from the backend bruh
  ignoreBuildErrors: true,
};

export default nextConfig;
