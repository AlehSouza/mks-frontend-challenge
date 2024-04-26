import React, { createContext, useContext, useEffect, useState } from 'react';

// Definindo o tipo para o contexto
type BagContextType = {
  bag: any;
  bagOpen: boolean;
  totalBag: number;
  addToBag: (item: any) => void;
  removeFromBag: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  onCloseOpenBag: () => void;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

type IProps = {
  children: any
}

export const BagProvider = ({ children }: IProps) => {
  const [bagOpen, setBagOpen] = useState(false)
  const [totalBag, setTotalBag] = useState<number>(0)
  const [bag, setBag] = useState<any>([]);

  const addToBag = (productToAdd: any) => {
    const existingProductIndex = bag.findIndex((product: { id: number; }) => product.id === productToAdd.id);
    if (existingProductIndex !== -1) {
      const draft = [...bag];
      draft[existingProductIndex].quantity = (draft[existingProductIndex].quantity + 1);
      setBag(draft);
    } else {
      const productWithQuantity = { ...productToAdd, quantity: 1 };
      setBag((prevBag: any) => [...prevBag, productWithQuantity]);
    }

  };

  const removeFromBag = (id: number) => {
    const draft = bag.filter((product: { id: number; }) => product?.id !== id);
    setBag((prevBag: any) => [...draft]);
  }

  const increaseQuantity = (productId: number) => {
    const draft = bag.map((product: { id: number; quantity: number; }) => {
      if (product.id === productId) {
        return { ...product, quantity: (product.quantity || 1) + 1 };
      }
      return product;
    });
    setBag(draft);
  };

  const decreaseQuantity = (productId: number) => {
    const draft = bag.map((product: { id: number; quantity: number; }) => {
      if (product.id === productId && product.quantity && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setBag(draft);
  };

  const onCloseOpenBag = () => {
    setBagOpen(!bagOpen)
  }

  const calculateTotal = () => {
    const totalValue = bag.reduce((acc: number, product: { price: string; quantity: number; }) => {
      const productPrice = parseFloat(product.price);
      const productQuantity = product.quantity || 1;
      return acc + (productPrice * productQuantity);
    }, 0);
    setTotalBag(totalValue);
  };

  useEffect(() => {
    calculateTotal();
  }, [bag]);

  return (
    <BagContext.Provider
      value={{
        bag,
        totalBag,
        bagOpen,
        addToBag,
        increaseQuantity,
        decreaseQuantity,
        removeFromBag,
        onCloseOpenBag
      }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('useBag deve ser utilizado dentro de um BagProvider');
  }
  return context;
};
