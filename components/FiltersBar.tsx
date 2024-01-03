import React, { useCallback, useState } from "react";
import { useSelector, useDispatch} from "../context/index";
import { TODOSState, actionCreators } from "../context/reducer";

const filters = [
  {
    id: 'none',
    label: 'None'
  },
  {
    id: 'done',
    label: 'Done'
  },
  {
    id: 'undone',
    label: 'Undone'
  }
];

const FiltersBar: React.FC = () => {
  const dispatcher = useDispatch();
  const todosContext: TODOSState = useSelector(
    (state: TODOSState) => state,
  );
  const {
    todos,
  } = todosContext;

  const [filterBy, setFilterBy] = useState('none');

  const handleFilter = useCallback((event) => {
    const filterValue = event.target.value;
    setFilterBy(filterValue);
    const filteredlistDone = todos.filter(todo => todo.done);
    const filteredlistUndone = todos.filter(todo => !todo.done);
    const filterValueMap = {
      'none': [],
      'done': filteredlistDone,
      'undone': filteredlistUndone,
    }
    const filterContext = {
      filter: filterValue === 'none' ? null : filterValue,
      filteredList: filterValueMap[filterValue]
    }
    dispatcher(actionCreators.setFilter(filterContext));
  }, [filterBy]);

  return (
    <fieldset className="filter-group">  
      <legend>Filter by:</legend>
      <div>
        {filters.map(({label, id}) => (
          <label key={id} className="filter-item">
            {label}
            <input
              type="radio"
              id={id}
              name="filter"
              value={id}
              checked={filterBy===id}
              onChange={handleFilter}
            />
          </label>
        ))}
      </div>
      <style jsx>{`
        .filter-group {
          border-radius: 4px;
        }
        .filter-item {
          padding: 0 4px;
        }
      `}</style>
  </fieldset>
  )
}

export default FiltersBar;
