import SearchForm from "./SearchForm";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const setup = () => {
  const utils = render(<SearchForm />);
  const input = utils.getByRole("textbox") as HTMLInputElement;
  const submit = utils.getByRole("button", { name: /submit/i });
  return {
    input,
    submit,
    ...utils,
  };
};
it("renders correctly", () => {
  const { input, submit } = setup();
  expect(input).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

describe("input validation", () => {
  it("Renders with no value", () => {
    const { input } = setup();
    expect(input.value).toBe("");
  });
  it("Sets user input", () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: { value: "asf545a" },
    });
    expect(input.value).toBe("asf545a");
  });
  it("Min length is 3", () => {
    const { input } = setup();
    expect(input.minLength).toBe(3);
  });
});
// Object.assign(location, { host: "www.newhost.com", pathname: 'file.txt' });
