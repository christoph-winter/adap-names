import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.noComponents = this.splitStringIntoComponents(source).length;
        this.name = source;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        var component = this.splitStringIntoComponents(this.name).at(i);
        if(component == undefined)
        {
            throw new RangeError("no valid element found at position: "+i);
        }
        return component;
    }

    public setComponent(i: number, c: string) {
        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName[i] = c;
        this.name = arrayName.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName.splice(i, 0, c)
        this.name = arrayName.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string) {
        this.name = this.name+this.delimiter+c;
        this.noComponents++;
    }

    public remove(i: number) {
        var arrayName = this.splitStringIntoComponents(this.name);
        arrayName.splice(i, 1);
        this.name = arrayName.join(this.delimiter);
        this.noComponents--;
    }
    
    private splitStringIntoComponents(str: string): string[]
    {
        // Escape any regex meta-characters in delimiter
        const escapedDelim = this.delimiter.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
        
        // Escape control characters. 
        const regex = new RegExp(`(?<!\\\\)[${escapedDelim}]`);
        return str.split(regex);
    }
    public clone(): StringName
    {
        return new StringName(this.name, this.delimiter);
    }
}