<div id="container">
    <slot />
</div>

<style lang="scss">
    @import "@/assets/variables.scss";
    #container {
        width: 100%;
        min-height: 100vh;
        background-color: $background_color;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
