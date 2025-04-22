
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface FormActionsProps {
  editMode: boolean;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export function FormActions({ editMode, saving, onEdit, onCancel }: FormActionsProps) {
  return (
    <CardFooter>
      {!editMode ? (
        <Button type="button" onClick={onEdit}>
          Edit
        </Button>
      ) : (
        <>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="secondary" className="ml-2" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        </>
      )}
    </CardFooter>
  );
}
