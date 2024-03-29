import { ValidationWarning } from "src/models";


class ValidationError extends Error {
  warnings: ValidationWarning[];

  constructor(warnings: ValidationWarning[]) {
    super("Валидация не пройдена.");
    this.warnings = warnings;
  };
}

export default ValidationError;