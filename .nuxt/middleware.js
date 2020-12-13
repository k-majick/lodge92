const middleware = {}

middleware['redirects'] = require('../middleware/redirects.js')
middleware['redirects'] = middleware['redirects'].default || middleware['redirects']

export default middleware
