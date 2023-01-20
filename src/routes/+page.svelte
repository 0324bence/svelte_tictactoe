<div id="container">
    <h1>TicTac<br />Toe</h1>
    <div id="buttons">
        <a href="/">Play</a>
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
            font-size: 12rem;
            color: $foreground_color;
        }

        a {
            display: block;
            text-decoration: none;
            text-align: center;
            width: 20rem;
            font-size: 3rem;
            padding: 0.2rem;
            color: $background_color;
            font-weight: bolder;
            border-radius: 1rem;
            background-color: $foreground_color;
        }
    }
</style>
