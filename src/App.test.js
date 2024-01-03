import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    console.log = jest.fn();
  });

  it('should render the products with fetched data', async () => {
    const mockProducts = [
        [
        {
          "product_id":11095,
          "id":2180712,
          "name":"Lucky You Cologne Spray for Men, 3.4 Ounce",
          "price":14.0,
          "image_url":"https://palletfly-public.s3.amazonaws.com/product_images/11095-primary.jpg",
          "total":133,
          "deal_cost":1260.0,
        },
        {
          "product_id":11148,
          "id":2180765,
          "name":"Dolce and Gabbana Pour Femme Eau de Parfum Spray for Women, 3.3 Ounce",
          "price":48.25,
          "image_url":"https://palletfly-public.s3.amazonaws.com/product_images/11148-primary.jpg",
          "seller_rank":28696,
          "total":55,
        },
        {
          "product_id":11978,
          "id":2181531,
          "name":"Code 37 By Karen Low 3.3/3.4 Oz Edt Cologne Spray for Men",
          "price":13.75,
          "image_url":"https://palletfly-public.s3.amazonaws.com/product_images/11978-primary.jpg",
          "seller_rank":76837,
          "total":1561,
        },
        {
          "product_id":12446,
          "id":2181998,
          "name":"Luna Rossa Carbon Eau de Toilette Spray, 5.1 oz",
          "price":102.0,
          "image_url":"https://palletfly-public.s3.amazonaws.com/product_images/12446-primary.jpg",
          "seller_rank":22481,
          "total":10000,
        },
        {
          "product_id":14970,
          "id":2184467,
          "name":"Bond No 9 Greenwich Village For Women Eau De Parfum Spray 3.4 Ounce",
          "price":233.0,
          "image_url":"https://palletfly-public.s3.amazonaws.com/product_images/14970-primary.jpg",
          "seller_rank":80273,
          "total":10000,
        },
      ],
    ];

    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<App />);

    //Test if products fetched from API are rendering
    const product = await screen.findByText('Lucky You Cologne Spray for Men, 3.4 Ounce');
    expect(product).toBeInTheDocument();

    // Add the product to the cart
    const btn = await screen.findAllByText('Add To Cart');
    fireEvent.click(btn[0]);

    //Test if product shows in cart
    const cartButton = await screen.findByText('Remove From Cart');
    expect(cartButton).toBeInTheDocument();

    //Checkout the cart
    fireEvent.click(await screen.findByText('Go To Checkout'));
    expect(console.log).toHaveBeenCalledWith('Checkout Total Is: 13.75');
  });
});
