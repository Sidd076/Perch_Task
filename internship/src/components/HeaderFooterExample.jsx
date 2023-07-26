// import React, { useEffect, useState } from 'react';
// import './style.css';
// import productsData from '../components/products.json';

// const HeaderFooterExample = () => {
//   const [products, setProducts] = useState(productsData.products);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     fetch('/products.json')
//       .then(response => response.json())
//       .then(data => setProducts(data.products))
//       .catch(error => console.error('Error fetching product data:', error));
//   };

//   const calculateDiscountedPrice = (originalPrice, productIndex) => {
//     const discounts = [0.2, 0.3, 0.4];
//     const minPrice = 20;
  
//     if (isNaN(originalPrice) || originalPrice <= 0) {
//       alert("Invalid product price.");
//       return;
//     }
  
//     if (productIndex < 0 || productIndex >= discounts.length) {
//       alert("Invalid product index.");
//       return;
//     }
  
//     const updatedProducts = products.map((product, index) => {
//       if (index === productIndex) {
//         let discountedPrice;
//         if (originalPrice < minPrice) {
//           discountedPrice = originalPrice;
//         } else {
//           discountedPrice = originalPrice - originalPrice * discounts[index];
//           console.log(discountedPrice);

//         }
//         return { ...product, discountedPrice };
//       }
//       return product;
//     });
  
//     setProducts(updatedProducts);
//   };
  
    

  
//   return (
//     <>
//       <header>
//         <p style={{ fontFamily: 'Gilroy, Arial, sans-serif' }}>
//           <b>FREE SHIPPING</b>
//           <span>BUY ABOVE $120</span>
//         </p>
//       </header>

//       <section className="section section-1">
//         <div className="section-1-content">
//           <p className="section-1-text">
//             <h1>Future Starts From Here</h1>
//           </p>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laudantium, rerum totam sapiente harum</p>
//           <button className="btn"><b>Get Started</b></button>
//         </div>
//       </section>

//       <section className="section" id="new-release-section">
//         <h1>New Release</h1>
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam omnis aliquid eligendi et eos, commodi porro? Eius quis, cum</p>
//         <div className="product-container" id="product-container">
//           {products.map((product, index) => (
//             <div className="product" key={index}>
//               <img src={process.env.PUBLIC_URL + product.imageURL} alt={product.name} />
//                 <div className="product-info">
//                 <p className="product-title">{product.name}</p>
//                 <p className="product-desc">{product.description}</p>
//                 <p className="product-price">
//   ${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
// </p>

//                 {product.discountedPrice && (
//                   <p className="product-discounted-price">${product.discountedPrice.toFixed(2)}</p>
//                 )}
//                 <button className="btn" onClick={() => calculateDiscountedPrice(product.price, index)}>Apply Discount</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="section">
//         <section className="section section-3">
//           <div className="section-3-content">
//             <h1>Explore Your Universe</h1>
//             <button className="btn"><b>Get Started</b></button>
//           </div>
//         </section>
//       </section>

//       <footer>
//         <p>Follow us</p>
//         <div className="social-icons">
//           <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
//           <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
//           <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default HeaderFooterExample;


import React, { useEffect, useState } from 'react';
import './style.css';
import productsData from '../components/products.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const HeaderFooterExample = () => {
  const [products, setProducts] = useState(productsData.products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching product data:', error));
  };

  const calculateDiscountedPrice = (originalPrice, productIndex) => {
    const discounts = [0.2, 0.3, 0.4];
    const minPrice = 20;
  
    if (isNaN(originalPrice) || originalPrice <= 0) {
      alert("Invalid product price.");
      return;
    }
  
    if (productIndex < 0 || productIndex >= discounts.length) {
      alert("Invalid product index.");
      return;
    }
  
    const updatedProducts = products.map((product, index) => {
      if (index === productIndex) {
        let discountedPrice;
        if (originalPrice < minPrice) {
          discountedPrice = originalPrice;
        } else {
          discountedPrice = originalPrice - originalPrice * discounts[index];
          console.log(discountedPrice);

        }
        return { ...product, discountedPrice };
      }
      return product;
    });
  
    setProducts(updatedProducts);
  };

  const validateDiscountConfig = () => {
    const customDiscountInputs = document.querySelectorAll(".custom-discount-input");
    const customMinCostInput = document.querySelector(".custom-min-cost-input");

    for (const input of customDiscountInputs) {
        const discountRate = parseFloat(input.value);
        if (isNaN(discountRate) || discountRate < 0 || discountRate > 1) {
            
            input.value = "";
            alert("Custom discount rate must be a number between 0 and 1.");
            return;
        }
    }

    const minCost = parseFloat(customMinCostInput.value);
    if (isNaN(minCost) || minCost < 0) {
        alert("Custom minimum item cost must be a positive number.");
        customMinCostInput.value = "";
        return;
    }

    
    const customDiscountRates = Array.from(customDiscountInputs, input => parseFloat(input.value));
    const minCostInput = parseFloat(customMinCostInput.value);

    
    const productPrices = document.querySelectorAll(".product-price");
    productPrices.forEach((priceElement, index) => {
        const originalPrice = parseFloat(priceElement.textContent.replace("$", ""));
        if (!isNaN(originalPrice) && originalPrice >= minCostInput && index < customDiscountRates.length) {
            const discountedPrice = originalPrice - originalPrice * customDiscountRates[index];
            const discountedPriceElement = document.querySelectorAll(".product-discounted-price")[index];
            discountedPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
            discountedPriceElement.style.display = "block";
        }
    });
  };

  const handleCustomDiscountChange = (event, index) => {
    const value = event.target.value;
    const customDiscountInputs = document.querySelectorAll(".custom-discount-input");
    customDiscountInputs[index].value = value;
    validateDiscountConfig();
  };

  const handleCustomMinCostChange = (event) => {
    const value = event.target.value;
    const customMinCostInput = document.querySelector(".custom-min-cost-input");
    customMinCostInput.value = value;
    validateDiscountConfig();
  };

  return (
    <>
    <header>
      <p style={{ fontFamily: 'Gilroy, Arial, sans-serif' }}>
        <b>FREE SHIPPING</b>
        <span>BUY ABOVE $120</span>
      </p>
    </header>

    <section className="section section-1">
      <div className="section-1-content">
        <p className="section-1-text">
          <h1>Future Starts From Here</h1>
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laudantium, rerum totam sapiente harum</p>
        <button className="btn"><b>Get Started</b></button>
      </div>
    </section>

    <section className="section" id="new-release-section">
      <h1>New Release</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam omnis aliquid eligendi et eos, commodi porro? Eius quis, cum</p>
      <div className="product-container" id="product-container">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <img src={process.env.PUBLIC_URL + product.imageURL} alt={product.name} />
              <div className="product-info">
              <p className="product-title">{product.name}</p>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">
${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
</p>

              {product.discountedPrice && (
                <p className="product-discounted-price">${product.discountedPrice.toFixed(2)}</p>
              )}
              <button className="btn" onClick={() => calculateDiscountedPrice(product.price, index)}>Apply Discount</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="section">
      <section className="section section-3">
        <div className="section-3-content">
          <h1>Explore Your Universe</h1>
          <button className="btn"><b>Get Started</b></button>
        </div>
      </section>
    </section>

    <footer>
        <p>Follow us</p>
        <div className="social-icons">
          <a href="#" className="social-icon"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
          <a href="#" className="social-icon"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
          <a href="#" className="social-icon"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
          
          <FontAwesomeIcon icon={['far', 'coffee']} /> {/* Example of using regular icon */}
        </div>
      </footer>
     
    </>
  );
};

export default HeaderFooterExample;
