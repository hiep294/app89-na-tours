const dev = process.env.NODE_ENV !== 'production'
const url = dev ? 'http://localhost:3000' : 'your_url_app_in_production_env'
export default url

// https://app89-na-tours.herokuapp.com