import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorAlert(props) {
  const { title, content } = props;
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="capitalize">{title}</AlertTitle>
      <AlertDescription>{content}</AlertDescription>
    </Alert>
  );
}
