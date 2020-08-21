const utsm = require('utsm');
const conf = require('./umoduleconf');

      utsm.addConf(conf)
          .start('deploy')
          .start('watchd');