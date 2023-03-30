import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import React from "react";
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            });

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html className="h-full">
                <Head lang="en" />
                <body className="relative min-h-screen">
                    <div id="overlay"></div>
                    <Main />
                    <NextScript />
                    <div id="notification" className="flex justify-center"></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
