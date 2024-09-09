import { SortDirection } from "../../types/sort-direction.enum";
import { SortTypes } from "../../types/sort-types.enum";

type SortTypeItemProps = {
  text: string;
  type: SortTypes;
  isActive: boolean;
  buttonClickHandler: () => void;
}

type SortDirectionItemProps = {
  isActive: boolean;
  value: SortDirection;
  buttonClickHandler: () => void;
}

type SortBlockProps = {
  activeSort: SortTypes;
  onChangeSortType: (arg: SortTypes) => void;
  activeDirection: SortDirection;
  onChangeDirection: (arg: SortDirection) => void
}


function SortTypeItem({text, type, isActive, buttonClickHandler}: SortTypeItemProps):JSX.Element {
  return (
    <button
      className={isActive ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'}
      aria-label={text}
      value={type}
      onClick={buttonClickHandler}
    >{text}
    </button>
  );
}

function SortDirectionItem({isActive, value, buttonClickHandler}: SortDirectionItemProps):JSX.Element {
  return (
    <button
      className={isActive ? `catalog-sort__order-button catalog-sort__order-button--${value === SortDirection.Up ? 'up' : 'down'} catalog-sort__order-button--active` : `catalog-sort__order-button catalog-sort__order-button--${value === SortDirection.Up ? 'up' : 'down'}`}
      aria-label={value === SortDirection.Up ? 'По возрастанию' : 'По убыванию'}
      value={value}
      onClick={buttonClickHandler}
    >
    </button>
  );
}

function SortBlock({activeSort, onChangeSortType, activeDirection, onChangeDirection}: SortBlockProps):JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {Object.values(SortTypes).map((item, index) => <SortTypeItem
                  key={index}
                  text={item === SortTypes.Date ? 'по дате' : 'по цене'}
                  type={item}
                  isActive={item === activeSort}
                  buttonClickHandler={() => onChangeSortType(item)}
        />)}
      </div>
      <div className="catalog-sort__order">
        {Object.values(SortDirection).map((item, index) => <SortDirectionItem
                  isActive={item === activeDirection}
                  value={item}
                  key={index}
                  buttonClickHandler={() => onChangeDirection(item)}
        />)}
      </div>
    </div>
  );
}

export default SortBlock;
