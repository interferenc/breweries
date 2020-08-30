/* eslint-disable @typescript-eslint/camelcase */
import { isLeft, isRight } from "fp-ts/lib/Either";
import {
  wellFormedBrewery,
  wellFormedBreweryList
} from "./codec.spec.fixtures";
import { breweryCodec, breweryListCodec } from "./codec";

describe("Brewery Codec", () => {
  it("returns a result for a well formed brewery", () => {
    expect(isRight(breweryCodec.decode(wellFormedBrewery))).toBe(true);
  });

  it("returns an error for an ill formed brewery", () => {
    expect(
      isLeft(breweryCodec.decode({ ...wellFormedBrewery, updated_at: "bar" }))
    ).toBe(true);
  });
});

describe("Brewery List Codec", () => {
  it("returns a result for a well formed brewery list", () => {
    expect(isRight(breweryListCodec.decode(wellFormedBreweryList))).toBe(true);
  });

  it("returns an error for an ill formed brewery list", () => {
    expect(
      isLeft(
        breweryListCodec.decode([
          { ...wellFormedBreweryList[0], id: null },
          { ...wellFormedBreweryList[1], name: null },
          { ...wellFormedBreweryList[2], city: 0 }
        ])
      )
    ).toBe(true);
  });
});
