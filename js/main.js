let eventBus = new Vue()
 
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
           
            <product-tabs :reviews="reviews" :details="details" :shipping="shipping"></product-tabs>
        
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
            reviews: [],
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

            mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
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


  Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
    <p>
    <label for="name">Name:</label>
    <input required id="name" v-model="name" placeholder="name">
    </p>

    <p>
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
    <label for="rating">Rating:</label>
    <select required id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
    </select>
    </p>

    <p class="recomend_block">
    <label for="recommend">Would you recommend this product?</label>
    <input type="radio" id="recommend-yes" value="yes" v-model="recommend" required>
    <label for="recommend-yes">Yes</label>
    <input type="radio" id="recommend-no" value="no" v-model="recommend" required>
    <label for="recommend-no">No</label>
  </p>
        <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
    <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>

    <p>
    <input type="submit" value="Submit"> 
    </p>

    </form>

  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },

    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
         }
         
     }
     
     
 
 })


 Vue.component('product-tabs', {
    props: {
      reviews: {
        type: Array,
        required: false
      },
      details: {
        type: Array,
        required: true
      },
      shipping: {
        type: String,
        required: true
      }
    },
    template: `
      <div>
        <ul>
          <span
            class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            @click="selectedTab = tab"
          >{{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Reviews'">
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>{{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>{{ review.review }}</p>
            </li>
          </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
          <product-review @review-submitted="addReview"></product-review>
        </div>
        <div v-show="selectedTab === 'Shipping'">
          <p>{{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
      </div>
    `,
    data() {
      return {
        tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
        selectedTab: 'Reviews'
      };
    },
    methods: {
      addReview(productReview) {
        this.$emit('review-submitted', productReview);
      }
    }
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

 
 
 