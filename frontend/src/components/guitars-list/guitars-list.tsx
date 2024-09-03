import { Guitar } from "../../types/guitar.type";
import GuitarCard from "../guitar-card/guitar-card";

type GuitarsListProps = {
  data: Guitar[];
}

function GuitarsList({data}: GuitarsListProps):JSX.Element {
  return (
    <ul className="catalog-cards__list">
      {data.map((item) => <GuitarCard info={item} key={item.id} />)}
    </ul>
  );
}

export default GuitarsList;
