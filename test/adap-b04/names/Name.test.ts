import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b03/names/Name";
import { StringName } from "../../../src/adap-b03/names/StringName";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);

  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
    expect(n.getNoComponents()).toBe(3);
  });
  it("test clone", () => {
    let n = new StringName("oss.cs.fau.de");
    let clonedName = n.clone();
    clonedName.asString();
    expect(clonedName.asString()).toBe("oss.cs.fau.de");
  });
  it("test concat", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.concat(new StringName("com.tv.to"));
    expect(n.asString()).toBe("oss.cs.fau.de.com.tv.to")
    expect(n.getNoComponents()).toBe(7);
  });
    it("test equality", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let otherN: Name = new StringName("oss.cs.fau.de");
    expect(n.isEqual(otherN)).toBe(true);
    expect(n.getHashCode()).toBe(otherN.getHashCode());
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
    it("test clone", () => {
    let n = new StringArrayName(["oss","cs","fau","de"],".");
    let clonedName = n.clone();
    clonedName.asString();
    expect(clonedName.asString()).toBe("oss.cs.fau.de");
    expect(clonedName.getNoComponents()).toBe(4);
  });
    it("test concat with stringName", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    n.concat(new StringArrayName(["com","tv","to"]));
    expect(n.asString()).toBe("oss.cs.fau.de.com.tv.to")
    expect(n.getNoComponents()).toBe(7);

  });
  it("test equality", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    let otherN: Name = new StringArrayName(["oss","cs","fau","de"],".");
    expect(n.isEqual(otherN)).toBe(true);
    expect(n.getHashCode()).toBe(otherN.getHashCode());
  });
});

describe("test compatibility of StringArrayName and StringName", () => {
  it("test concat with stringName", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    n.concat(new StringName("com.tv.to"));
    expect(n.asString()).toBe("oss.cs.fau.de.com.tv.to")
    expect(n.getNoComponents()).toBe(7);

  });
  it("test equality", () => {
    let n: Name = new StringArrayName(["oss","cs","fau","de"],".");
    let otherN: Name = new StringName("oss.cs.fau.de");
    expect(n.isEqual(otherN)).toBe(true);
    expect(n.getHashCode()).toBe(otherN.getHashCode());
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });

    it("test escaped delimiter in string", () => {
    let n: Name = new StringName("oss\\#cs#fau#de", "#");
    expect(n.getNoComponents()).toBe(3);
    expect(n.asDataString()).toBe("oss\\#cs#fau#de")
    expect(n.asString('.')).toBe("oss#cs.fau.de");
    n.append("people");
    expect(n.asDataString()).toBe("oss\\#cs#fau#de#people");
    expect(n.asString(".")).toBe("oss#cs.fau.de.people");
  });
  it("test escaped delimiter same behavior as with stringarray", () => {
    let n: Name = new StringArrayName(["oss#cs","fau","de"], "#");
    expect(n.getNoComponents()).toBe(3);
    expect(n.asDataString()).toBe("oss\\#cs#fau#de")
    expect(n.asString('.')).toBe("oss#cs.fau.de");
    n.append("people");
    expect(n.asDataString()).toBe("oss\\#cs#fau#de#people");
    expect(n.asString(".")).toBe("oss#cs.fau.de.people");
  });
});
