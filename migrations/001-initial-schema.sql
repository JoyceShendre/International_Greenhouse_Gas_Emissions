-- Up

CREATE TABLE greenhouse_gas_inventory_data_data (
  id INTEGER  PRIMARY KEY AUTOINCREMENT,
  `country_or_area`	TEXT,
	`year`	INTEGER DEFAULT NULL,
	`value`	TEXT,
	`category`	TEXT
);

-- Down
DROP TABLE greenhouse_gas_inventory_data_data;