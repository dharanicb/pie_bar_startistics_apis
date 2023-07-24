# Pie , Bar , statistics chats API Page

### API 1

#### Path: `/api/init`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    GET http://localhost:3000/api/init
    ```
  - **Description**:

    Returns a list of all data in API whose status is '200 ok'
  - **Response**

    ```
    [
      {
        "id": 1,
        "title": "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
        "price": 329.85,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "sold": false,
        "dateOfSale": "2021-11-27T20:29:54+05:30"
      },
      ...
    ]
    ```


### API 2

#### Path: `/api/statistics/:selectedMonth`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    GET http://localhost:3000/api/statistics/4
    ```
  - **Description**:

    Returns a list of all data in API whose status is statistics for Specific month
  - **Response**

    ```
    {
        "totalSaleAmount" : 4959.84,
        "totalSoldItems" : 3,
        "TotalNotSoldItems" : 57
    }
    ```

### API 3

#### Path: `/api/bar-chart/:selectedMonth`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    GET http://localhost:3000/api/bar-chart/3
    ```
  - **Description**:

    Returns a list of all data in API whose status of "range" and "count"
  - **Response**

    ```
    [
      {
        "range" : "0 - 100",
        "count" : 0
      },
      {
          "range" : "101 - 200",
          "count" : 0
      },
      {
          "range" : "201 - 300",
          "count" : 1
      },
      ...
    ]
    ```

### API 4

#### Path: `/api/pie-chart/:selectedMonth`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    GET http://localhost:3000/api/pie-chart/1
    ```
  - **Description**:

    Returns a list of all data in API whose status of "category" and "count"
  - **Response**

    ```
    [
      {
        "category" : "eletronics",
        "count" : 2
      },
      {
          "category" : "women's clothing",
          "count" : 2
      },
      {
          "category" : "men's clothing",
          "count" : 2
      },
    ]
    ```

### API 5

#### Path: `/api/combined/:selectedMonth`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    GET http://localhost:3000/api/combined/2
    ```
  - **Description**:

    Returns a list of all data in API whose status of "combined of all are specific month"


<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
