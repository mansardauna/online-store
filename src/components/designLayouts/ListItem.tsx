import React from 'react';

interface ListItemProps {
  itemName: string;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ itemName, className }) => {
  return <li className={className}>{itemName}</li>;
};

export default ListItem;
