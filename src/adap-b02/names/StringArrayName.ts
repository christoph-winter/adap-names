import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if(delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
        this.components = source;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.map(
            (x: string) =>
                x.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                    .replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter)
            )
            .join(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length == 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertIsIndexInRange(i);        
        return this.components[i];    }

    public setComponent(i: number, c: string): void {
        this.assertIsIndexInRange(i);
        this.components[i] = c;    
    }

    public insert(i: number, c: string): void {
        this.assertIsIndexInRange(i);
        this.components.splice(i, 0, c)
    }

    public append(c: string): void {
        this.components.push(c);    
    }

    public remove(i: number): void {
        this.assertIsIndexInRange(i)
        this.components.splice(i, 1)
    }

    public concat(other: Name): void {
        var newName = this.components;
        for(let i = 0; i < other.getNoComponents(); i++)
        {
            this.append(other.getComponent(i));
        }
    }
    protected assertIsIndexInRange(i: number): void{
        if(i < 0 || i >= this.components.length){
            throw new RangeError("Index out of bounds");
        }
    }
}