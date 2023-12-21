require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_KEY,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps : [{
    name   : 'frontend',
    script : './build/index.html'
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      key: DEPLOY_KEY,
      host: DEPLOY_HOST,
      ssh_options: "StrictHostKeyChecking=no",
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/frontend`,
      'post-deploy': `cd ${DEPLOY_PATH}/source/frontend && npm i && npm run build`,
    },
  },
}

