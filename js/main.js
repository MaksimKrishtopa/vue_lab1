
 
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
        <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In stock</p>
            <p v-else v-bind:class="{ 'out-of-stock': !inStock }">Out of stock</p>
            <product-details :details="details"></product-details>
            <p>Shipping: {{ shipping }}</p>
            <p>{{ sale }}</p>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)"></div>

            <div class="sizes_container" v-for="size in sizes">
                <p>{{ size }}</p>
            </div>
            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
            <button v-on:click="removeFromCart">Remove from cart</button>
        </div>
        </div>
  `,

    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            altText: "A pair of socks",
            inventory: 100,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],

            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: [],
        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
            
        },

        removeFromCart() {
            const selectedVariantId = this.variants[this.selectedVariant].variantId;
            this.$emit('remove-from-cart', selectedVariantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
        },
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },

        sale() {
            if (this.onSale) {
                return this.title + ' is on sale!';
            } else {
                return this.title + ' is not on sale.';
            }
        },

        shipping() {
            return this.premium ? "Free" : 2.99;
        }
    }
});


 Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <div>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
      </div>
    `
  });


  let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
     

        removeFromCart(productId) {
            const productIndex = this.cart.indexOf(productId);

            if (productIndex !== -1) {

                this.cart.splice(productIndex, 1);
            }
        },
    }
});

 
 
 