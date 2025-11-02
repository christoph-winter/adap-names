import { X } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if(delimiter != undefined)
        {
            this.delimiter = delimiter;
        }
        this.noComponents = source.split(this.delimiter).length;
        this.name = source;
    }
    
    public asString(delimiter: string = this.delimiter): string {
        return this.name.replaceAll(this.delimiter, delimiter);
    }

    public asDataString(): string {
        return this.name.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER).replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        var component = this.name.split(this.delimiter).at(x);
        if(component == undefined)
        {
            throw new RangeError("no valid element found at position: "+x);
        }
        else return component;
    }

    public setComponent(n: number, c: string): void {
        var arrayName = this.name.split(this.delimiter);
        arrayName[n] = c;
        this.name = arrayName.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        var arrayName = this.name.split(this.delimiter);
        arrayName.splice(n, 0, c)
        this.name = arrayName.join(this.delimiter);
    }

    public append(c: string): void {
        this.name = this.name+this.delimiter+c;
    }

    public remove(n: number): void {
        var arrayName = this.name.split(this.delimiter);
        arrayName.splice(n, 1);
        this.name = arrayName.join(this.delimiter);
    }

    public concat(other: Name): void {
        for(let i = 0; i < other.getNoComponents(); i++)
        {
            this.append(other.getComponent(i));
        }
    }
}