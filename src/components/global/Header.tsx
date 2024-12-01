import { useState } from "react";
import { Modal, Button } from "antd";
import { useFetch } from "../../hooks/useFetch";

interface Currency {
  name: string;
  id: string;
}

const Header = ({currencySelect}: {currencySelect: (id: string) => void}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currencies: Currency[] = [
    { name: "USD", id: "usd" },
    { name: "AED", id: "aed" },
    { name: "EUR", id: "eur" },
  ];

 const handleSelectCurrency = (id: string) => {
      setIsModalOpen(false);
      currencySelect(id);
  }

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Currency
      </Button>

      <Modal
        title="Select Currency"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {currencies.map((currency) => (
          <p
            key={currency.id}
            onClick={() => handleSelectCurrency(currency.id)}            
            style={{
              cursor: "pointer",
              margin: "8px 0",
            }}
          >
            {currency.name}
          </p>
        ))}
      </Modal>
    </div>
  );
};

export default Header;
