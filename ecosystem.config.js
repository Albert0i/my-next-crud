const argEnvIndex = process.argv.indexOf('--env')
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || ''

console.log(`argEnv=${argEnv}`)

const RUN_ENV_MAP = {
  local: {
    instances: 1,
    max_memory_restart: '250M'
  },
  dev: {
    instances: 2,
    max_memory_restart: '250M'
  },
  prod: {
    instances: 4,
    max_memory_restart: '1000M'
  }
}

if (!(argEnv in RUN_ENV_MAP)) {
  argEnv = 'local'
}

module.exports = {
  apps: [
    {
      name: 'my-next-crud',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: RUN_ENV_MAP[argEnv].instances, // Or a number of instances
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
      env_local: {
        APP_ENV: 'local'  // APP_ENV=local
      },
      env_dev: {
        APP_ENV: 'dev'    // APP_ENV=dev
      },
      env_prod: {
        APP_ENV: 'prod'   // APP_ENV=prod
      }
    }
  ]
}

// module.exports = {
//   apps: [
//     {
//       name: 'my-next-crud',
//       exec_mode: 'cluster',
//       instances: '1', // Or a number of instances
//       script: 'node_modules/next/dist/bin/next',
//       args: 'start',
//       env_local: {
//         APP_ENV: 'local' // APP_ENV=local
//       },
//       env_development: {
//         APP_ENV: 'dev' // APP_ENV=dev
//       },
//       env_production: {
//         APP_ENV: 'prod' // APP_ENV=prod
//       }
//     }
//   ]
// }

/*
   How to Deploy Nextjs Web Application with PM2
   https://dykraf.com/blog/deploying-nextjs-web-application-with-pm2
*/