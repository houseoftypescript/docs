import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export type DropdownProps = {
  icon: React.ReactNode;
  title: string;
  items?: { children: React.ReactNode }[];
};

const Dropdown: React.FC<DropdownProps> = ({ icon, title, items = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="dropdown-button"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div className="block md:hidden">{icon}</div>
        <div className="hidden md:block">{title}</div>
      </Button>
      {items.length > 0 && (
        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'dropdown-button',
          }}
        >
          {items.map((item, index) => {
            return (
              <MenuItem key={`menu-item-${index}`} onClick={handleClose}>
                {item.children}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </div>
  );
};

export default Dropdown;
