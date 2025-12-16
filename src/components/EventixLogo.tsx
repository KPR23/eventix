export default function EventixLogo({
  className,
  fontSize,
}: {
  className?: string;
  fontSize?: string;
}) {
  return (
    <h1
      className={`${className} font-bold font-climate-crisis text-primary ${fontSize} uppercase tracking-wider`}
    >
      Eventix
    </h1>
  );
}
