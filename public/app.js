var eventBus = new Vue()

Vue.component('product', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <img v-bind:src="image" :alt="altText">
            </div>
            <div class="product-info">
                <h1>{{ brand }} {{ product }}</h1>
                <p>{{ description }}</p>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p v-if="onSale">On Sale!</p>
                <p>Shipping is: {{ shipping}}</p>
                <a :href="link">Link</a>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)"
                >
                </div>
                <div v-for="size in sizes">
                    <span>{{size}}</span>
                </div>

                <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{disabledButton: !inStock}"
                >Add to Cart</button>
                <button v-on:click="removeFromCart">Remove from Cart</button>


            </div>
           
                <div>
                <product-tabs :reviews="reviews"></product-tabs>
                </div>
                <div>
                
                </div>
            </div>
    `,data() {
        return {
            brand:'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            altText: 'A pair of socks',
            link: '#div',
            inventory: 8 ,
            onSale: true,
            details: ['cotton','ployester','Gender-neutral'],
            variants: [
                {
                variantId:2234,
                variantColor:"green",
                variantQuantity: 10,
                variantImage: 'vmSocks-green-onWhite.jpg'
                },           
                {
                 variantId:2234,
                 variantColor:"blue",
                 variantQuantity: 0,
                 variantImage: 'vmSocks-blue-onWhite.jpg'
                },
            ],
            reviews: [],
            sizes: ['XS','S','M','L','XL','XXL']
        }
    }, 
        methods:{
            addToCart: function(){
                this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
            },
            removeFromCart: function(){
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
            },
            updateProduct: function(index){
                this.selectedVariant = index
                console.log(index)
            }
        },
        computed:{
            image(){
                return this.variants[this.selectedVariant].variantImage
            },
            inStock () {
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping(){
                if (this.premium){
                    return 'Free'
                } else {
                    return 2.99
                }
            }
        },
        mounted(){
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }

})
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
    <b>Please, correct the following error(s)</b>
    <ul>
        <li v-for="error in errors"> {{ error }}</li>
    </ul>
    </p>

        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data(){
        return {
            date: null,
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.review && this.rating){
                let productReview ={
                    date: new Date(),
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                // fetch('/api/todo',{
                //     method: 'post',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify({ title })
                // })
                // .then (res => res.json())
                // .then(({todo}) => {
                //     console.log(todo)
                //     this.todos.push(todo)
                // })
                // .catch(e => console.log(e))
                eventBus.$emit('review-submitted', productReview)
                this.name = null,
                this.review = null,
                this.rating = null
            }else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
                if(!this.rating) this.errors.push("Rating required")
            }
            
        }
    }
})

Vue.component('product-tabs', {
    props:{
        reviews: {
            type: Array,
            required: true
        }
    },
    template:`
        <div>
            <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab"
            >
            {{ tab }}</span>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There no reviews yet</p>
                <ul>
                <li v-for="review in reviews">
                <p><label for="date">Date : {{ review.date }}</label> <p>
                <p>{{ review.name }}</p>
                <p>Rating:{{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
                </ul>
            </div>
            <product-review v-show="selectedTab === 'Make a Review'"
           ></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        removeFromCart(id){
            this.cart.shift(id)
        }
    }
    
    
})

