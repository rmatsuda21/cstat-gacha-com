import { useEffect, useState } from "react";

interface ResponsiveComponentProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

const ResponsiveComponent = ({ mobile, desktop }: ResponsiveComponentProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? mobile : desktop;
};

export default ResponsiveComponent;
