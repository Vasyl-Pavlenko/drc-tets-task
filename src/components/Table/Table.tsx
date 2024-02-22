import React from 'react';
import { Checkbox } from '../CheckBox';
import { EditButton } from '../EditButton';
import { TableProps, TableState, LIMITS, customSort, limitsWithId } from '../../helpers';

export const Table: React.FC<TableProps> = ({ data, columns, defaultLimit = 25 }: TableProps) => {
  const [state, setState] = React.useState<TableState>({
    selectedColumns: [],
    searchInput: '',
    searchedData: data,
    inputValue: '',
    selectedRows: [],
    sortedColumn: undefined,
    limit: defaultLimit,
  });

  const clearSearch = () => setState((prevState) => ({ ...prevState, searchInput: '' }));
  const handleChangeEdit = () => {
    const updatedData = data.map((item) => {
      if (state.selectedRows.includes(item.id.toString())) {
        state.selectedColumns.forEach((column) => {
          item[column] = state.inputValue;
        });
      }
      return item;
    });

    setState((prevState) => ({
      ...prevState,
      selectedColumns: [],
      selectedRows: [],
      searchedData: updatedData,
      inputValue: '',
    }));
  };

  const generateChangeHandler =
    <T extends keyof TableState>(key: T) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setState((prevState) => ({ ...prevState, [key]: e.target.value } as TableState));
    };

  const handleSearchChange = generateChangeHandler('searchInput');
  const hadleEditChange = generateChangeHandler('inputValue');
  const handleSortChange = generateChangeHandler('sortedColumn');
  const handleLimitChange = generateChangeHandler('limit');

  const handleCheckboxChange = (id: string, checked: boolean, isRow: boolean) => {
    setState((prevState) => {
      const key = isRow ? 'selectedRows' : 'selectedColumns';
      const { [key]: selectedItems } = prevState;
      const updatedItems = checked
        ? [...selectedItems, id.toString()]
        : selectedItems.filter((item) => item !== id.toString());

      return {
        ...prevState,
        [key]: updatedItems,
      };
    });
  };

  const searchedData = React.useMemo(() => {
    return data.filter((item) =>
      columns.some((column) => {
        const value = item?.[column.id] as string;
        return value && value.toString().toLowerCase().includes(state.searchInput.toLowerCase());
      }),
    );
  }, [data, state.searchInput, columns]);

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      searchedData,
    }));
  }, [searchedData]);

  return (
    <div>
      {defaultLimit && !LIMITS.includes(defaultLimit) && (
        <span style={{ color: 'red' }}>Invalid limit value {defaultLimit}</span>
      )}
      <div className="helpers">
        <div className="helpers__block">
          <input value={state.searchInput} onChange={handleSearchChange} placeholder="Search..." />

          <button className="button" onClick={clearSearch} disabled={!state.searchInput}>
            Clear Search
          </button>
        </div>

        <div className="helpers__block">
          <input
            value={state.inputValue}
            onChange={hadleEditChange}
            placeholder={
              !state.selectedRows.length || !state.selectedColumns.length
                ? 'Select row and column'
                : 'Enter new value'
            }
            disabled={!state.selectedRows.length || !state.selectedColumns.length}
          />

          <EditButton
            handleEdit={handleChangeEdit}
            inputValue={state.inputValue as string}
            data={data}
            selectedRows={state.selectedRows}
            selectedColumns={state.selectedColumns}
          />
        </div>

        <div className="helpers__block">
          Sort by:
          <select value={state.sortedColumn as string} onChange={handleSortChange}>
            {columns.map((column) => (
              <option value={column.id} key={column.id}>
                {column.title}
              </option>
            ))}
          </select>
        </div>

        <div className="helpers__block">
          Limit displayed:
          <select value={state.limit} onChange={handleLimitChange}>
            {limitsWithId.map(({ id, value }) => (
              <option value={value} key={id}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <br />

      {!state.searchedData || state.searchedData.length === 0 ? (
        <div className="error">Nothing found. Try another query</div>
      ) : (
        <table border={1}>
          <thead>
            <tr>
              <th></th>
              {columns.map((column) => (
                <th key={column.id}>
                  <Checkbox
                    id={column.id}
                    label={column.title}
                    checked={state.selectedColumns.includes(column.id)}
                    onChange={(e) => handleCheckboxChange(column.id, e.target.checked, false)}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {state.searchedData
              .slice(0, state.limit)
              .sort((a, b) => customSort(a, b, state.sortedColumn))
              .map((d) => (
                <tr key={d.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={state.selectedRows.includes(d.id.toString())}
                      onChange={(e) => handleCheckboxChange(d.id, e.target.checked, true)}
                    />
                  </td>

                  {columns.map((column) => (
                    <td key={column.id}>{column.render(d)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
