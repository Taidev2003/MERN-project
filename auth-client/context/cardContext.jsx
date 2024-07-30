import { createContext, useContext, useState } from "react";

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [food, setFood] = useState(null); // Sửa đổi ở đây
  const [cardItems, setCardItems] = useState([]);
  const [card, setCard] = useState([]);

  const addToCard = (food) => {
    const exist = cardItems.find((x) => x._id === food._id);

    if (exist) {
      setCardItems(
        cardItems.map((x) =>
          x._id === food._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCardItems([...cardItems, { ...food, qty: 1 }]);
    }
  };
  const removeCard = (food) => {
    const exist = cardItems.find((x) => x._id === food._id);

    if (exist.qty === 1) {
      setCardItems(cardItems.filter((x) => x._id !== food._id));
    } else {
      setCardItems(
        cardItems.map((x) =>
          x._id === food._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  console.log("card", cardItems);
  return (
    <CardContext.Provider value={{ cardItems, addToCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
};

const useCardContext = () => {
  return useContext(CardContext);
};

export { CardProvider, useCardContext };
