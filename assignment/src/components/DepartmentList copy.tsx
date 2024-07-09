import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Provided JSON data
const departmentsData = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>(initializeCheckedState());

  // Initialize checked state for departments and sub-departments
  function initializeCheckedState() {
    let initialChecked: Record<string, boolean> = {};
    departmentsData.forEach((dept) => {
      initialChecked[dept.department] = false;
      dept.sub_departments.forEach((subDept) => {
        initialChecked[`${dept.department}-${subDept}`] = false;
      });
    });
    return initialChecked;
  }

  useEffect(() => {
    setChecked(initializeCheckedState());
  }, []);

  const handleDepartmentCheckboxChange = (department: string) => {
    const newCheckedState: Record<string, boolean> = { ...checked };

    if (!checked[department]) {
      // Check all sub-departments when department is checked
      departmentsData
        .find((dept) => dept.department === department)
        ?.sub_departments.forEach((subDept) => {
          newCheckedState[`${department}-${subDept}`] = true;
        });
    } else {
      // Uncheck all sub-departments when department is unchecked
      departmentsData
        .find((dept) => dept.department === department)
        ?.sub_departments.forEach((subDept) => {
          newCheckedState[`${department}-${subDept}`] = false;
        });
    }

    // Update checked state for the department itself
    newCheckedState[department] = !checked[department];
    setChecked(newCheckedState);
  };

  const handleSubDepartmentCheckboxChange = (department: string, subDept: string) => {
    const newCheckedState: Record<string, boolean> = { ...checked };
    newCheckedState[`${department}-${subDept}`] = !checked[`${department}-${subDept}`];

    // Check/uncheck department based on sub-department states
    const allSubDeptsChecked = departmentsData
      .find((dept) => dept.department === department)
      ?.sub_departments.every((sub) => newCheckedState[`${department}-${sub}`]);

    newCheckedState[department] = !!allSubDeptsChecked; // Convert to boolean

    setChecked(newCheckedState);
  };

  const handleClick = (department: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department],
    }));
  };

  return (
    <List>
      {departmentsData.map((dept, index) => (
        <React.Fragment key={index}>
          <ListItem button onClick={() => handleClick(dept.department)}>
            <Checkbox
              checked={checked[dept.department] || false}
              onChange={() => handleDepartmentCheckboxChange(dept.department)}
            />
            <ListItemText primary={dept.department} />
            {open[dept.department] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup>
                {dept.sub_departments.map((subDept, subIndex) => (
                  <FormControlLabel
                    key={subIndex}
                    control={
                      <Checkbox
                        checked={checked[`${dept.department}-${subDept}`] || false}
                        onChange={() => handleSubDepartmentCheckboxChange(dept.department, subDept)}
                        name={`${dept.department}-${subDept}`}
                        color="primary"
                      />
                    }
                    label={subDept}
                    sx={{ ml: 2 }} // Add margin-left to the FormControlLabel
                  />
                ))}
              </FormGroup>
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
