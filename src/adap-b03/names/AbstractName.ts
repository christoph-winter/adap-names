import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if(delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        var outString: string = "";
        for(var i = 0; i < this.getNoComponents()-1; i++)
        {
           outString =  outString+this.getComponent(i)+delimiter;
        }
        outString = outString+this.getComponent(this.getNoComponents()-1);
        outString = outString.replace(ESCAPE_CHARACTER, "");
        return outString;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        var outString: string = "";
        for(var i = 0; i < this.getNoComponents()-1; i++)
        {
            outString = outString+this.getComponent(i)+this.delimiter;
        }
        outString = outString+this.getComponent(this.getNoComponents()-1);
        return outString;
    }

    public isEqual(other: Name): boolean {
        return this.asDataString() == other.asDataString();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;
    abstract clone(): Name;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}