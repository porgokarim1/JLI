import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

interface ScheduleCalendarProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export const ScheduleCalendar = ({ selectedDate, setSelectedDate }: ScheduleCalendarProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Schedule Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};