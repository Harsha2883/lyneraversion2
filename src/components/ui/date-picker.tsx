
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DatePicker({ date, onSelect, disabled = false }: DatePickerProps) {
  const [selectedMonth, setSelectedMonth] = React.useState<number>(date ? date.getMonth() : new Date().getMonth());
  const [selectedYear, setSelectedYear] = React.useState<number>(date ? date.getFullYear() : new Date().getFullYear());

  React.useEffect(() => {
    if (date) {
      setSelectedMonth(date.getMonth());
      setSelectedYear(date.getFullYear());
    }
  }, [date]);

  const handleMonthChange = (month: string) => {
    const newMonth = parseInt(month, 10);
    setSelectedMonth(newMonth);
    
    if (date) {
      const newDate = new Date(date);
      const daysInMonth = new Date(selectedYear, newMonth + 1, 0).getDate();
      newDate.setMonth(newMonth);
      newDate.setDate(Math.min(date.getDate(), daysInMonth));
      onSelect(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year, 10);
    setSelectedYear(newYear);
    
    if (date) {
      const newDate = new Date(date);
      const isLeapYear = (newYear % 4 === 0 && newYear % 100 !== 0) || (newYear % 400 === 0);
      if (date.getMonth() === 1 && date.getDate() === 29 && !isLeapYear) {
        newDate.setDate(28);
      }
      newDate.setFullYear(newYear);
      onSelect(newDate);
    }
  };

  // Generate a range of years from 1920 to current year
  const years = Array.from({ length: new Date().getFullYear() - 1920 + 1 }, (_, i) => 1920 + i).reverse();
  
  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  const formatDisplayDate = () => {
    if (!date) return "Pick a date";
    try {
      return format(date, "PPP");
    } catch (error) {
      console.error("Error formatting date:", error, date);
      return "Invalid date";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDisplayDate()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3 flex gap-2">
          <Select 
            value={selectedMonth.toString()} 
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedYear.toString()} 
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          month={new Date(selectedYear, selectedMonth)}
          onMonthChange={(newDate) => {
            setSelectedMonth(newDate.getMonth());
            setSelectedYear(newDate.getFullYear());
          }}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}
