import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

import styles from "./ScrollingText.module.scss";

type ScrollingTextProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<C>;

const ScrollingText = <C extends React.ElementType>({
  as,
  children,
  ...rest
}: ScrollingTextProps<C>) => {
  const Component = as;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // If header's width is larger than the screen,
    // Add a scrolling animation to the header
    if (ref.current) {
      const headerWidth = ref.current.getBoundingClientRect().width;
      const parentWidth =
        ref.current.parentElement?.getBoundingClientRect().width || 0;

      if (headerWidth > parentWidth) {
        ref.current.style.setProperty(
          "--scrollWidth",
          `-${headerWidth - parentWidth}px`
        );
        ref.current.classList.add(styles.animate);
      } else {
        ref.current.classList.remove(styles.animate);
      }
    }
  }, [ref.current]);

  if (typeof Component === "undefined") {
    return <span ref={ref}>{children}</span>;
  }

  return (
    <Component
      {...(rest as any)}
      style={{ overflow: "hidden", minHeight: "2rem", position: "relative" }}
    >
      <span ref={ref} style={{ textWrap: "nowrap", position: "absolute" }}>
        {children}
      </span>
    </Component>
  );
};

export default ScrollingText;
