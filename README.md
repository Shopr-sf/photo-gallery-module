# Photo Gallery

  > Simple photo gallery for a given product.

## Related Projects
  * [review-module](https://github.com/Viamis/review-module)
  * [similar-products](https://github.com/Viamis/similar-products)
  * [amazon-service-tk](https://github.com/Viamis/amazon-service-tk)

## Table of Contents

  1. [Usage](#Usage)
  1. [Requirements](#requirements)
  1. [Development](#development)

## Usage

  > Some usage instructions

## Requirements

  An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

    - Node 6.13.0
    - etc

## Development

  ### Installing Dependencies

  From within the root directory:

    ```sh
    npm install
    ```

## REST API
  
  > CREATE - /post - adds new product name, detail, and image.
  > READ - /images/:id/images - reads product's images by product id.
         - /images/:id/product_info - reads product's info by product id.
  > UPDATE - /update - update existing product's name, detail and image with it's product id.
  > DELETE - /delete - delete product with it's product id.