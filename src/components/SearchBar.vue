<template>
    <div id="search-bar">
        <input class="input is-rounded" type="text" @input="onInput"/>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'SearchBar',
    methods: {
        onInput(event) {
            this.$emit('onchange', event.target.value)
        }
    }
})
</script>
