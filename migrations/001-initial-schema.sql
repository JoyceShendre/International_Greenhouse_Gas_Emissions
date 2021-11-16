-- Up

CREATE TABLE greenhouse_gas_inventory_data_data (
  id INTEGER  PRIMARY KEY AUTOINCREMENT,
  country_name TEXT NOT NULL,
  all_years INT NOT NULL,
  gas_values  TEXT  NOT NULL,
  category TEXT NOT NULL
);

-- Down
DROP TABLE greenhouse_gas_inventory_data_data;