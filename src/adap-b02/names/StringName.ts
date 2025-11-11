import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    //expects a properly masked string i.e. singular name components intentionally containing control characters should be escaped 
    constructor(source: string, delimiter?: string) {
        if(delimiter != undefined && delimiter.length == 1)
        {
            this.delimiter = delimiter;
        }

        this.noComponents = this.splitStringIntoComponents(source).length;
        this.name = source;
    }
    
    public asString(delimiter: string = this.delimiter): string {
        if(delimiter.length != 1) throw new TypeError("delimiter length is invalid");
        return this.splitStringIntoComponents(this.name).map(
                    (x: string) =>
                        x.replaceAll(ESCAPE_CHARACTER, "")
                    )
                    .join(delimiter);
    }

    public asDataString(): string {
        return this.name;
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
        var component = this.splitStringIntoComponents(this.name).at(x);
        if(component == undefined)
        {
            throw new RangeError("no valid element found at position: "+x);
        }
        else return component;
    }

    public setComponent(n: number, c: string): void {
        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName[n] = c;
        this.name = arrayName.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName.splice(n, 0, c)
        this.name = arrayName.join(this.delimiter);
    }

    public append(c: string): void {
        this.name = this.name+this.delimiter+c;
    }

    public remove(n: number): void {
        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName.splice(n, 1);
        this.name = arrayName.join(this.delimiter);
    }

    public concat(other: Name): void {
        for(let i = 0; i < other.getNoComponents(); i++)
        {
            this.append(other.getComponent(i));
        }
    }

    private splitStringIntoComponents(str: string): string[]
    {
        // Escape any regex meta-characters in delimiter
        const escapedDelim = this.delimiter.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
        
        // Escape control characters. 
        const regex = new RegExp(`(?<!\\\\)[${escapedDelim}]`);
        return str.split(regex);
    }
}