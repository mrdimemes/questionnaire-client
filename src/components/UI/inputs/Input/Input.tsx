import classNames from "classnames";
import { useAppSelector } from "src/redux/hooks";
import { themeSelector } from "src/redux/selectors";
import { getThemeStyle } from "src/redux/slices/themeSlice";
import styles from "./Input.module.sass";
import type { InputProps } from "../types";

const Input = (props: InputProps) => {
  const currentTheme = useAppSelector(themeSelector);

  return <input
    className={classNames(
      styles.Input,
      getThemeStyle(styles, currentTheme),
      props.className
    )}
    type={props.inputType}
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    maxLength={props.maxLength}
    required={props.isRequired}
    ref={props.forwardedRef}
    onChange={props.onChange}
  />
};

export default Input;