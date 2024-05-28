import { ApiError } from ".";

type Predicate = (err: ApiError) => boolean;
type ChainLink = (err: ApiError) => string | false;

class ErrorResolverChain {
    chainLinks: Array<ChainLink>;
    defaultMessage: string;

    constructor() {
        this.chainLinks = [];
        this.defaultMessage = 'Unresolved';
    }

    withResolver(predicate: Predicate, resolvedMessage: string) {
        this.chainLinks.push(e => predicate(e) ? resolvedMessage : false);
        return this;
    }

    withDefaultMessage(defaultMessage: string) {
        this.defaultMessage = defaultMessage;
        return this;
    }

    resolveError(error?: ApiError) {
        if(!error) {
            return this.defaultMessage;
        }

        const resolver = this.chainLinks.find(l => l(error));
        if(!resolver) {
            return this.defaultMessage;
        }

        return resolver(error) as string;
    }
}

export default ErrorResolverChain;