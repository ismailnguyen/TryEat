<template>
    <div class="ui centered card">
        <div class="content">
            <div class="header">
                {{ restaurant.name }}
            </div>
            <div class="meta">
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + restaurant.location" target="_blank">
                    {{restaurant.location}}
                </a>
            </div>
            <div class="description">
                {{ restaurant.description }}
            </div>
        </div>
        <div class="extra content">
            <span class="left floated like">
                <i class="edit icon"></i>
                Edit
            </span>
            <span class="right floated star">
                <i class="x icon"></i>
                Delete
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['restaurant'],
        data() {
            return {
                showDetails: false
            }
        }
    }
</script>
