# webtask_config
A simple module for Configuration Management in Webtask

## Usage

```js
var cfg = require('webtask_config');

const options = {
	url: 'THE WEBTASK CONFIG URL',
	api_key: 'THE WEBTASK API KEY'
};

cfg.load(options, (e,config)=>{
			//do something useful with config
			const { mongodb, api_key } = config;
	});
```

The serving function is meant to be used to retrieve and return config parameters from Webtask secret storage.


```js
import cfg from 'webtask_config';

const app = express();

app.get('/', cfg.serve);

```

It expects a `CONFIG_API_TOKEN` in the secrets, which is the shared password for anyone using the endpoint.


### Options (just for `load`)

The `options` parameter must contain:

* A `url` property with the Config Webtask endpoint
* An `api_key` property with the shared secret for the endpoint
* An *optional* `local_params` object that will augment or override config values

The last parameter is useful if the consuming app has additional parameters to keep that are not meant to be centralized.

```js
const options = {
	url: 'THE WEBTASK CONFIG URL',
	api_key: 'THE WEBTASK API KEY'
	local_params: {
		mongodb: 'a local value'
	}
};

cfg.load(options, (e,config)=>{
			//do something useful with config
			const { mongodb, api_key } = config;
			//mongodb is NOT the centralized value, but the local one
	});
```

The most common pattern is to pass `req.webtaskContext.data` to use local secrets.
