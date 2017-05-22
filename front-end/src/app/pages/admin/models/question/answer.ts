import {Action} from './action';

export class Answer {

    private text: string;
    private id_nextQuestion: Number;
    private actions: Array<Action> = new Array<Action>();

    constructor(text: string, id_nextQuestion: Number, actions: Array<Action>) {
        this.text = text;
        this.id_nextQuestion = id_nextQuestion;
        this.actions = actions;
    }

    getText() {
        return this.text;
    }

    setText(value: string) {
        this.text = value;
    }

    getIdNextQuestion() {
        return this.id_nextQuestion;
    }

    setIdNextQuestion(value: Number) {
      this.id_nextQuestion = value;
    }

    getActions(): Array<Action> {
      return this.actions;
    }
}
