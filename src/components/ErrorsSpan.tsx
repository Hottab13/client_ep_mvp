type ErrorsSpanProps={
  errors:any;
  className:string;
}
export const ErrorsSpan:React.FC<ErrorsSpanProps> = ({ errors, className }) =>
  errors && <span className={className}>{errors?.message || "Ошибка!"}</span>;
