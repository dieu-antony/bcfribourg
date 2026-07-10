module.exports = {
  apps: [{
    name: "bcfribourg",
    script: "node_modules/next/dist/bin/next",
    args: "start -p 8080",
    cwd: "/home/jelastic/ROOT",
    env: {
      NODE_ENV: "production"
    }
  }]
}