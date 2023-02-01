<div id="container">
    <h1>TicTac<br />Toe</h1>
    <div id="buttons">
        <a href="/local/setup">Play</a>
    </div>
</div>

<style lang="scss">
    @import "../assets/variables.scss";
    #container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $background_color;

        h1 {
            text-align: center;
            font-size: 10rem;
            color: $foreground_color;
        }

        a {
            @include button;
            display: block;
            width: 20rem;
        }
    }
    @media screen and (max-width: 768px) {
        #container h1 {
            font-size: 7rem;
        }
    }
</style>
