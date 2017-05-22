import {Component, AfterViewInit, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';

declare var require: any;
const RecordRTC = require('recordrtc/RecordRTC.min');

@Component({
    selector: 'app-manage-conversation',
    templateUrl: './manage-conversation.component.html',
    styleUrls: ['./manage-conversation.component.css']
})
export class ManageConversationComponent implements AfterViewInit {

    private STATUS_0 = 'Click to speak';
    private STATUS_1 = 'Listening...';
    private STATUS_2 = 'Thinking...';
    private STATUS_3 = 'Playing response...';

    private SPINNER_HARD = 'hard';
    private SPINNER_SLOW = 'slow';
    private SPINNER_BASE = '';

    @Output() onUpdateDataDisplay: EventEmitter<any> = new EventEmitter();
    @Output() audioEmitter: EventEmitter<any> = new EventEmitter();

    private status      = this.STATUS_0;
    private isRecording = false;
    private recordRTC: any;
    private audioStream: MediaStream;
    private isRecordingCss: string;

    constructor(private ref: ChangeDetectorRef) { }

    ngAfterViewInit() { }

    startRecording() {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: false
            })
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));

        this.status         = this.STATUS_1;
        this.isRecordingCss = this.SPINNER_SLOW;
        this.isRecording    = true;
    }

    successCallback(audioStream: MediaStream) {
        const self = this;
        self.audioStream = audioStream;
        this.recordRTC = RecordRTC(audioStream, {
            recorderType: RecordRTC.StereoAudioRecorder,
            type: 'audio',
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1,
            sampleRate: 16 * 1000,
            desiredSampRate: 16 * 1000
        });
        this.recordRTC.setRecordingDuration(3000).onRecordingStopped(this.processAudio.bind(this));
        this.recordRTC.startRecording();
    }

    processAudio(audioURL) {
        const self = this;
        self.status = this.STATUS_2;
        self.isRecordingCss = self.SPINNER_HARD;
        self.ref.detectChanges();
        this.recordRTC.getDataURL(function(dataURI) {

            const reader = new FileReader();
            reader.onload = function() {
                self.audioEmitter.emit(reader.result);
            };
            reader.readAsBinaryString(self.recordRTC.getBlob());

            //self.audioEmitter.emit(dataURI);

            self.status = self.STATUS_3;
            self.isRecordingCss = self.SPINNER_BASE;
            self.ref.detectChanges();
        });
    }

    errorCallback(audioStream: MediaStream) {
        this.status         = 'An error occured, please try again';
        this.isRecordingCss = this.SPINNER_BASE;
        this.isRecording    = false;
        this.ref.detectChanges();
    }

    stopRecording() {
        this.recordRTC.stopRecording();
        this.audioStream.getAudioTracks().forEach(track => track.stop());
        this.status         = this.STATUS_0;
        this.isRecordingCss = this.SPINNER_BASE;
        this.isRecording    = false;
        this.ref.detectChanges();
    }

    download() {
        this.recordRTC.save('audio.wav');
    }

    onLoaderClick() {
        if (this.recordRTC !== null && this.isRecording) {
            this.stopRecording();
        } else if (this.isRecording !== null) {
            this.startRecording();

            this.updateDataDisplay('Esempio di comunicazione fra componenti', []);
        }
    }

    updateDataDisplay(text: string, firms: Array<any>) {
        this.onUpdateDataDisplay.emit({
            'text': text,
            'firms': firms
        });
    }
}
