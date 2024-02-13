let app = new Vue({
    el: '#app',
    data: {
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
        cart: 0, 
         
    },
    methods: {
        addToCart() {
            this.cart += 1
            this.inventory -= 1
        },

        removeFromCart() {
            this.cart -= 1
            this.inventory += 1
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

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        sale() {
            if (this.onSale) {
                return this.title + ' is on sale!';
            } else {
                return this.title + ' is not on sale.';
            }
        }
         
 
     },
     
 })
 