import { useState, useEffect } from 'react';

export const useConfirmPasswordStatus = (password, confirmPassword) => {
  const [status, setStatus] = useState(null); 

  useEffect(() => {
    if (!confirmPassword) {
      setStatus(null);
      return;
    }
    if (confirmPassword === password) {
      setStatus('success');
    } else if (password.startsWith(confirmPassword)) {
      setStatus('warn');
    } else {
      setStatus('error');
    }
  }, [password, confirmPassword]);

  return status;
};
