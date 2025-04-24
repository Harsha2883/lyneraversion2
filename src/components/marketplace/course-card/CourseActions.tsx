
import { LearnMoreButton } from "./actions/LearnMoreButton";
import { EnrollButton } from "./actions/EnrollButton";

interface CourseActionsProps {
  id: string;
  title: string;
  price: string;
}

export function CourseActions({ id, title, price }: CourseActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <LearnMoreButton id={id} />
      <EnrollButton title={title} price={price} />
    </div>
  );
}
