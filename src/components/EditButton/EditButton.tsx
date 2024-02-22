import React from 'react';
import '../../styles.css';

type EditButtonProps = {
  handleEdit: () => void;
  inputValue: string | number;
  data: Record<string, any>[];
  selectedRows: string[];
  selectedColumns: string[];
};

export const EditButton: React.FC<EditButtonProps> = ({
  handleEdit,
  inputValue,
  data,
  selectedRows,
  selectedColumns,
}: EditButtonProps) => (
  <button className="button" onClick={handleEdit} disabled={!inputValue}>
    Edit&nbsp;
    {data
      .filter((_) => selectedRows.includes(_.id))
      .slice(0, 3)
      .map((r) => selectedColumns.map((c) => r[c]).join(', '))
      .join(', ')}
  </button>
);

export default EditButton;
