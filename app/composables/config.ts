const config = {
    dataVersion: 2,

    githubUser: 'mr-calculator',
    githubRepo: 'mr-calculator.github.io',
    redditUser: 'mr-prof-calculator',
    email: 'mr-calculator.estimate510@slmails.com',
    domain: 'mr-calculator.github.io',
    domainHttp: 'https://mr-calculator.github.io'
    // domain: 'localhost:3000',
    // domainHttp: 'http://localhost:3000'
};

export function useAbsoluteUrl(...components: string[]) {
    return config.domainHttp + '/' + components.map(c => trimFirst('/', trimLast('/', c))).join('/');
}
export function useCanonicalUrl(...components: string[]) {
    return config.domainHttp + '/' + components.map(c => trimFirst('/', trimLast('/', c))).join('/') + '/';
}

export default config;