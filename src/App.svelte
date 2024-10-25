<script>
    import Router from "svelte-spa-router";
    import Home from "./routes/loginPage.svelte";
    import Main from "./routes/mainPage.svelte";

    const routes = {
        '/' : Home,
        '/main' : Main,
    }
</script>

<Router {routes} />