interface ResponsiveComponentProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

const ResponsiveComponent = ({ mobile, desktop }: ResponsiveComponentProps) => {
  const isMobile = window.innerWidth < 768;

  return isMobile ? mobile : desktop;
};

export default ResponsiveComponent;
