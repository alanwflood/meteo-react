import React from "react";
import renderer from "react-test-renderer";
import App from "../app";
import Layout from "../layouts";

describe("The main app", () => {
  it("should render to screen", () => {
    const component = renderer.create(<Layout />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
