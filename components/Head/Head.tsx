import {
  MutableRefObject,
  useEffect,
  useRef,
  VFC,
  ReactNode,
  ComponentProps,
} from "react";

type Props<T extends VFC<any> | keyof JSX.IntrinsicElements> = {
  bodyRef: MutableRefObject<HTMLElement>;
  children: ReactNode;
  at?: T;
} & ComponentProps<T>;

export default function Head<
  T extends VFC<any> | keyof JSX.IntrinsicElements = "div"
>({
  bodyRef,
  children,
  at: Component = "div",
  ...props
}: Props<T>): JSX.Element {
  const headRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onResize = () => {
      if (bodyRef && bodyRef.current && headRef.current) {
        bodyRef.current.style.width = headRef.current.offsetWidth + "px";
      }
    };
    if (bodyRef && bodyRef.current && headRef.current) {
      bodyRef.current.style.width = headRef.current.offsetWidth + "px";
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Component ref={headRef} {...props}>
      {children}
    </Component>
  );
}
