/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
  // Thêm các cấu hình mới
  output: 'standalone',  // Thay đổi output mode
  experimental: {
    // Tắt các tính năng thử nghiệm để giảm khả năng xung đột
    esmExternals: false,
    skipTrailingSlashRedirect: true,
    disableOptimizedLoading: true,
  },
  // Bỏ qua trang not-found nếu có thể
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;