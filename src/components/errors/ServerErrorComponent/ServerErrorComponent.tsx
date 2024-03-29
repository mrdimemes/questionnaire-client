import { HTTPErrorStatusCode } from "src/api/exceptions";

import { ErrorComponent } from "../ErrorComponent";

const ServerErrorComponent = () => {
  return (
    <ErrorComponent
      statusCode={HTTPErrorStatusCode.ServerError}
      label="Что-то сломалось. Бип-буп... :("
    />
  );
};

export default ServerErrorComponent;