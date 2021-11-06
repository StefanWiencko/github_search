import Content from "./Content";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PropsData } from "../types/types";
import { generateData } from "../utils/graphql-test-utils";

const setup = (repoCount: number) => {
  const data: PropsData = generateData(repoCount);
  const utils = render(<Content data={data} repositoryCount={repoCount} />);
  return utils;
};
describe("Content renders properly", () => {
  it('Displays "No resoulst found" if there is 0 resoluts', () => {
    const document = setup(0);
    const noResoluts = document.getByRole("heading", {
      name: /no resoluts found/i,
    });
    expect(noResoluts).toBeInTheDocument();
  });
  it("Displays 3 resoluts correctly", () => {
    const document = setup(3);
    const nothingMore = document.getAllByRole("link");
    expect(nothingMore.length).toBe(3);
  });
  it("Displays 50 resoluts correctly", () => {
    const document = setup(50);
    const nothingMore = document.getAllByRole("link");
    expect(nothingMore.length).toBe(50);
  });
});
