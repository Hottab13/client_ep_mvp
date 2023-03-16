export const ErrorsSpan = ({ errors, className }) =>
  errors && <span className={className}>{errors?.message || "Ошибка!"}</span>;
