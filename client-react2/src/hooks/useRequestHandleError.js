import { useState, useEffect } from "react";

export default function useRequestHandleError({ error }) {
  const [requestError, setRequestError] = useState([]);
  useEffect(() => {
    if (error?.response?.status === 422) {
      const errors = error.response.data.errors;
      setRequestError(errors);
    }
  }, [error]);
  return [requestError, setRequestError];
}
