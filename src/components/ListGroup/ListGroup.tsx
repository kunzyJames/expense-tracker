import { useState } from "react";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const Li = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(props) => (props.active ? "blue" : "none")};
`;

interface ListItemProps {
  active: boolean;
}

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  //hook allows us to tap into built in features in react
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <Ul className="listGroup">
        {items.map((item, index) => (
          <Li
            active={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            // className={
            //   selectedIndex === index
            //     ? "list-group-item active"
            //     : "list-group-item"
            // }
            key={item}
          >
            {item}
          </Li>
        ))}
      </Ul>
    </>
  );
}

export default ListGroup;
