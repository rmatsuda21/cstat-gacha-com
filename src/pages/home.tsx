import Desktop from "@components/home/Desktop";
import Mobile from "@components/home/mobile/Mobile";
import ResponsiveComponent from "@/components/shared/ResponsiveComponent";

export default function Home() {
  return <ResponsiveComponent mobile={<Mobile />} desktop={<Desktop />} />;
}
