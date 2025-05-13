import React, { useState } from 'react';
import AddPasswordForm from './AddPasswordForm.jsx';
import PasswordList from './PasswordList.jsx';

function Password() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* When a password is added, trigger a re-render */}
      <AddPasswordForm onPasswordAdded={() => setRefresh(!refresh)} />

      {/* Pass `refresh` as a prop to PasswordList */}
      <PasswordList refresh={refresh} />
    </div>
  );
}

export default Password;
