import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Interlocutor} from '../../models/interlocutor/interlocutor';
import {Admin} from '../../models/admin/admin';
import {Question} from "../../models/question/question";

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListViewComponent implements OnInit {

    @Output() emitter: EventEmitter<any> = new EventEmitter();
    @Input() items;
    @Input() title              = 'Lista';
    @Input() firstColumnText    = 'Titolo';
    @Input() secondColumnText   = 'Opzioni';
    @Input() hashColumnVisibility   = true;
    @Input() secondColumnVisibility = true;
    @Input() updateVisibility       = true;

    private selectedIndex: number;
    private type: string;

    constructor() {
    }

    ngOnInit() {
        if (this.items[0] instanceof Interlocutor) {
            this.type = 'interlocutor';
        } else if (this.items[0] instanceof Admin) {
            this.type = 'admin';
        } else if (this.items[0] instanceof Question) {
            this.type = 'question';
        }
    }

    selectRow(i, item, event) {
        event.stopPropagation();
        this.selectedIndex = i;
        this.emitter.emit({
            'event': 'select',
            'item': item
        });
    }

    updateRow(i, item, event) {
        event.stopPropagation();
        this.selectedIndex = i;
        this.emitter.emit({
            'event': 'update',
            'item': item
        });
    }

    deleteRow(i, item, event) {
        event.stopPropagation();
        this.selectedIndex = i;
        this.emitter.emit({
            'event': 'delete',
            'item': item
        });
    }

    clearClickedRow() {
        this.selectedIndex = null;
    }

    setTitle(value: string) {
        this.title = value;
    }

    setFirstColumnText(value: string) {
        this.firstColumnText = value;
    }

    setSecondColumnText(value: string) {
        this.secondColumnText = value;
    }

    setHashColumnVisibility(value: boolean) {
        this.hashColumnVisibility = value;
    }

    setSecondColumnVisibility(value: boolean) {
        this.secondColumnVisibility = value;
    }

    setUpdateVisibility(value: boolean) {
        this.updateVisibility = value;
    }
}