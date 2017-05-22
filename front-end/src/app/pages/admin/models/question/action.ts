export class Action {

    private id: Number;
    private text: string;
    private isQuestion: boolean;

    constructor(id: Number, text: string, isQuestion: boolean) {
        this.id = id;
        this.text = text;
        this.isQuestion = isQuestion;
    }

    getId(): Number {
      return this.id;
    }

    setId(value: Number) {
      this.id = value;
    }

    getText() {
        return this.text;
    }

    setText(value: string) {
        this.text = value;
    }

    getIsQuestion() {
      return this.isQuestion;
    }

    setIsQuestion(value: boolean) {
      this.isQuestion = value;
    }
}
