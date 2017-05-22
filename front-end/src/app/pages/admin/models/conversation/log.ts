export class Log {

    private question: string;
    private answer: string;
    private timestamp: string;

    constructor(question: string, answer: string, timestamp: string) {
        this.question = question;
        this.answer = answer;
        this.timestamp = timestamp;
    }

    getQuestion(): string {
        return this.question;
    }

    setQuestion(value: string) {
        this.question = value;
    }

    getAnswer(): string {
        return this.answer;
    }

    setAnswer(value: string) {
        this.answer = value;
    }

    getTimestamp(): string {
        return this.timestamp;
    }

    setTimestamp(value: string) {
        this.timestamp = value;
    }
}