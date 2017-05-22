import {Injectable} from "@angular/core";

@Injectable()
export class AmazonCredentials {

    private LWA_CODE            = 'lwa_code';
    private LWA_TOKEN           = 'lwa_token';
    private LWA_REFRESH_TOKEN   = 'lwa_refresh_token';

    setCode(code: string) {
        localStorage.setItem(this.LWA_CODE, code);
    }

    setAccessToken(token: string) {
        localStorage.setItem(this.LWA_TOKEN, token);
    }

    setRefreshToken(refreshToken: string) {
        localStorage.setItem(this.LWA_REFRESH_TOKEN, refreshToken);
    }

    getCode() {
        return localStorage.getItem(this.LWA_CODE);
    }

    getAccessToken() {
        return localStorage.getItem(this.LWA_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(this.LWA_REFRESH_TOKEN);
    }
}