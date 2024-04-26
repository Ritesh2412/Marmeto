fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
  .then(response => response.json())
  .then(data => {
    const product = data.product;
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('original-price').innerText = product.compare_at_price;
    document.getElementById('sale-price').innerText = product.price;
    document.getElementById('product-description').innerHTML = product.description;
    
    const sizeOptions = document.getElementById('size-options');
    product.options.find(option => option.name === 'Size').values.forEach(size => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'size';
      radio.value = size;
      radio.id = size.toLowerCase(); // Use lowercase size as ID
      const label = document.createElement('label');
      label.htmlFor = size.toLowerCase(); // Use lowercase size as ID
      label.textContent = size;
      sizeOptions.appendChild(radio);
      sizeOptions.appendChild(label);
    });

    const colorOptions = document.getElementById('color-options');
    product.options.find(option => option.name === 'Color').values.forEach(color => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'color';
      radio.value = Object.keys(color)[0]; // Assuming color object has only one key
      radio.id = radio.value.toLowerCase(); // Use lowercase color name as ID
      const label = document.createElement('label');
      label.htmlFor = radio.value.toLowerCase(); // Use lowercase color name as ID
      label.textContent = Object.keys(color)[0]; // Assuming color object has only one key
      colorOptions.appendChild(radio);
      colorOptions.appendChild(label);
    });

    // Dynamically set the image source using absolute URLs
    const productImage = document.getElementById('product-image');
    productImage.src = product.images[0].src; // Assuming the first image is the main product image
    productImage.alt = product.title;

    // Function to handle adding the product to the cart
    function addToCart() {
      const selectedSize = document.querySelector('input[name="size"]:checked');
      const selectedColor = document.querySelector('input[name="color"]:checked');
      const quantity = document.getElementById('quantity').value;
      if (selectedSize && selectedColor) {
        const productToAdd = {
          title: product.title,
          size: selectedSize.value,
          color: selectedColor.value,
          quantity: quantity
        };
        // Example: Add product to cart logic (replace with your own implementation)
        console.log('Added to cart:', productToAdd);
        alert('Product added to cart!');
      } else {
        alert('Please select a size and a color.');
      }
    }

    // Attach event listener to Add To Cart button
    document.querySelector('.add-to-cart').addEventListener('click', addToCart);
  })
  .catch(error => console.error('Error fetching JSON:', error));
