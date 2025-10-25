import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.remove(1);
    expect(n.getNoComponents()).toBe(2);
    expect(n.asString()).toBe("oss.de");
  });
  it("test setComponent", () =>{
    let n: Name = new Name(["oss", "fau", "de"]);
    n.setComponent(2,"com");
    expect(n.asString()).toBe("oss.fau.com");
  })
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("test delimiter in dataString", () => {
  it("test delimiter escaping", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '.');
    expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de");
    expect(n.asString("oss.cs.fau.de"));
    n.append("people");
    expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de.people");
  });
});

describe("test basic method invalid input", () => {
  it("test name list manipulation", () => {
    let n: Name = new Name(["oss","cs","fau.de"], ',');
    expect(()=>n.insert(-5, "foo")).toThrowError("Index out of bounds");
    expect(()=>n.setComponent(10000, "foo")).toThrowError("Index out of bounds");
    expect(()=>n.remove(-42)).toThrowError("Index out of bounds");
})
})
