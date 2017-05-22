import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-data-display',
    templateUrl: './data-display.component.html',
    styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

    @Input() userText: string;

    constructor() { }

    ngOnInit() { }
}
