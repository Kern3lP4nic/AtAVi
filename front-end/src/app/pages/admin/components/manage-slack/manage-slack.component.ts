import {Component, OnInit, ViewChild} from '@angular/core';
import {Interlocutor} from '../../models/interlocutor/interlocutor';
import {ManageSlackService} from '../../services/manageSlack.service';

@Component({
    selector: 'app-manage-slack',
    templateUrl: './manage-slack.component.html',
    styleUrls: ['./manage-slack.component.css'],
    providers: [ManageSlackService]
})
export class ManageSlackComponent implements OnInit {

    @ViewChild('allList') allList;
    @ViewChild('defaultList') defaultList;

    private selectedItem: Interlocutor;
    private interlocutors: Array<Interlocutor> = new Array<Interlocutor>();
    private defaultInterlocutors: Array<Interlocutor> = new Array<Interlocutor>();

    constructor(private manage: ManageSlackService) {
        this.refreshInterlocutor();
    }

    ngOnInit() {
        this.allList.setTitle('Interlocutori disponibili');
        this.allList.setFirstColumnText('Nominativo');
        this.defaultList.setTitle('Interlocutori canale #azienda');
        this.defaultList.setFirstColumnText('Nominativo');
    }

    refreshInterlocutor() { // Update the interlocutors into the DB and refresh the list
        this.interlocutors = new Array<Interlocutor>();
        this.defaultInterlocutors = new Array<Interlocutor>();

        this.manage.updateInterlocutor().subscribe(res => { // Update interlocutors list on the DB
            this.manage.getInterlocutors().subscribe(data => { // Get updated interlocutors list
                data = data.json();
                const obj = data['Object'];

                for (let i = 0; i < obj.length; ++i) {
                    if (obj[i].isDefault === false) {
                        this.interlocutors.push(new Interlocutor(obj[i].id_slack, obj[i].nameI, obj[i].isDefault));
                    } else {
                        this.defaultInterlocutors.push(new Interlocutor(obj[i].id_slack, obj[i].nameI, obj[i].isDefault));
                    }
                }
            });
        });
    }

    allListClicked() {
        this.defaultList.clearClickedRow();
    }

    defaultListClicked() {
        this.allList.clearClickedRow();
    }

    addDefault() {
        if (this.selectedItem !== null) {
            const index = this.interlocutors.indexOf(this.selectedItem); // get the index of the selected interlocutor
            if (index >= 0) {
                this.manage.setInterlocutorToDefault(this.selectedItem.getId_slack(), this.selectedItem.getName()).subscribe(res => {
                    res = res.json();
                    console.log(res);

                    this.selectedItem.setIsDefault(true);
                    this.defaultInterlocutors.push(this.selectedItem); // add the new default interlocutor
                    this.interlocutors.splice(index, 1);  // remove the interlocutor from the interlocutor's array
                    this.selectedItem = null;
                }, err => {
                    err = err.json();
                    console.log(err);
                });
            }
            this.allList.clearClickedRow();
        }
    }

    removeDefault() {
        if (this.selectedItem !== null) {
            const index = this.defaultInterlocutors.indexOf(this.selectedItem); // get the index of the selected default interlocutor
            if (index >= 0) {
                // to set isDefault false
                this.manage.removeInterlocutorFromDefault(this.selectedItem.getId_slack(), this.selectedItem.getName()).subscribe(res => {
                    res = res.json();
                    console.log(res);

                    this.selectedItem.setIsDefault(false);
                    this.interlocutors.push(this.selectedItem); // add the interlocutor
                    this.defaultInterlocutors.splice(index, 1);  // remove the interlocutor from the default interlocutor's array
                    this.selectedItem = null;
                }, err => {
                    err = err.json();
                    console.log(err);
                });
            }
            this.defaultList.clearClickedRow();
        }
    }

    onSelectItem(selection) {
        this.selectedItem = selection.item;
    }
}
