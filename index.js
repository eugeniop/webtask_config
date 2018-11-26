var request = require('request');
var _ = require('lodash');

exports.load = function(options, done){
  request.get(options.url,
              {
                headers: {
                  Authorization: options.api_key
                }
              },
              (error, status, body) => {
                if(error){ return done(error); }
                if(status.statusCode !== 200){ 
                    return done({
                                  error_msg: 'Cannot load configuration',
                                  status_code:  status.statusCode
                                }); 
                }
                try{
                  config = JSON.parse(body);
                  if(options.local_params){
                    config = _.extend(config, options.local_params);
                  }
                  return done(null, config);
                }
                catch(error){
                  return done({
                    error_msg: 'Invalid config object'
                  })
                }
              }); 
};