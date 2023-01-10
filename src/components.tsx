import React from "react";
import cx from "classnames";

export type BaseProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: BaseProps) => (
  <div className="container mx-auto p-4">{children}</div>
);

export const Header = ({ children }: BaseProps) => (
  <h2 className="text-center text-2xl font-bold mb-4">{children}</h2>
);

export type QuestionsInputProps = React.HTMLProps<HTMLTextAreaElement>;

export const QuestionsInput = (props: QuestionsInputProps) => (
  <textarea
    {...props}
    className="w-full border-2 h-96 min-h-fit rounded-none focus:rounded-none"
  />
);

export const ErrorContainer = ({ children }: BaseProps) => (
  <div className="p-4 mb-4 text-l bg-red-400 text-slate-50">{children}</div>
);

export const CenterContainer = ({ children }: BaseProps) => (
  <div className="flex justify-center">{children}</div>
);

export type ButtonProps = React.HTMLProps<HTMLDivElement>;
export const Button = (props: ButtonProps) => (
  <div
    {...props}
    className={cx(
      "text-center p-8 inline-block font-bold text-l",
      props.className
    )}
  />
);

export const GreenButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx("bg-green-400 text-slate-200", props.className)}
  />
);

export const RedButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={cx("bg-red-400 text-slate-50", props.className)}
  />
);

export const AnswersContainer = ({ children }: BaseProps) => (
  <div className="p-4 text-l">{children}</div>
);

export const RowContainer = ({ children }: BaseProps) => (
  <div className="flex p-2 border-b align-middle">{children}</div>
);

export const ItemCheckerContainer = ({ children }: BaseProps) => (
  <div className="whitespace-nowrap">{children}</div>
);

export const ItemTextContainer = ({ children }: BaseProps)=> (<div className="w-full">{children}</div>)

export type CheckerProps = React.HTMLProps<HTMLDivElement>
export const Checker = (props: CheckerProps) => (<div {...props} className={cx("w-4 h-4 inline-block ml-2", props.className)} />)

const buildChecker = (classes: string) => (props: CheckerProps) => <Checker {...props} className={cx(classes, props.className)} />

export const BlueChecker = buildChecker("bg-blue-400")
export const GreyChecker = buildChecker("bg-neutral-300")
export const GreenChecker = buildChecker("bg-green-600")
export const RedChecker = buildChecker("bg-red-600")
