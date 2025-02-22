import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased font-['Karla']">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
