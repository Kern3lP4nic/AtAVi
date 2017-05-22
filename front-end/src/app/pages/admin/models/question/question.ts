import {Answer} from './answer';
import {Action} from './action';

export class Question {

    private id: number;
    private baseText: string;
    private recurrentText: string;
    private dynamic: boolean;
    private isFirst: boolean;
    private action: Number;
    private answers: Array<Answer> = new Array<Answer>();

    constructor(id: number, baseText: string, recurrentText: string, dynamic: boolean, isFirst: boolean, action: Number, answers: Array<Answer>) {
        this.id = id;
        this.baseText = baseText;
        this.recurrentText = recurrentText;
        this.dynamic = dynamic;
        this.isFirst = isFirst;
        this.action = action;
        this.answers = answers;
    }

    getId(): number {
      return this.id;
    }

    setId(value: number) {
      this.id = value;
    }

    getBaseText() {
        return this.baseText;
    }

    setBaseText(value: string) {
        this.baseText = value;
    }

    getRecurrentText() {
      return this.recurrentText;
    }

    setRecurrentText(value: string) {
      this.recurrentText = value;
    }

    isDynamic() {
      return this.dynamic;
    }

    setDynamic(value: boolean) {
      this.dynamic = value;
    }

    isFirstQuestion() {
      return this.isFirst;
    }

    setFirst(value: boolean) {
      this.isFirst = value;
    }

    getAction() {
      return this.action;
    }

    setAction(value: Number) {
      this.action = value;
    }

    getAnswers() {
      return this.answers;
    }
}
