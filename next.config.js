/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SECRET_KEY: "test_todo_app123!",
    },
};

module.exports = nextConfig