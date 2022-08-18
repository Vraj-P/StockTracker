CREATE DATABASE stockDB;

CREATE TABLE stockList( 
    stock_id SERIAL PRIMARY KEY, 
    stock_label VARCHAR(16) NOT NULL, 
    stock_buy_price INTEGER NOT NULL, 
    stock_quantity INTEGER NOT NULL, 
    stock_buy_date VARCHAR(32) NOT NULL
);