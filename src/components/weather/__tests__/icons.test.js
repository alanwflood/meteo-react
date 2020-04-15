import React from "react";
import Icon from "../icon";
import { render } from "@testing-library/react";

describe("Weather icon component", () => {
  it("Renders the Clear Day icon", () => {
    const { container } = render(<Icon icon="01d" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Clear Night icon", () => {
    const { container } = render(<Icon icon="01n" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Day icon", () => {
    const { container } = render(<Icon icon="02d" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Night icon", () => {
    const { container } = render(<Icon icon="02n" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Cloudy Day icon", () => {
    const { container } = render(<Icon icon="03d" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Cloudy Night icon", () => {
    const { container } = render(<Icon icon="03n" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Cloudy icon", () => {
    const { container } = render(<Icon icon="04" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Rain icon", () => {
    const { container } = render(<Icon icon="09" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Heavy Rain icon", () => {
    const { container } = render(<Icon icon="10" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Storm icon", () => {
    const { container } = render(<Icon icon="11" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Snow icon", () => {
    const { container } = render(<Icon icon="13" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Hail icon", () => {
    const { container } = render(<Icon icon="50" />);
    expect(container).toMatchSnapshot();
  });
  it("Renders the Day icon by default", () => {
    const { container } = render(<Icon />);
    expect(container).toMatchSnapshot();
  });
});
