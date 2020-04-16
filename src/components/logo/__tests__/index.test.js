import React from "react";
import { render } from "@testing-library/react";
import Logo from "../index";

test("Logo Renders", () => {
  const { container } = render(<Logo />);
  expect(container).toMatchSnapshot();
});
