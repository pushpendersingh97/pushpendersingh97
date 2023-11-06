export const ProductService = {
  getProductsData() {
    return [
      {
        topGainer: [
          {
            id: 1,
            company: "IndusInd Bank",
            price: 1312321,
            change: 250.0,
            dataChange: +2.95,
            status: "success",
          },
          {
            id: 2,
            company: "m/S Pushpender Bank",
            price: 1312321,
            change: 2210.0,
            dataChange: +2.21,
            status: "success",
          },
          {
            id: 3,
            company: "Grow a/b w Bank",
            price: 1312321,
            change: 2510.0,
            dataChange: +2.95,
            status: "success",
          },
          {
            id: 4,
            company: "abc Bank",
            price: 1312321,
            change: 1250.0,
            dataChange: +2.95,
            status: "success",
          },
          {
            id: 5,
            company: "xyz Bank",
            price: 1312321,
            change: 150.0,
            dataChange: +2.95,
            status: "success",
          },
          {
            id: 6,
            company: "IndusInd Bank",
            price: 1312321,
            change: 23.0,
            dataChange: +2.915,
            status: "success",
          },
        ],
      },
      {
        topLosers: [
          {
            id: 1,
            company: "IndusInd Bank",
            price: 21321,
            change: "250.00",
            dataChange: "+2.95",
            status: "danger",
          },
          {
            id: 2,
            company: "IndusInd Bank",
            price: 1312321,
            change: "250.00",
            dataChange: "+2.95",
            status: "danger",
          },
          {
            id: 3,
            company: "IndusInd Bank",
            price: 1312321,
            change: "250.00",
            dataChange: "+2.95",
            status: "danger",
          },
          {
            id: 4,
            company: "IndusInd Bank",
            price: 1312321,
            change: "250.00",
            dataChange: "+2.95",
            status: "danger",
          },
          {
            id: 5,
            company: "IndusInd Bank",
            price: 1312321,
            change: "250.00",
            dataChange: "+2.95",
            status: "danger",
          },
          {
            id: 6,
            company: "IndusInd Bank",
            price: 1312321,
            change: "250.00",
            dataChange: "+2.95",
            status: "danger",
          },
        ],
      },
      {
        sectoralIndicesData: [
          {
            id: 1,
            name: "Nifty 50",
            price: 1973.20,
            change: 169.50,
            changeprec: +2.95,
            status: "success",
          },
          {
            id: 2,
            name: "BSE Sensex",
            price: 66196.00,
            change: 604.84,
            changeprec: -2.44,
            status: "danger",
          },
          {
            id: 3,
            name: "Nifty Bank",
            price: 44745.10,
            change: 639.50,
            changeprec: +1.70,
            status: "success",
          },
          {
            id: 4,
            name: "Nifty IT",
            price: 32834.10,
            change: 115.10,
            changeprec: +1.51,
            status: "success",
          },
          {
            id: 5,
            name: "BSE Smallcap",
            price: 37188.79,
            change: 221.71,
            changeprec: -1.27,
            status: "danger",
          },
        ]
      },
      {
        sectorPerformance: [
          {
            id: 1,
            name: "Automotive",
            marketcap: 7145325.20,
            change: 25798.21,
            changeprec: +2.95,
            status: "success",
          },
          {
            id: 2,
            name: "Banking & Financial Services",
            marketcap: 5505879.51,
            change: 5125.47,
            changeprec: -2.44,
            status: "danger",
          },
          {
            id: 3,
            name: "Cement & Construction",
            marketcap: 987264.30,
            change: 8245.98,
            changeprec: +1.70,
            status: "success",
          },
          {
            id: 4,
            name: "Chemicals",
            marketcap: 432834.10,
            change: 4213.35,
            changeprec: +1.51,
            status: "success",
          },
          {
            id: 5,
            name: "Conglomerates",
            marketcap: 137188.79,
            change: 1145.36,
            changeprec: -1.27,
            status: "danger",
          },
        ]
      }
    ];
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },
};
