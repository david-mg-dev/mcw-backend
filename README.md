# mcw-backend


# DATA MODEL

![datamodel](https://user-images.githubusercontent.com/103194843/231605328-f9652dd6-1763-4dcc-9181-33e74afb73ed.jpg)



# ENDPOINT
- POST CreateUser [http://localhost:5000/api/users/create](http://localhost:5000/api/users/create)

```json
{
  "username": "Admin",
  "email": "admin@email.com",
  "password": "admin",
  "fullname": "Administrador",
  "deposit": 1000 
}
```

- POST LoginUser [http://localhost:5000/api/users/login](http://localhost:5000/api/users/login)

```json
{
  "email": "admin@email.com",
  "password": "admin"
}
```

- POST AddCryptoToWallet [http://localhost:5000/api/wallet/a](http://localhost:5000/api/wallet/all/461913e6-35c2-4983-aad5-779858fdd314)dd

```json
{
  "wallet_id": "58dc124e-ad78-4488-b521-d6c74b7ba8de",
  "user_id": "461913e6-35c2-4983-aad5-779858fdd314",
  "crypto_id": "4d22904e-4ecf-47fb-b1dc-11d8dcebc308",
  "amount": 0
}
```

- POST BuyCrypto http://localhost:5000/api/wallet/buy

```json
{
    "user_id": "ecc142dd-4608-4143-a198-6c197a46708a",
    "crypto_id": "c3d96874-d780-4a2e-b865-0a8db6d444a6",
    "amount": 100
}
```

- POST SellCrypto http://localhost:5000/api/wallet/sell 

```json
{
    "user_id": "ecc142dd-4608-4143-a198-6c197a46708a",
    "crypto_id": "c3d96874-d780-4a2e-b865-0a8db6d444a6",
    "amount": 100
}
```
- GET GetWalletUser http://localhost:5000/api/wallet/all/1e287c11-265f-41bc-98a3-6ef0085c1d34
```json
  {
    "wallet_id": "7cbbf0b3-ac7c-49a5-a011-599404928c85",
    "user_id": "1e287c11-265f-41bc-98a3-6ef0085c1d34",
    "crypto_id": "b5108fa1-62ad-4d03-b282-59c3d9f2d43e",
    "amount": 450.8,
    "crypto": {
      "crypto_id": "b5108fa1-62ad-4d03-b282-59c3d9f2d43e",
      "name": "Bitcoin",
      "asset": "BTC\n",
      "value": 20000,
      "stock": 7366.275,
      "icon": "assets/logos_cryptos/btc.png"
    }
  }
```
