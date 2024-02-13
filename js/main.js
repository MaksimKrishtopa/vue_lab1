let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        inStock: true,
        inventory: 100,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'Green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'Blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0, 
         
    },
    methods: {
        addToCart() {
            this.cart += 1
        },

        removeFromCart() {
            this.cart -= 1
        },

        updateProduct(variantImage) {
            this.image = variantImage
        },


         
     }
     
 })
 