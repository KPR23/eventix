import { Search } from "lucide-react";
import DatePicker from "./date-picker";
import { Input } from "./input";

export default function DateLocationInput({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="relative flex w-full justify-center">
      <DatePicker />
      <Input
        placeholder="Location"
        className={`w-full max-w-100 rounded-r-full pl-9 ${className}`}
      />
      <Search className="" />
    </div>
  );
}
