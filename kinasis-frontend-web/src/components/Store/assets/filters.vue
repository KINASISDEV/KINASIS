,<script setup>
import { h } from 'vue';

</script>

<template>
    <div class="filters">
        <div class="filter-item">
            <h3>Buscar</h3>
            <input type="text" placeholder="Buscar producto..."/>
            <h3>Ordenar por:</h3>
            <select>
                <option value="category3">Mas Relevante</option>
                <option value="category1">Mayor Precio</option>
                <option value="category2">Menor Precio</option>
            </select>
            <button class="button-style-1">Aplicar</button>
        </div>
    </div>
</template>

<style scoped>
.filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
.filter-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}
.filter-item h3 {
    margin: 10px 0;
    align-self: stretch;
    text-align: left;
}
.filter-item input, .filter-item select {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    width: 200px;
}
.filter-item button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.filter-item button:hover {
    background-color: var(--secondary-color);
}
.filter-item button:active {
    background-color: var(--primary-color-active);
}
</style>