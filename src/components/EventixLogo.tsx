export default function EventixLogo({
  className,
  fontSize,
  short,
}: {
  className?: string;
  fontSize?: string;
  short?: boolean;
}) {
  return (
    <h1
      className={`${className} font-bold font-climate-crisis text-primary ${fontSize} uppercase tracking-wider`}
    >
      {short ? "E" : "Eventix"}
    </h1>
  );
}
