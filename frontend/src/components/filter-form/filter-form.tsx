import { useState } from "react";
import { GuitarTypes } from "../../types/guitar-types.enum";


function FilterForm():JSX.Element {
  const [types, setTypes] = useState(Object.values(GuitarTypes));
  const [strings, setStrings] = useState([4, 6, 7, 12]);

  const handleTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (types.includes(evt.target.value as GuitarTypes)) {
      setTypes(types.filter((item) => item !== evt.target.value))
    } else {
      setTypes([...types, evt.target.value as GuitarTypes]);
    }
  }

  const handleStringsCountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (strings.includes(+evt.target.value)) {
      setStrings(strings.filter((item) => item !== +evt.target.value))
    } else {
      setStrings([...strings, +evt.target.value]);
    }
  }

  return (
    <form className="catalog-filter" action="#" method="post" >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            value={GuitarTypes.Acustic}
            checked={types.includes(GuitarTypes.Acustic)}
            onChange={handleTypeChange}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            value={GuitarTypes.Electro}
            checked={types.includes(GuitarTypes.Electro)}
            onChange={handleTypeChange}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            value={GuitarTypes.Ukulele}
            checked={types.includes(GuitarTypes.Ukulele)}
            onChange={handleTypeChange}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            value={4}
            checked={strings.includes(4)}
            onChange={handleStringsCountChange}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            value={6}
            checked={strings.includes(6)}
            onChange={handleStringsCountChange}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            value={7}
            checked={strings.includes(7)}
            onChange={handleStringsCountChange}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            value={12}
            checked={strings.includes(12)}
            onChange={handleStringsCountChange}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default FilterForm;
