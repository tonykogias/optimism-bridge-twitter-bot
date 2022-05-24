module.exports = {
  apps : [{
    name: "Optimism Bridge Twitter Bot",
    script: "npx ts-node src/main.ts"
  }],

  deploy : {
    "post-deploy" : `pm2 link ${process.env.PM2_SECRET_KEY} ${process.env.PM2_PUBLIC_KEY}`
  }
};
