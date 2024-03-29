import classNames from "classnames";

import { Input } from "../";

import styles from "./PasswordInput.module.sass";

import type { SpecificInputProps } from "../types";


const PasswordInput = (props: SpecificInputProps) => {
  return <Input
    className={classNames(styles.PasswordInput, props.className)}
    inputType="password"
    name={props.name}
    value={props.value}
    placeholder={props.placeholder}
    maxLength={
      props.maxLength ??
      Number(process.env.REACT_APP_MAX_PASSWORD_LENGTH ?? "30")}
    isRequired={true}
    forwardedRef={props.forwardedRef}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    autoFocus={props.autoFocus}
  />;
};

export default PasswordInput;