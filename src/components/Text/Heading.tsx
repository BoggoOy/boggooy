// import { useTranslation } from 'react-i18next';
import { HTMLProps } from "react";

// This HeaderType is a union of all possible header types
type HeaderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  tag?: HeaderType;
  text: string;
  i18nKey?: string;
  i18nParams?: Record<string, string>;
  className?: string;
};

export const Heading = ({
  tag: Tag = "h1",
  text,
  //i18nKey,
  //i18nParams,
  className,
  ...props
}: HeadingProps) => {
  // const { t } = useTranslation();
  return (
    <Tag className={className} {...props}>
      {text}
      {/* {i18nKey ? t(i18nParams ? t(i18nKey, i18nParams)) : props.children} */}
    </Tag>
  );
};
