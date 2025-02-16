import React from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function TestCallButton() {
  return (
    <Button type="button" variant="outline" className="rounded-full">
      <Link to="/voice/test">Test voice call</Link>
    </Button>
  );
}
