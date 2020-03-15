<template>
    <header class="ui header">
        <div class="ui secondary menu">
            <router-link to="settings" class="left floated item" active-class="active">
                <i class="big cog icon"></i>
            </router-link>

            <h1>Try <span class="primary-color">Eat</span></h1>
            
            <router-link to="add-restaurant" class="right floated item" active-class="active">
                <i class="big plus icon"></i>
            </router-link>
        </div>
    </header>
</template>

<style scoped>
    .ui.header {
        text-align: center;
        width: 100%;
        color: #acbfd9ab;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 999;
        background: #42275a;
        background: -webkit-linear-gradient(to right, #734b6d, #42275a);
        background: linear-gradient(to right, #734b6da1, #42275aa1);
    }

    .ui.segment, .ui.menu {
        background: none;
        color: #fff;
    }

    .ui.menu .item.right {
        color: #fff;
    }

    .ui.menu .item.left {
        color: #acbfd9ab;
    }

    .primary-color {
        color: #eb4b8a;
    }
</style>