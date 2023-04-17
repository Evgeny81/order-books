import React, { memo } from 'react';

interface TableCellProps {
  cellData: string;
}

export const TableCell = memo(({ cellData }: TableCellProps) => {
  return <td>{cellData}</td>;
});

TableCell.displayName = 'TableCell';
