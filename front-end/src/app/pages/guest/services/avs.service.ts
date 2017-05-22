import {Http, Headers, RequestOptions, RequestMethod} from "@angular/http";
import {Injectable} from "@angular/core";
import {AmazonCredentials} from "../models/amazonCredentials.model";

@Injectable()
export class AVSService {

    private BASE_URL    = 'https://avs-alexa-na.amazon.com';
    private API_VERSION = '/v20160207';
    private BOUNDARY = 'SALUDAANDONIO';
    private BOUNDARY_DASHES = '--';
    private NEWLINE = '\r\n';
    private METADATA_CONTENT_DISPOSITION = 'Content-Disposition: form-data; name="metadata"';
    private METADATA_CONTENT_TYPE = 'Content-Type: application/json; charset=UTF-8';
    private AUDIO_CONTENT_DISPOSITION = 'Content-Disposition: form-data; name="audio"';
    private AUDIO_CONTENT_TYPE = 'Content-Type: application/octet-stream';

    constructor(private http: Http, private amazonCredentials: AmazonCredentials) { }

    establishDownchannel() {
        const headers = new Headers({
            'authorization': 'Bearer ' + this.amazonCredentials.getAccessToken()
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers
        });

        return this.http.get(this.BASE_URL + this.API_VERSION + '/directives', options);
    }

    postPing() {
        const headers = new Headers({
            'authorization': 'Bearer ' + this.amazonCredentials.getAccessToken()
        });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers
        });

        return this.http.get(this.BASE_URL + '/ping', options);
    }

    synchronizeState() {
        const message = ''
            + this.BOUNDARY_DASHES + this.BOUNDARY + this.NEWLINE
            + this.METADATA_CONTENT_DISPOSITION + this.NEWLINE
            + this.METADATA_CONTENT_TYPE + this.NEWLINE
            + this.NEWLINE
            +'  {' + this.NEWLINE
            +'      "context": [{' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "Alerts",' + this.NEWLINE
            +'              "name" : "AlertsState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "allAlerts" : [],' + this.NEWLINE
            +'              "activeAlerts" : []' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }, {' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "AudioPlayer",' + this.NEWLINE
            +'              "name" : "PlaybackState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "token" : "",' + this.NEWLINE
            +'              "offsetInMilliseconds" : 0,' + this.NEWLINE
            +'              "playerActivity" : "IDLE"' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }, {' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "Speaker",' + this.NEWLINE
            +'              "name" : "VolumeState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "volume" : 50,' + this.NEWLINE
            +'              "muted" : false' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }, {' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "SpeechSynthesizer",' + this.NEWLINE
            +'              "name" : "SpeechState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "token" : "",' + this.NEWLINE
            +'              "offsetInMilliseconds" : 0,' + this.NEWLINE
            +'              "playerActivity" : "FINISHED"' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }],' + this.NEWLINE
            +'      "event": {' + this.NEWLINE
            +'          "header": {' + this.NEWLINE
            +'              "namespace": "System",' + this.NEWLINE
            +'              "name": "SynchronizeState",' + this.NEWLINE
            +'              "messageId": "' + localStorage.getItem('messageId') + '"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload": {' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }' + this.NEWLINE
            +'  }' + this.NEWLINE
            + this.NEWLINE
            + this.BOUNDARY_DASHES + this.BOUNDARY + this.BOUNDARY_DASHES;

        const headers = new Headers({
            'authorization': 'Bearer ' + this.amazonCredentials.getAccessToken(),
            'content-type': 'multipart/form-data; boundary=' + this.BOUNDARY
        });

        const options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: message
        });

        return this.http.get(this.BASE_URL + '/v20160207/events', options);
    }

    speechRecognizer(audio: string) {
        const message = ''
            + this.BOUNDARY_DASHES + this.BOUNDARY + this.NEWLINE
            + this.METADATA_CONTENT_DISPOSITION + this.NEWLINE
            + this.METADATA_CONTENT_TYPE + this.NEWLINE
            + this.NEWLINE
            +'  {' + this.NEWLINE
            +'      "context": [{' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "Alerts",' + this.NEWLINE
            +'              "name" : "AlertsState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "allAlerts" : [],' + this.NEWLINE
            +'              "activeAlerts" : []' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }, {' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "AudioPlayer",' + this.NEWLINE
            +'              "name" : "PlaybackState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "token" : "",' + this.NEWLINE
            +'              "offsetInMilliseconds" : 0,' + this.NEWLINE
            +'              "playerActivity" : "IDLE"' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }, {' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "Speaker",' + this.NEWLINE
            +'              "name" : "VolumeState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "volume" : 50,' + this.NEWLINE
            +'              "muted" : false' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }, {' + this.NEWLINE
            +'          "header" : {' + this.NEWLINE
            +'              "namespace" : "SpeechSynthesizer",' + this.NEWLINE
            +'              "name" : "SpeechState"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload" : {' + this.NEWLINE
            +'              "token" : "",' + this.NEWLINE
            +'              "offsetInMilliseconds" : 0,' + this.NEWLINE
            +'              "playerActivity" : "FINISHED"' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }],' + this.NEWLINE
            +'      "event": {' + this.NEWLINE
            +'          "header": {' + this.NEWLINE
            +'              "namespace": "SpeechRecognizer",' + this.NEWLINE
            +'              "name": "Recognize",' + this.NEWLINE
            +'              "messageId": "' + localStorage.getItem('messageId') + '",' + this.NEWLINE
            +'              "dialogRequestId": "' + String((new Date()).getTime()) + '"' + this.NEWLINE
            +'          },' + this.NEWLINE
            +'          "payload": {' + this.NEWLINE
            +'              "profile": "CLOSE_TALK",' + this.NEWLINE
            +'              "format": "AUDIO_L16_RATE_16000_CHANNELS_1"' + this.NEWLINE
            +'          }' + this.NEWLINE
            +'      }' + this.NEWLINE
            +'  }' + this.NEWLINE
            + this.NEWLINE
            + this.BOUNDARY_DASHES + this.BOUNDARY + this.NEWLINE
            + this.AUDIO_CONTENT_DISPOSITION + this.NEWLINE
            + this.AUDIO_CONTENT_TYPE + this.NEWLINE
            + this.NEWLINE
            + audio + this.NEWLINE
            + this.BOUNDARY_DASHES + this.BOUNDARY + this.BOUNDARY_DASHES;

        const headers = new Headers({
            'authorization': 'Bearer ' + this.amazonCredentials.getAccessToken(),
            'content-type': 'multipart/form-data; boundary=' + this.BOUNDARY
        });

        const options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: message
        });

        return this.http.get(this.BASE_URL + '/v20160207/events', options);
    }

}