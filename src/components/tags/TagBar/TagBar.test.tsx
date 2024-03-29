import { screen } from "@testing-library/react";
import { setupStore } from "src/redux";
import { renderWithProvidersAndRouters } from "src/utils/test-utils";
import { FetchStatus } from "src/models";

import TagBar from "./TagBar";

const store = setupStore({
  tags: {
    tags: [
      { id: 1, label: "TestTag1", frequency: 7 },
      { id: 2, label: "TestTag2", frequency: 7 },
      { id: 3, label: "TestTag3", frequency: 7 },
    ],
    tagsLoadingStatus: FetchStatus.Complete,
  },
});

describe("TagBar component", () => {
  test("TagBar renders", () => {
    renderWithProvidersAndRouters(<TagBar tags={[1, 2, 3]} />, { store });
    expect(screen.getByText(/testtag1/i)).toBeInTheDocument();
    expect(screen.getByText(/testtag2/i)).toBeInTheDocument();
    expect(screen.getByText(/testtag3/i)).toBeInTheDocument();
  });

  test("TagBar snapshot", () => {
    const { container } = renderWithProvidersAndRouters(
      <TagBar tags={[1, 2, 3]} />, { store },
    );
    expect(container).toMatchSnapshot();
  });
});