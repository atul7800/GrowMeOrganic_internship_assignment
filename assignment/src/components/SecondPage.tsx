// src/pages/SecondPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import DepartmentList from '../components/DepartmentList';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
    <DataTable />
    <DepartmentList />
  </div>
  );
};

export default SecondPage;