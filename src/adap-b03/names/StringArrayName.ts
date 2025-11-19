import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {


    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i].replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
            .replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
    }

    public setComponent(i: number, c: string) {
        this.components[i] = c;  
    }

    public insert(i: number, c: string) {
        this.components.splice(i, 0, c); 
    }

    public append(c: string) {
        this.components.push(c);    
    }

    public remove(i: number) {
        this.components.splice(i, 1);
    }
    public clone(): StringArrayName {
        return new StringArrayName([...this.components], this.delimiter);
    }
}